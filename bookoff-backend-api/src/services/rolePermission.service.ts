import { myDataSource } from "../databases/data_source";
import { RolePermission } from "../databases/entities/rolePermission.entity";
import createError from "http-errors";

// Assign a permission to a role
const assignPermissionToRole = async (
  roleId: number,
  permissionId: number
): Promise<RolePermission> => {
  try {
    // Check if the role-permission pair already exists
    const existingEntry = await myDataSource
      .getRepository(RolePermission)
      .findOne({ where: { role_id: roleId, permission_id: permissionId } });

    if (existingEntry) {
      throw createError(400, "Permission already assigned to this role");
    }

    // Create and save the new role-permission entry
    const rolePermission = new RolePermission();
    rolePermission.role_id = roleId;
    rolePermission.permission_id = permissionId;

    const savedRolePermission = await myDataSource
      .getRepository(RolePermission)
      .save(rolePermission);

    return savedRolePermission;
  } catch (error: any) {
    throw createError(
      500,
      `Error assigning permission to role: ${error.message}`
    );
  }
};
// Get all permissions assigned to a role
const getPermissionsByRole = async (
  roleId: number
): Promise<RolePermission[]> => {
  try {
    const result = await myDataSource.query(
      `SELECT * FROM role_permissions WHERE role_id = @0`,
      [roleId]
    );

    if (result.length === 0) {
      throw createError(404, "No permissions found for this role");
    }

    return result;
  } catch (error: any) {
    throw createError(
      500,
      `Error fetching permissions for role: ${error.message}`
    );
  }
};

// Remove a permission from a role
const removePermissionFromRole = async (
  roleId: number,
  permissionId: number
): Promise<void> => {
  try {
    const result = await myDataSource.query(
      `DELETE FROM role_permissions WHERE role_id = @0 AND permission_id = @1`,
      [roleId, permissionId]
    );

    if (result.affectedRows === 0) {
      throw createError(404, "Permission not found for this role");
    }
  } catch (error: any) {
    throw createError(
      500,
      `Error removing permission from role: ${error.message}`
    );
  }
};

export default {
  assignPermissionToRole,
  getPermissionsByRole,
  removePermissionFromRole,
};
