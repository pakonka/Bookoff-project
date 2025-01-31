import { myDataSource } from "../databases/data_source";
import { Permission } from "../databases/entities/permission.entity";
import createError from "http-errors";

// Get all permissions
const getAllPermissions = async (): Promise<Permission[]> => {
  try {
    const permissions = await myDataSource.query(`SELECT * FROM permissions`);
    return permissions;
  } catch (error: any) {
    throw createError(500, `Error fetching permissions: ${error.message}`);
  }
};

// Get permission by ID
const getPermissionById = async (id: number): Promise<Permission> => {
  try {
    const result = await myDataSource.query(
      `SELECT * FROM permissions WHERE permission_id = @0`,
      [id]
    );

    if (result.length === 0) {
      throw createError(404, "Permission not found");
    }
    return result[0];
  } catch (error: any) {
    throw createError(500, `Error fetching permission: ${error.message}`);
  }
};

// Create a new permission
const createPermission = async (
  payload: Partial<Permission>
): Promise<Permission> => {
  const { permission_name, description } = payload;

  try {
    const existingPermission = await myDataSource.query(
      `SELECT * FROM permissions WHERE permission_name = @0`,
      [permission_name]
    );

    if (existingPermission.length > 0) {
      throw createError(400, "Permission with this name already exists");
    }

    await myDataSource.query(
      `
      INSERT INTO permissions (permission_name, description)
      VALUES (@0, @1)
    `,
      [permission_name, description]
    );

    // Return the created permission
    const newPermission = await myDataSource.query(
      `SELECT * FROM permissions WHERE permission_name = @0`,
      [permission_name]
    );

    return newPermission[0];
  } catch (error: any) {
    throw createError(500, `Error creating permission: ${error.message}`);
  }
};

// Update permission by ID
const updatePermission = async (
  id: number,
  payload: Partial<Permission>
): Promise<Permission> => {
  const existingPermission = await getPermissionById(id);
  if (!existingPermission) {
    throw createError(404, "Permission not found");
  }

  const { permission_name, description } = payload;

  try {
    await myDataSource.query(
      `
      UPDATE permissions
      SET permission_name = @0, description = @1
      WHERE permission_id = @2
    `,
      [permission_name, description, id]
    );

    const updatedPermission = await getPermissionById(id);
    return updatedPermission;
  } catch (error: any) {
    throw createError(500, `Error updating permission: ${error.message}`);
  }
};

// Delete permission by ID
const deletePermission = async (id: number): Promise<Permission> => {
  const existingPermission = await getPermissionById(id);
  if (!existingPermission) {
    throw createError(404, "Permission not found");
  }

  try {
    await myDataSource.query(
      `DELETE FROM permissions WHERE permission_id = @0`,
      [id]
    );
    return existingPermission;
  } catch (error: any) {
    throw createError(500, `Error deleting permission: ${error.message}`);
  }
};

// Get permissions by user ID
const getPermissionsByUserId = async (
  userId: number
): Promise<Permissions[]> => {
  try {
    const permissions = await myDataSource.query(
      `
      SELECT p.permission_name, p.description
      FROM permissions p
      JOIN role_permissions rp ON rp.permission_id = p.permission_id
      JOIN roles r ON r.role_id = rp.role_id
      JOIN users u ON u.role_id = r.role_id
      WHERE u.user_id = @0
    `,
      [userId]
    );

    if (permissions.length === 0) {
      throw createError(404, "No permissions found for this user");
    }

    return permissions;
  } catch (error: any) {
    throw createError(
      500,
      `Error fetching permissions for user: ${error.message}`
    );
  }
};

export default {
  getAllPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission,
  getPermissionsByUserId,
};
