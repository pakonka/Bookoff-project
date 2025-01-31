import { myDataSource } from "../databases/data_source";
import { Stock } from "../databases/entities/stock.entity"; // Giả sử bạn đã tạo thực thể Stock

// Get all stocks
const getAllStocks = async () => {
  return await myDataSource.query(`
    SELECT 
    s.stock_id,
    s.product_id,
    p.title AS product_name,
    s.location,
    s.reserved_stock,
    s.available_stock,
    s.update_at,
    s.transaction_id,
    s.batch_number
FROM 
    stocks s
LEFT JOIN 
    products p ON s.product_id = p.product_id
ORDER BY 
    s.update_at DESC;
  `);
};

// Create a new stock
const createStock = async (payload: Partial<Stock>) => {
  const {
    product_id, // Chỉnh sửa tên thuộc tính
    location,
    reserved_stock,
    available_stock,
    transaction_id,
    batch_number,
  } = payload;

  await myDataSource.query(
    `
    INSERT INTO stocks (product_id, location, reserved_stock, available_stock, transaction_id, batch_number)
    VALUES (@0, @1, @2, @3, @4, @5)
  `,
    [
      product_id, // Lấy ID từ đối tượng product
      location,
      reserved_stock,
      available_stock,
      transaction_id,
      batch_number,
    ]
  );

  return { ...payload };
};

// Update stock by ID
const updateStock = async (stock_id: number, payload: Partial<Stock>) => {
  // Chỉnh sửa tên tham số
  const existingStock = await getStockById(stock_id); // Chỉnh sửa tên tham số
  if (!existingStock) {
    throw new Error("Stock not found");
  }

  const {
    product_id,
    location,
    reserved_stock,
    available_stock,
    transaction_id,
    batch_number,
  } = payload;
  console.log("id", product_id);
  await myDataSource.query(
    `
    UPDATE stocks
    SET product_id = @0, location = @1, reserved_stock = @2, available_stock = @3, transaction_id = @4, batch_number = @5, update_at = GETDATE()
    WHERE stock_id = @6
  `,
    [
      product_id, // Lấy ID từ đối tượng product
      location,
      reserved_stock,
      available_stock,
      transaction_id,
      batch_number,
      stock_id, // Chỉnh sửa tên tham số
    ]
  );

  return { ...existingStock, ...payload };
};

// Get stock by ID
const getStockById = async (stock_id: number) => {
  // Chỉnh sửa tên tham số
  const result = await myDataSource.query(
    `
    SELECT * FROM stocks WHERE stock_id = @0
  `,
    [stock_id] // Chỉnh sửa tên tham số
  );

  if (result.length === 0) {
    throw new Error("Stock not found");
  }
  return result[0];
};

// Delete stock by ID
const deleteStock = async (stock_id: number) => {
  // Chỉnh sửa tên tham số
  const existingStock = await getStockById(stock_id); // Chỉnh sửa tên tham số
  if (!existingStock) {
    throw new Error("Stock not found");
  }

  await myDataSource.query(
    `
    DELETE FROM stocks WHERE stock_id = @0
  `,
    [stock_id] // Chỉnh sửa tên tham số
  );

  return existingStock;
};

export default {
  getAllStocks,
  createStock,
  updateStock,
  getStockById,
  deleteStock,
};
