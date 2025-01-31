import { myDataSource } from "../databases/data_source";
import { Cart } from "../databases/entities/cart.entity"; // Giả sử bạn đã tạo thực thể Cart

// Get all carts
const getAllCarts = async () => {
  return await myDataSource.query(`
    SELECT * FROM carts
  `);
};

// Create a new cart
const createCart = async (payload: Partial<Cart>) => {
  const {
    user_id, // Chỉnh sửa tên thuộc tính
    product_id, // Chỉnh sửa tên thuộc tính
    quantity,
    updated_by,
  } = payload;

  await myDataSource.query(
    `
    INSERT INTO carts (user_id, product_id, quantity, updated_by)
    VALUES (@0, @1, @2, @3)
  `,
    [
      user_id, // Chỉnh sửa tên thuộc tính
      product_id, // Chỉnh sửa tên thuộc tính
      quantity,
      updated_by,
    ]
  );

  return { ...payload };
};

// Update cart by ID
const updateCart = async (cart_id: number, payload: Partial<Cart>) => {
  // Chỉnh sửa tên tham số
  const existingCart = await getCartById(cart_id); // Chỉnh sửa tên tham số
  if (!existingCart) {
    throw new Error("Cart not found");
  }

  const {
    user_id, // Chỉnh sửa tên thuộc tính
    product_id, // Chỉnh sửa tên thuộc tính
    quantity,
    updated_by,
  } = payload;

  await myDataSource.query(
    `
    UPDATE carts
    SET user_id = @0, product_id = @1, quantity = @2, updated_by = @3, updated_at = GETDATE()
    WHERE cart_id = @4
  `,
    [
      user_id, // Chỉnh sửa tên thuộc tính
      product_id, // Chỉnh sửa tên thuộc tính
      quantity,
      updated_by,
      cart_id, // Chỉnh sửa tên tham số
    ]
  );

  return { ...existingCart, ...payload };
};

// Get cart by ID
const getCartById = async (cart_id: number) => {
  // Chỉnh sửa tên tham số
  const result = await myDataSource.query(
    `
    SELECT * FROM carts WHERE cart_id = @0
  `,
    [cart_id] // Chỉnh sửa tên tham số
  );

  if (result.length === 0) {
    throw new Error("Cart not found");
  }
  return result[0];
};

// Delete cart by ID
const deleteCart = async (cart_id: number) => {
  // Chỉnh sửa tên tham số
  const existingCart = await getCartById(cart_id); // Chỉnh sửa tên tham số
  if (!existingCart) {
    throw new Error("Cart not found");
  }

  await myDataSource.query(
    `
    DELETE FROM carts WHERE cart_id = @0
  `,
    [cart_id] // Chỉnh sửa tên tham số
  );

  return existingCart;
};

export default {
  getAllCarts,
  createCart,
  updateCart,
  getCartById,
  deleteCart,
};
