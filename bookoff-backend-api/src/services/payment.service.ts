import { myDataSource } from "../databases/data_source";
import { Payment } from "../databases/entities/payment.entity"; // Giả sử bạn đã tạo thực thể Payment

// Get all payments
const getAllPayments = async () => {
  return await myDataSource.query(`
    SELECT * FROM payments
  `);
};

// Create a new payment
const createPayment = async (payload: Partial<Payment>) => {
  const {
    order_id, // Chỉnh sửa tên thuộc tính
    payment_date,
    payment_method,
    amount,
    payment_status,
  } = payload;

  await myDataSource.query(
    `
    INSERT INTO payments (order_id, payment_date, payment_method, amount, payment_status)
    VALUES (@0, @1, @2, @3, @4)
  `,
    [
      order_id, // Chỉnh sửa tên thuộc tính
      payment_date,
      payment_method,
      amount,
      payment_status,
    ]
  );

  return { ...payload };
};

// Update payment by ID
const updatePayment = async (payment_id: number, payload: Partial<Payment>) => {
  // Chỉnh sửa tên tham số
  const existingPayment = await getPaymentById(payment_id); // Chỉnh sửa tên tham số
  if (!existingPayment) {
    throw new Error("Payment not found");
  }

  const { order_id, payment_date, payment_method, amount, payment_status } =
    payload;

  await myDataSource.query(
    `
    UPDATE payments
    SET order_id = @0, payment_date = @1, payment_method = @2, amount = @3, payment_status = @4
    WHERE payment_id = @5
  `,
    [
      order_id,
      payment_date,
      payment_method,
      amount,
      payment_status,
      payment_id, // Chỉnh sửa tên tham số
    ]
  );

  return { ...existingPayment, ...payload };
};

// Get payment by ID
const getPaymentById = async (payment_id: number) => {
  // Chỉnh sửa tên tham số
  const result = await myDataSource.query(
    `
    SELECT * FROM payments WHERE payment_id = @0
  `,
    [payment_id] // Chỉnh sửa tên tham số
  );

  if (result.length === 0) {
    throw new Error("Payment not found");
  }
  return result[0];
};

// Delete payment by ID
const deletePayment = async (payment_id: number) => {
  // Chỉnh sửa tên tham số
  const existingPayment = await getPaymentById(payment_id); // Chỉnh sửa tên tham số
  if (!existingPayment) {
    throw new Error("Payment not found");
  }

  await myDataSource.query(
    `
    DELETE FROM payments WHERE payment_id = @0
  `,
    [payment_id] // Chỉnh sửa tên tham số
  );

  return existingPayment;
};

export default {
  getAllPayments,
  createPayment,
  updatePayment,
  getPaymentById,
  deletePayment,
};
