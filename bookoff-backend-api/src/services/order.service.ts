import { myDataSource } from "../databases/data_source";
import { Order } from "../databases/entities/order.entity"; // Giả sử bạn đã tạo thực thể Order

// Get all orders
const getAllOrders = async () => {
  return await myDataSource.query(`
    SELECT 
    o.order_id,
    o.user_id,
    u.user_name AS customer_name,
    o.order_date,
    o.shipping_address,
    o.shipping_method_id,
    sm.method_name AS shipping_method,
    o.discount_id,
    d.discount_percentage,
    o.order_status,
    o.total_amount,
    o.total_price,
    COALESCE(p.payment_status, 'No Payment') AS payment_status,
    p.payment_date,
    p.payment_method,
    p.amount AS payment_amount,
	COUNT(oi.order_item_id) AS item_count,
    STRING_AGG(CONCAT(
        pr.title, ' (Qty: ', oi.quantity, ', Price: ', oi.price_at_purchase, ')'
    ), ', ') AS products_details
FROM orders o
LEFT JOIN users u ON o.user_id = u.user_id
LEFT JOIN shipping_methods sm ON o.shipping_method_id = sm.method_id
LEFT JOIN discounts d ON o.discount_id = d.discount_id
LEFT JOIN payments p ON o.order_id = p.order_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
LEFT JOIN products pr ON oi.product_id = pr.product_id
GROUP BY 
    o.order_id, 
    o.user_id, 
    u.user_name, 
    o.order_date, 
    o.shipping_address, 
    o.shipping_method_id, 
    sm.method_name, 
    o.discount_id, 
    d.discount_percentage, 
    o.order_status, 
    o.total_amount, 
    o.total_price, 
    p.payment_status, 
    p.payment_date, 
    p.payment_method, 
    p.amount
ORDER BY o.order_date DESC;
  `);
};

// Create a new order
const createOrder = async (payload: Partial<Order>) => {
  const {
    user,
    total_amount,
    shipping_address,
    shippingMethod,
    discount_id,
    order_status,
    total_price,
    payment_status,
  } = payload;

  await myDataSource.query(
    `
    INSERT INTO orders (user_id, total_amount, shipping_address, shipping_method_id, discount_id, order_status, total_price, payment_status)
    VALUES (@0, @1, @2, @3, @4, @5, @6, @7)
  `,
    [
      user,
      total_amount,
      shipping_address,
      shippingMethod,
      discount_id,
      order_status,
      total_price,
      payment_status,
    ]
  );

  return { ...payload };
};

// Update order by ID
const updateOrder = async (orderId: number, payload: any) => {
  const {
    customer_name,
    shipping_address,
    method_name,
    order_status,
    discount_code,
    payment_method,
    payment_status,
  } = payload;

  await myDataSource.query(
    `
     BEGIN TRANSACTION;

    -- Cập nhật bảng orders
    UPDATE o
    SET 
        o.user_id = u.user_id,           
        o.shipping_address = COALESCE(@0, o.shipping_address), 
        o.shipping_method_id = sm.method_id,   
        o.discount_id = d.discount_id,                    
        o.order_status = COALESCE(@1, o.order_status),  
        o.total_amount = (
            SELECT SUM(oi.price_at_purchase * oi.quantity)  -- SUM để chỉ trả về 1 giá trị
            FROM order_items oi
            WHERE oi.order_id = o.order_id
        ),
        o.total_price = (
            SELECT SUM(oi.price_at_purchase * oi.quantity) * (1 - d.discount_percentage / 100.0)
            FROM order_items oi
            JOIN discounts d ON d.discount_code = @2
            WHERE oi.order_id = o.order_id
            GROUP BY d.discount_percentage  -- Thêm GROUP BY cho discount_percentage
        )
    FROM orders o
    LEFT JOIN users u ON u.user_name = @3  
    LEFT JOIN shipping_methods sm ON sm.method_name = @4  
    LEFT JOIN discounts d ON d.discount_code = @5  
    WHERE o.order_id = @6;


    -- Cập nhật bảng payments
    UPDATE p
    SET 
        p.payment_status = COALESCE(@7, p.payment_status),
        p.payment_method = COALESCE(@8, p.payment_method)   
    FROM payments p
    WHERE p.order_id = @6;

    COMMIT;
    `,
    [
      shipping_address,
      order_status,
      discount_code,
      customer_name,
      method_name,
      discount_code,
      orderId,
      payment_status,
      payment_method,
    ]
  );

  return { orderId, ...payload };
};

