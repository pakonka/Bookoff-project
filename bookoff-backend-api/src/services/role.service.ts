import { myDataSource } from "../databases/data_source";
import { Role } from "../databases/entities/role.entity";
import createError from "http-errors";

// Get all roles
const getAllRoles = async (): Promise<Role[]> => {
  try {
    const roles = await myDataSource.query(`SELECT * FROM roles`);
    return roles;
  } catch (error: any) {
    throw createError(500, `Error fetching roles: ${error.message}`);
  }
};

// Get role by ID
const getRoleById = async (id: number): Promise<Role> => {
  try {
    const result = await myDataSource.query(
      `SELECT * FROM roles WHERE role_id = @0`,
      [id]
    );

    if (result.length === 0) {
      throw createError(404, "Role not found");
    }
    return result[0];
  } catch (error: any) {
    throw createError(500, `Error fetching role: ${error.message}`);
  }
};

// Create a new role
const createRole = async (payload: Partial<Role>): Promise<Role> => {
  const { role_name, description } = payload;

  try {
    const existingRole = await myDataSource.query(
      `SELECT * FROM roles WHERE role_name = @0`,
      [role_name]
    );

    if (existingRole.length > 0) {
      throw createError(400, "Role with this name already exists");
    }

    await myDataSource.query(
      `
      INSERT INTO roles (role_name, description)
      VALUES (@0, @1)
    `,
      [role_name, description]
    );

    // Fetch the newly created role
    const newRole = await myDataSource.query(
      `SELECT * FROM roles WHERE role_name = @0`,
      [role_name]
    );

    return newRole[0];
  } catch (error: any) {
    throw createError(500, `Error creating role: ${error.message}`);
  }
};

// Update role by ID
const updateRole = async (
  id: number,
  payload: Partial<Role>
): Promise<Role> => {
  const existingRole = await getRoleById(id);
  if (!existingRole) {
    throw createError(404, "Role not found");
  }

  const { role_name, description } = payload;

  try {
    await myDataSource.query(
      `
      UPDATE roles
      SET role_name = @0, description = @1
      WHERE role_id = @2
    `,
      [role_name, description, id]
    );

    const updatedRole = await getRoleById(id);
    return updatedRole;
  } catch (error: any) {
    throw createError(500, `Error updating role: ${error.message}`);
  }
};

// Delete role by ID
const deleteRole = async (id: number): Promise<Role> => {
  const existingRole = await getRoleById(id);
  if (!existingRole) {
    throw createError(404, "Role not found");
  }

  try {
    await myDataSource.query(`DELETE FROM roles WHERE role_id = @0`, [id]);
    return existingRole;
  } catch (error: any) {
    throw createError(500, `Error deleting role: ${error.message}`);
  }
};

export default {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
