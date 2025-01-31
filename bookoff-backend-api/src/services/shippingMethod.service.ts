import { myDataSource } from "../databases/data_source";
import { ShippingMethod } from "../databases/entities/shippingMethod.entity"; // Giả sử bạn đã tạo thực thể ShippingMethod

// Get all shipping methods
const getAllShippingMethods = async () => {
  return await myDataSource.query(`
    SELECT * FROM shipping_methods
  `);
};

// Create a new shipping method
const createShippingMethod = async (payload: Partial<ShippingMethod>) => {
  const { method_name, cost, delivery_time } = payload;

  await myDataSource.query(
    `
    INSERT INTO shipping_methods (method_name, cost, delivery_time)
    VALUES (@0, @1, @2)
  `,
    [method_name, cost, delivery_time]
  );

  return { ...payload };
};

// Update shipping method by ID
const updateShippingMethod = async (
  method_id: number,
  payload: Partial<ShippingMethod>
) => {
  // Chỉnh sửa tên tham số
  const existingShippingMethod = await getShippingMethodById(method_id); // Chỉnh sửa tên tham số
  if (!existingShippingMethod) {
    throw new Error("Shipping method not found");
  }

  const { method_name, cost, delivery_time } = payload;

  await myDataSource.query(
    `
    UPDATE shipping_methods
    SET method_name = @0, cost = @1, delivery_time = @2
    WHERE method_id = @3
  `,
    [
      method_name,
      cost,
      delivery_time,
      method_id, // Chỉnh sửa tên tham số
    ]
  );

  return { ...existingShippingMethod, ...payload };
};

// Get shipping method by ID
const getShippingMethodById = async (method_id: number) => {
  // Chỉnh sửa tên tham số
  const result = await myDataSource.query(
    `
    SELECT * FROM shipping_methods WHERE method_id = @0
  `,
    [method_id] // Chỉnh sửa tên tham số
  );

  if (result.length === 0) {
    throw new Error("Shipping method not found");
  }
  return result[0];
};

// Delete shipping method by ID
const deleteShippingMethod = async (method_id: number) => {
  // Chỉnh sửa tên tham số
  const existingShippingMethod = await getShippingMethodById(method_id); // Chỉnh sửa tên tham số
  if (!existingShippingMethod) {
    throw new Error("Shipping method not found");
  }

  await myDataSource.query(
    `
    DELETE FROM shipping_methods WHERE method_id = @0
  `,
    [method_id] // Chỉnh sửa tên tham số
  );

  return existingShippingMethod;
};

export default {
  getAllShippingMethods,
  createShippingMethod,
  updateShippingMethod,
  getShippingMethodById,
  deleteShippingMethod,
};