// Get order by ID
const getOrderById = async (orderId: number) => {
  const result = await myDataSource.query(
    `
  SELECT 
    o.order_id,
    o.user_id,
    u.user_name AS customer_name,
    o.order_date,
    o.shipping_address,
    o.shipping_method_id,
    sm.method_name AS shipping_method,
    o.discount_id,
    d.discount_code,
    d.discount_percentage,
    o.order_status,
    -- Tính tổng số lượng và tổng giá
    (
        SELECT SUM(oi.price_at_purchase * oi.quantity)
        FROM order_items oi
        WHERE oi.order_id = o.order_id
    ) AS total_amount,
    (
        SELECT 
            SUM(oi.price_at_purchase * oi.quantity) * (1 - COALESCE(d.discount_percentage, 0) / 100.0)
        FROM order_items oi
        WHERE oi.order_id = o.order_id
    ) AS total_price,
    -- Thông tin thanh toán
    p.payment_status,
    p.payment_date,
    p.payment_method,
    p.amount AS payment_amount,
    -- Chi tiết các sản phẩm trong đơn hàng dưới dạng JSON
    (
        SELECT 
            JSON_QUERY(
                (
                    SELECT 
                        oi.order_item_id AS order_item_id,
                        oi.product_id AS product_id,
                        pr.title AS product_name,
                        pr.description AS product_description,
                        pr.price AS product_price,
                        oi.price_at_purchase AS price_at_purchase,
                        oi.quantity AS quantity,
                        (
                            SELECT TOP 1 
                                pi.image_url
                            FROM 
                                products_images pi
                            WHERE 
                                pi.product_id = pr.product_id AND pi.is_primary = 1 -- Use 1 for true
                        ) AS image_url,
                        oi.discount_code AS item_discount_code
                    FROM order_items oi
                    LEFT JOIN products pr ON oi.product_id = pr.product_id
                    WHERE oi.order_id = o.order_id
                    FOR JSON PATH
                )
            )
    ) AS order_items
FROM 
    orders o
LEFT JOIN 
    users u ON o.user_id = u.user_id
LEFT JOIN 
    shipping_methods sm ON o.shipping_method_id = sm.method_id
LEFT JOIN 
    discounts d ON o.discount_id = d.discount_id
LEFT JOIN 
    payments p ON o.order_id = p.order_id
WHERE 
    o.order_id = @0; -- Thay @0 bằng giá trị cụ thể của order_id



  `,
    [orderId]
  );
  if (result.length === 0) {
    throw new Error("Order not found");
  }
  return result[0];
};

// Delete order by ID
const deleteOrder = async (orderId: number) => {
  const existingOrder = await getOrderById(orderId);
  if (!existingOrder) {
    throw new Error("Order not found");
  }

  await myDataSource.query(
    `
    DELETE FROM orders WHERE order_id = @0
  `,
    [orderId]
  );

  return existingOrder;
};

const getOrderByCustomerId = async (userId: number) => {
  return await myDataSource.query(
    `
    SELECT 
        o.order_id,
        o.user_id,
        u.user_name AS customer_name,
        o.order_date,
        o.shipping_address,
        o.shipping_method_id,
        sm.method_name AS shipping_method,
        o.discount_id,
        d.discount_percentage,
        o.order_status,
        o.total_amount,
        o.total_price,
        COALESCE(p.payment_status, 'No Payment') AS payment_status,
        p.payment_date,
        p.payment_method,
        p.amount AS payment_amount,
        COUNT(oi.order_item_id) AS item_count,
        STRING_AGG(CONCAT(
            pr.title, ' (Qty: ', oi.quantity, ', Price: ', oi.price_at_purchase, ')'
        ), ', ') AS products_details
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.user_id
    LEFT JOIN shipping_methods sm ON o.shipping_method_id = sm.method_id
    LEFT JOIN discounts d ON o.discount_id = d.discount_id
    LEFT JOIN payments p ON o.order_id = p.order_id
    LEFT JOIN order_items oi ON o.order_id = oi.order_id
    LEFT JOIN products pr ON oi.product_id = pr.product_id
    WHERE o.user_id = @0
    GROUP BY 
        o.order_id, 
        o.user_id, 
        u.user_name, 
        o.order_date, 
        o.shipping_address, 
        o.shipping_method_id, 
        sm.method_name, 
        o.discount_id, 
        d.discount_percentage, 
        o.order_status, 
        o.total_amount, 
        o.total_price, 
        p.payment_status, 
        p.payment_date, 
        p.payment_method, 
        p.amount
    ORDER BY o.order_date DESC;
    `,
    [userId]
  );
};

export default {
  getAllOrders,
  createOrder,
  updateOrder,
  getOrderById,
  deleteOrder,
  getOrderByCustomerId,
};
