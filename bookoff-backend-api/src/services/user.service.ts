import { myDataSource } from "../databases/data_source";
import createError from "http-errors";
import { User } from "../databases/entities/user.entity";
import { comparePassword } from "../helpers/passwordHelper";
import { getTokens } from "../helpers/tokenHelper";
import { hashPassword } from "../helpers/passwordHelper";
// Get all users
const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await myDataSource.query(`
      SELECT 
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
GROUP BY 
    u.user_id, u.user_name, u.email, u.first_name, u.last_name, u.phone, 
    u.address, u.city, u.country, u.postal_code, u.created_at, 
    u.is_active, u.occupation, u.gender, r.role_name, r.description;
`);
    return users;
  } catch (error: any) {
    throw createError(500, `Error fetching users: ${error.message}`);
  }
};

// Get user by ID
const getUserById = async (id: number) => {
  console.log(id);
  try {
    const result = await myDataSource.query(
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
    u.user_point,
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
    u.user_id = @0
GROUP BY 
    u.user_id, u.user_name, u.email, u.first_name, u.last_name, u.phone, 
    u.address, u.city, u.country,u.user_avatar,
    u.user_point, u.postal_code, u.created_at, 
    u.is_active, u.occupation, u.gender, r.role_name, r.description; 
`,
      [id]
    );
    console.log("res", result);
    if (result.length === 0) {
      throw createError(404, "User get not found");
    }
    return result[0];
  } catch (error: any) {
    throw createError(500, `Error fetching user: ${error.message}`);
  }
};

// Create a new user
const createUser = async (payload: any) => {
  const {
    user_name,
    email,
    password,
    first_name,
    last_name,
    phone,
    address,
    city,
    country,
    postal_code,
    occupation,
    gender,
    user_avatar,
    role_name, // Sử dụng roleName để đại diện cho role_name
  } = payload;

  if (!user_name || !email || !password) {
    throw createError(400, "user_name, email, and password are required");
  }

  try {
    // Tra cứu role_id từ role_name
    let role_id: number | null = null;
    if (role_name) {
      const roleResult = await myDataSource.query(
        `
        SELECT role_id 
        FROM roles 
        WHERE role_name = @0
        `,
        [role_name]
      );

      if (roleResult.length === 0) {
        console.warn(`Role not found: ${role_name}`);
      } else {
        role_id = roleResult[0].role_id;
      }
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hashPassword(password);

    // Chèn người dùng vào bảng `users`
    await myDataSource.query(
      `
      INSERT INTO users (
        user_name, email, password, first_name, last_name, phone, address, city, country, postal_code, occupation, gender, role_id, user_avatar, created_at
      )
      VALUES (@0, @1, @2, @3, @4, @5, @6, @7, @8, @9, @10, @11, @12, @13, GETDATE())
      `,
      [
        user_name,
        email,
        hashedPassword, // Mật khẩu đã mã hóa
        first_name,
        last_name,
        phone,
        address,
        city,
        country,
        postal_code,
        occupation,
        gender,
        role_id, // Có thể là `null`
        user_avatar,
      ]
    );

    return { ...payload, password: hashedPassword } as User;
  } catch (error: any) {
    throw createError(500, `Error creating user: ${error.message}`);
  }
};

// Update user by ID
const updateUser = async (id: number, payload: any) => {
  const existingUser = await getUserById(id);
  if (!existingUser) {
    throw createError(404, "User not found");
  }

  const {
    user_name,
    email,
    password,
    first_name,
    last_name,
    phone,
    address,
    city,
    country,
    postal_code,
    occupation,
    gender,
    updated_by,
    role_name, // Role name
    user_avatar,
  } = payload;

  try {
    let role_id = existingUser.role; // Giữ nguyên role_id nếu không truyền role_name

    // Nếu có role_name, tra cứu role_id
    if (role_name) {
      const roleResult = await myDataSource.query(
        ` 
        SELECT role_id 
        FROM roles 
        WHERE role_name = @0
        `,
        [role_name]
      );

      if (roleResult.length === 0) {
        throw createError(404, `Role not found: ${role_name}`);
      }

      role_id = roleResult[0].role_id;
    }

    // Cập nhật người dùng
    await myDataSource.query(
      `
      UPDATE users
      SET 
        user_name = COALESCE(@0, user_name),
        email = COALESCE(@1, email),
        password = COALESCE(@2, password),
        first_name = COALESCE(@3, first_name),
        last_name = COALESCE(@4, last_name),
        phone = COALESCE(@5, phone),
        address = COALESCE(@6, address),
        city = COALESCE(@7, city),
        country = COALESCE(@8, country),
        postal_code = COALESCE(@9, postal_code),
        occupation = COALESCE(@10, occupation),
        gender = COALESCE(@11, gender),
        updated_by = COALESCE(@12, updated_by),
        role_id = COALESCE(@13, role_id),
        user_avatar = COALESCE(@14, user_avatar),
        updated_at = GETDATE()
      WHERE user_id = @15
      `,
      [
        user_name,
        email,
        password ? await hashPassword(password) : null, // Mã hóa mật khẩu nếu được cập nhật
        first_name,
        last_name,
        phone,
        address,
        city,
        country,
        postal_code,
        occupation,
        gender,
        updated_by,
        role_id,
        user_avatar,
        id,
      ]
    );

    return { ...existingUser, ...payload, role_id: role_id } as User;
  } catch (error: any) {
    throw createError(500, `Error updating user: ${error.message}`);
  }
};

// Delete user by ID
const deleteUser = async (id: number): Promise<User> => {
  const existingUser = await getUserById(id);
  if (!existingUser) {
    throw createError(404, "User de not found");
  }

  try {
    await myDataSource.query(`DELETE FROM users WHERE user_id = @0`, [id]);
    return existingUser;
  } catch (error: any) {
    throw createError(500, `Error deleting user: ${error.message}`);
  }
};

const login = async (email: string, password: string) => {
  if (!email || !password) {
    console.error("Login attempt with missing credentials:", {
      email,
      password,
    });
    throw createError(400, "Email and password are required");
  }

  try {
    // console.log("Querying user with email:", email);
    const user = await myDataSource.query(
      `SELECT * FROM users WHERE email = @0`,
      [email]
    );

    if (user.length === 0) {
      console.warn("Login attempt failed: User not found for email:", email);
      throw createError(401, "Invalid email or password");
    }

    // console.log("User found, validating password for:", email);
    const isPasswordValid = await comparePassword(password, user[0].password);
    if (!isPasswordValid) {
      console.warn("Login attempt failed: Invalid password for email:", email);
      throw createError(401, "Invalid email or password");
    }

    console.log("Password valid, generating tokens for user:", user[0].user_id);
    const tokens = getTokens({
      user_id: user[0].user_id,
      email: user[0].email,
      role_id: user[0].role_id,
    });

    return tokens;
  } catch (error: any) {
    console.error("Error during login:", error);
    throw createError(500, "Error logging in: " + error.message);
  }
};

// Get profile function
const getProfile = async (userId: number) => {
  try {
    const userProfile = await myDataSource.query(
      `SELECT 
    users.*, 
    roles.role_name
FROM 
    users
LEFT JOIN 
    roles 
ON 
    users.role_id = roles.role_id
WHERE 
    users.user_id = @0;
`,
      [userId]
    );

    if (userProfile.length === 0) {
      throw createError(404, "User profile not found");
    }

    return userProfile[0]; // Trả về thông tin người dùng đầu tiên
  } catch (error: any) {
    // Log lỗi để dễ dàng theo dõi
    console.error("Error fetching user profile:", error);

    // Ném lỗi với thông điệp rõ ràng hơn
    throw createError(
      500,
      "Error fetching user profile: " + (error.message || "Unknown error")
    );
  }
};
export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  getProfile,
};
