import { myDataSource } from "../databases/data_source";
import { ProductImage } from "../databases/entities/productImage.entity"; // Giả sử bạn đã tạo thực thể ProductImage

// Get all product images
const getAllProductImages = async () => {
  return await myDataSource.query(`
    SELECT * FROM products_images
  `);
};

// Create a new product image
const createProductImage = async (payload: Partial<ProductImage>) => {
  const {
    product_id, // Chỉnh sửa tên thuộc tính
    image_url,
    alt_text,
    is_primary,
  } = payload;

  await myDataSource.query(
    `
    INSERT INTO products_images (product_id, image_url, alt_text, is_primary)
    VALUES (@0, @1, @2, @3)
  `,
    [
      product_id, // Lấy ID từ đối tượng product
      image_url,
      alt_text,
      is_primary,
    ]
  );

  return { ...payload };
};

// Update product image by ID
const updateProductImage = async (
  image_id: number,
  payload: Partial<ProductImage>
) => {
  // Chỉnh sửa tên tham số
  const existingProductImage = await getProductImageById(image_id); // Chỉnh sửa tên tham số
  if (!existingProductImage) {
    throw new Error("Product image not found");
  }

  const { product_id, image_url, alt_text, is_primary } = payload;

  await myDataSource.query(
    `
    UPDATE products_images
    SET product_id = @0, image_url = @1, alt_text = @2, is_primary = @3
    WHERE image_id = @4
  `,
    [
      product_id, // Lấy ID từ đối tượng product
      image_url,
      alt_text,
      is_primary,
      image_id, // Chỉnh sửa tên tham số
    ]
  );

  return { ...existingProductImage, ...payload };
};

// Get product image by ID
const getProductImageById = async (image_id: number) => {
  // Chỉnh sửa tên tham số
  const result = await myDataSource.query(
    `
    SELECT * FROM products_images WHERE image_id = @0
  `,
    [image_id] // Chỉnh sửa tên tham số
  );

  if (result.length === 0) {
    throw new Error("Product image not found");
  }
  return result[0];
};

// Delete product image by ID
const deleteProductImage = async (image_id: number) => {
  // Chỉnh sửa tên tham số
  const existingProductImage = await getProductImageById(image_id); // Chỉnh sửa tên tham số
  if (!existingProductImage) {
    throw new Error("Product image not found");
  }

  await myDataSource.query(
    `
    DELETE FROM products_images WHERE image_id = @0
  `,
    [image_id] // Chỉnh sửa tên tham số
  );

  return existingProductImage;
};

export default {
  getAllProductImages,
  createProductImage,
  updateProductImage,
  getProductImageById,
  deleteProductImage,
};
