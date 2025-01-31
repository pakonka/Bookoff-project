import { myDataSource } from "../databases/data_source";
import createError from "http-errors";

// Get all product views
const getAllProductViews = async () => {
  return await myDataSource.query(`
    SELECT * FROM product_views;
  `);
};

// Get product views by User ID
const getProductViewsByUserId = async (userId: number) => {
  const result = await myDataSource.query(
    `SELECT 
    pv.product_id, 
    pv.user_id, 
    MAX(pv.viewed_at) AS viewed_at,  -- Lấy ngày xem mới nhất của sản phẩm
    p.title, 
    p.price, 
    p.slug,
    p.release_date, 
    c.category_name,
    (SELECT TOP 1 pi.image_url 
        FROM products_images pi 
        WHERE pi.product_id = pv.product_id AND pi.is_primary = 1
    ) AS primary_image_url
FROM 
    product_views pv 
LEFT JOIN 
    products p ON pv.product_id = p.product_id
LEFT JOIN 
    categories c ON p.category_id = c.category_id
WHERE 
    pv.user_id = @0  -- Thay thế bằng user_id của người dùng bạn cần lấy
GROUP BY 
    pv.product_id, pv.user_id, p.slug, p.title, p.price, p.release_date, c.category_name
ORDER BY 
    MAX(pv.viewed_at) DESC;  -- Sắp xếp theo ngày xem mới nhất

`,
    [userId]
  );

  if (result.length === 0) {
    throw createError(404, "No product views found for this user");
  }

  return result;
};

// Create a new product view
const createProductView = async (userId: number, productId: number) => {
  try {
    // Kiểm tra nếu sản phẩm đã tồn tại trong lịch sử của khách hàng
    const existingView = await myDataSource.query(
      `SELECT * FROM product_views WHERE user_id = @0 AND product_id = @1`,
      [userId, productId]
    );

    if (existingView.length > 0) {
      // Nếu sản phẩm đã tồn tại, cập nhật `viewed_at`
      await myDataSource.query(
        `UPDATE product_views SET viewed_at = GETDATE() WHERE user_id = @0 AND product_id = @1`,
        [userId, productId]
      );
      return { user_id: userId, product_id: productId, viewed_at: new Date() };
    }

    // Lấy số lượng sản phẩm đã xem gần đây của khách hàng
    const userProductViews = await myDataSource.query(
      `SELECT view_id FROM product_views WHERE user_id = @0 ORDER BY viewed_at ASC`,
      [userId]
    );

    // Nếu số lượng sản phẩm vượt quá 10, xóa sản phẩm cũ nhất
    if (userProductViews.length >= 10) {
      const oldestViewId = userProductViews[0].view_id; // Lấy `view_id` của sản phẩm cũ nhất
      await myDataSource.query(`DELETE FROM product_views WHERE view_id = @0`, [
        oldestViewId,
      ]);
    }

    // Thêm sản phẩm mới vào danh sách
    await myDataSource.query(
      `INSERT INTO product_views (user_id, product_id, viewed_at) VALUES (@0, @1, GETDATE())`,
      [userId, productId]
    );

    return { user_id: userId, product_id: productId, viewed_at: new Date() };
  } catch (error) {
    // Bắt lỗi và log chi tiết lỗi
    console.error("Error in createProductView:", error);
    throw new Error("An error occurred while processing the product view.");
  }
};

// Update product view by ID (optional based on your use case)
const updateProductView = async (viewId: number, payload: any) => {
  const existingView = await myDataSource.query(
    `SELECT * FROM product_views WHERE view_id = @0`,
    [viewId]
  );

  if (existingView.length === 0) {
    throw createError(404, "Product view not found");
  }

  const { user_id, product_id } = payload;

  await myDataSource.query(
    `
    UPDATE product_views
    SET user_id = @0, product_id = @1, viewed_at = GETDATE()
    WHERE view_id = @2
    `,
    [user_id, product_id, viewId]
  );

  return { view_id: viewId, ...payload };
};

// Delete product view by ID
const deleteProductView = async (viewId: number) => {
  const existingView = await myDataSource.query(
    `SELECT * FROM product_views WHERE view_id = @0`,
    [viewId]
  );

  if (existingView.length === 0) {
    throw createError(404, "Product view not found");
  }

  await myDataSource.query(`DELETE FROM product_views WHERE view_id = @0`, [
    viewId,
  ]);

  return existingView[0];
};

export default {
  getAllProductViews,
  getProductViewsByUserId,
  createProductView,
  updateProductView,
  deleteProductView,
};
