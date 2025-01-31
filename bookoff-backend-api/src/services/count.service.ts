import createError from "http-errors";
import { myDataSource } from "../databases/data_source";

const getCounts = async (): Promise<any[]> => {
  try {
    const counts = await myDataSource.query(`
        SELECT
          (SELECT COUNT(*) FROM products) AS total_products,
          (SELECT COUNT(*) FROM users WHERE role_id IS NULL) AS total_customers,
          (SELECT COUNT(*) FROM users WHERE role_id IS NOT NULL) AS total_staffs
      `);
    return counts[0];
  } catch (error: any) {
    throw createError(500, `Error fetching counts: ${error.message}`);
  }
};

export default {
  getCounts,
};
