import { myDataSource } from "../databases/data_source";
import createError from "http-errors";
import { Banner } from "../databases/entities/banner.entity";

// Get all banners
const getAllBanners = async () => {
  return await myDataSource.query(`SELECT * FROM banners`);
};

// Get banner by ID
const getBannerById = async (id: number) => {
  const result = await myDataSource.query(
    `
    SELECT * FROM banners WHERE banner_id = @0
  `,
    [id]
  );

  if (result.length === 0) {
    throw createError(404, "Banner not found");
  }
  return result[0];
};

// Create a new banner
const createBanner = async (payload: Partial<Banner>) => {
  const { discount_id, title, image_url, is_active } = payload;

  await myDataSource.query(
    `
    INSERT INTO banners (discount_id, title, image_url, is_active)
    VALUES (@0, @1, @2, @3)
  `,
    [discount_id, title, image_url, is_active ?? 1]
  );

  return { ...payload };
};

// Update banner by ID
const updateBanner = async (id: number, payload: Partial<Banner>) => {
  const existingBanner = await getBannerById(id);
  if (!existingBanner) {
    throw createError(404, "Banner not found");
  }

  const { discount_id, title, image_url, is_active } = payload;

  await myDataSource.query(
    `
    UPDATE banners
    SET 
      discount_id = @0,
      title = @1,
      image_url = @2,
      is_active = @3
    WHERE banner_id = @4
  `,
    [discount_id, title, image_url, is_active, id]
  );

  return { ...existingBanner, ...payload };
};

// Delete banner by ID
const deleteBanner = async (id: number) => {
  const existingBanner = await getBannerById(id);
  if (!existingBanner) {
    throw createError(404, "Banner not found");
  }

  await myDataSource.query(
    `
    DELETE FROM banners WHERE banner_id = @0
  `,
    [id]
  );

  return existingBanner;
};

export default {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
};
