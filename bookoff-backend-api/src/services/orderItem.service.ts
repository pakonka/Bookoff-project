import { myDataSource } from "../databases/data_source";
import { OrderItem } from "../databases/entities/orderItem.entity"; // Giả sử bạn đã tạo thực thể OrderItem

// Get all order items
const getAllOrderItems = async () => {
  return await myDataSource.query(`
    SELECT * FROM order_items
  `);
};

// Create a new order item
const createOrderItem = async (payload: Partial<OrderItem>) => {
  const {
    order_id, // Chỉnh sửa tên thuộc tính
    product_id, // Chỉnh sửa tên thuộc tính
    price_at_purchase, // Chỉnh sửa tên thuộc tính
    quantity,
    discount_code,
  } = payload;

  await myDataSource.query(
    `
    INSERT INTO order_items (order_id, product_id, price_at_purchase, quantity, discount_code)
    VALUES (@0, @1, @2, @3, @4)
  `,
    [
      order_id, // Lấy ID từ đối tượng order
      product_id, // Lấy ID từ đối tượng product
      price_at_purchase,
      quantity,
      discount_code,
    ]
  );

  return { ...payload };
};

// Update order item by ID
const updateOrderItem = async (
  order_item_id: number,
  payload: Partial<OrderItem>
) => {
  // Lấy thông tin hiện tại của order item
  const existingOrderItem = await getOrderItemById(order_item_id);
  if (!existingOrderItem) {
    throw new Error("Order item not found");
  }

  const { order_id, product_id, price_at_purchase, quantity, discount_code } =
    payload;

  await myDataSource.query(
    ` 
    UPDATE order_items
    SET 
      order_id = COALESCE(@0, order_id), 
      product_id = COALESCE(@1, product_id), 
      price_at_purchase = COALESCE(@2, price_at_purchase), 
      quantity = COALESCE(@3, quantity), 
      discount_code = COALESCE(@4, discount_code)
    WHERE order_item_id = @5
  `,
    [
      order_id || null,
      product_id || null,
      price_at_purchase || null,
      quantity || null,
      discount_code || null,
      order_item_id,
    ]
  );

  // Kết hợp giá trị cũ và giá trị mới để trả về
  return {
    ...existingOrderItem,
    ...payload,
  };
};

// Get order item by ID
const getOrderItemById = async (order_item_id: number) => {
  // Chỉnh sửa tên tham số
  const result = await myDataSource.query(
    `
    SELECT * FROM order_items WHERE order_item_id = @0
  `,
    [order_item_id] // Chỉnh sửa tên tham số
  );

  if (result.length === 0) {
    throw new Error("Order item not found");
  }
  return result[0];
};

// Delete order item by ID
const deleteOrderItem = async (order_item_id: number) => {
  // Chỉnh sửa tên tham số
  const existingOrderItem = await getOrderItemById(order_item_id); // Chỉnh sửa tên tham số
  if (!existingOrderItem) {
    throw new Error("Order item not found");
  }

  await myDataSource.query(
    `
    DELETE FROM order_items WHERE order_item_id = @0
  `,
    [order_item_id] // Chỉnh sửa tên tham số
  );

  return existingOrderItem;
};

export default {
  getAllOrderItems,
  createOrderItem,
  updateOrderItem,
  getOrderItemById,
  deleteOrderItem,
};
