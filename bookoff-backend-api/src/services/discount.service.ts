import { myDataSource } from "../databases/data_source";
import createError from "http-errors";
import { Discount } from "../databases/entities/discount.entity";

// Get all discounts
const getAllDiscounts = async () => {
  return await myDataSource.query(`SELECT * FROM discounts`);
};

// Get discount by ID
const getDiscountById = async (id: number) => {
  const result = await myDataSource.query(
    `
    SELECT * FROM discounts WHERE discount_id = @0
  `,
    [id]
  );

  if (result.length === 0) {
    throw createError(404, "Discount not found");
  }
  return result[0];
};

// Create a new discount
const createDiscount = async (payload: Partial<Discount>) => {
  const {
    discountCode,
    discountPercentage,
    validFrom,
    validUntil,
    active,
    discountType,
    requiredQuantity,
  } = payload;

  await myDataSource.query(
    `
    INSERT INTO discounts (discount_code, discount_percentage, valid_from, valid_until, active, discount_type, required_quantity)
    VALUES (@0, @1, @2, @3, @4, @5, @6)
  `,
    [
      discountCode,
      discountPercentage,
      validFrom,
      validUntil,
      active,
      discountType,
      requiredQuantity,
    ]
  );

  return { ...payload };
};

// Update discount by ID
const updateDiscount = async (id: number, payload: Partial<Discount>) => {
  const existingDiscount = await getDiscountById(id);
  if (!existingDiscount) {
    throw createError(404, "Discount not found");
  }

  const {
    discountCode,
    discountPercentage,
    validFrom,
    validUntil,
    active,
    discountType,
    requiredQuantity,
  } = payload;

  await myDataSource.query(
    `
    UPDATE discounts
    SET 
      discount_code = @0,
      discount_percentage = @1,
      valid_from = @2,
      valid_until = @3,
      active = @4,
      discount_type = @5,
      required_quantity = @6
    WHERE discount_id = @7
  `,
    [
      discountCode,
      discountPercentage,
      validFrom,
      validUntil,
      active,
      discountType,
      requiredQuantity,
      id,
    ]
  );

  return { ...existingDiscount, ...payload };
};

// Delete discount by ID
const deleteDiscount = async (id: number) => {
  const existingDiscount = await getDiscountById(id);
  if (!existingDiscount) {
    throw createError(404, "Discount not found");
  }

  await myDataSource.query(
    `
    DELETE FROM discounts WHERE discount_id = @0
  `,
    [id]
  );

  return existingDiscount;
};

export default {
  getAllDiscounts,
  getDiscountById,
  createDiscount,
  updateDiscount,
  deleteDiscount,
};
