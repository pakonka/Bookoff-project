import { myDataSource } from "../databases/data_source";
import createError from "http-errors";
import { User } from "../databases/entities/user.entity";

// Get all customers (role_id is NULL)
const getCustomers = async (): Promise<User[]> => {
  try {
    const customers = await myDataSource.query(
      `SELECT 
    u.user_id,
    u.user_name,
    u.email,
    u.first_name,
    u.last_name,
    u.phone,
    u.address,
    u.city, 
    u.country,
    u.user_avatar,
    u.postal_code,
    u.created_at,
    u.is_active,
    u.occupation,
    u.gender 
FROM 
    users u
WHERE 
    u.role_id IS NULL;`
    );
    return customers;
  } catch (error: any) {
    throw createError(500, `Error fetching customers: ${error.message}`);
  }
};
const getCustomersCount = async (): Promise<User[]> => {
  try {
    const customerscount = await myDataSource.query(
      `WITH MonthlyUsers AS (
    SELECT 
        FORMAT(u.created_at, 'yyyy-MM') AS month, -- Chuyển ngày tạo thành định dạng yyyy-MM
        COUNT(u.user_id) AS user_count
    FROM 
        users u
    WHERE 
        u.role_id IS NULL
    GROUP BY 
        FORMAT(u.created_at, 'yyyy-MM')
)
SELECT 
    m1.month AS current_month,
    m1.user_count AS current_user_count,
    m2.user_count AS previous_user_count,
    CASE 
        WHEN m2.user_count = 0 THEN NULL -- Tránh chia cho 0
        ELSE 
            ROUND(
                (CAST(m1.user_count AS FLOAT) - m2.user_count) / m2.user_count * 100, 
                2
            )
    END AS percentage_change
FROM 
    MonthlyUsers m1
LEFT JOIN 
    MonthlyUsers m2 ON DATEADD(MONTH, 1, m2.month + '-01') = m1.month + '-01'
WHERE 
    m1.month = FORMAT(GETDATE(), 'yyyy-MM');`
    );
    return customerscount;
  } catch (error: any) {
    throw createError(500, `Error fetching customers: ${error.message}`);
  }
};

const getCustomerById = async (userId: number): Promise<User | null> => {
  try {
    const customer = await myDataSource.query(
      `
        SELECT * FROM users WHERE user_id = @0 AND role_id IS NULL
      `,
      [userId]
    );

    if (customer.length === 0) {
      throw createError(404, "Customer not found");
    }

    return customer[0]; // Trả về đối tượng customer
  } catch (error: any) {
    throw createError(500, `Error fetching customer by ID: ${error.message}`);
  }
};

export default {
  getCustomers,
  getCustomerById,
  getCustomersCount,
};
