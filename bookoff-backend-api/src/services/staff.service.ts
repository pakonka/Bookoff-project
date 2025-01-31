import { myDataSource } from "../databases/data_source";
import createError from "http-errors";
import { User } from "../databases/entities/user.entity";

// Get all staff (role_id is not NULL)
const getStaff = async (): Promise<User[]> => {
  try {
    const staff = await myDataSource.query(
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
    u.postal_code,
    u.created_at,
    u.is_active,
    u.occupation,
    u.gender,
    u.user_avatar,
    r.role_name,
    r.description AS role_description,
    STRING_AGG(p.permission_name, ', ') AS permissions
FROM 
    users u
LEFT JOIN 
    roles r ON u.role_id = r.role_id
LEFT JOIN 
    role_permissions rp ON r.role_id = rp.role_id
LEFT JOIN 
    permissions p ON rp.permission_id = p.permission_id
WHERE 
    u.role_id IS NOT NULL
GROUP BY 
    u.user_id, u.user_name, u.email,u.user_avatar, u.first_name, u.last_name, u.phone, 
    u.address, u.city, u.country, u.postal_code, u.created_at, 
    u.is_active, u.occupation, u.gender, r.role_name, r.description;
`
    );
    return staff;
  } catch (error: any) {
    throw createError(500, `Error fetching staff: ${error.message}`);
  }
};

// Get staff with specific role
const getStaffWithRole = async (roleName: string): Promise<User[]> => {
  try {
    const staffWithRole = await myDataSource.query(
      `SELECT u.* FROM users u 
         INNER JOIN roles r ON u.role_id = r.role_id 
         WHERE r.role_name = @0 AND u.role_id IS NOT NULL`,
      [roleName] // This is where the roleName will be passed as a parameter
    );

    if (staffWithRole.length === 0) {
      return []; // No staff found with the specified role
    }

    return staffWithRole; // Return the staff with the specified role
  } catch (error: any) {
    throw createError(
      500,
      `Error fetching staff with role ${roleName}: ${error.message}`
    );
  }
};

// Get staff by ID
const getStaffById = async (userId: number): Promise<User | null> => {
  try {
    const staff = await myDataSource.query(
      `SELECT * FROM users WHERE user_id = @0 AND role_id IS NOT NULL`,
      [userId]
    );

    if (staff.length === 0) {
      return null; // Không tìm thấy nhân viên
    }

    return staff[0]; // Trả về nhân viên đầu tiên
  } catch (error: any) {
    throw createError(500, `Error fetching staff by ID: ${error.message}`);
  }
};

export default {
  getStaff,
  getStaffWithRole,
  getStaffById,
};
