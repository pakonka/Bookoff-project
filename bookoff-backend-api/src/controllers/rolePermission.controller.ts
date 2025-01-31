import { Request, Response } from "express";
import rolePermissionService from "../services/rolePermission.service";
import createError from "http-errors";

// Assign permission to a role
const assignPermissionToRole = async (req: Request, res: Response) => {
  const { roleId, permissionId } = req.body; // Assuming roleId and permissionId are sent in the body

  try {
    // Call the service to assign the permission to the role
    await rolePermissionService.assignPermissionToRole(roleId, permissionId);

    // Respond with a success message
    res
      .status(201)
      .json({ message: "Permission assigned to role successfully." });
  } catch (error: any) {
    if (error.status === 400) {
      res.status(400).json({ error: error.message });
    } else {
      res
        .status(500)
        .json({ error: `Internal Server Error: ${error.message}` });
    }
  }
};

// Get all permissions assigned to a role
const getPermissionsByRole = async (req: Request, res: Response) => {
  const { roleId } = req.params; // Assuming roleId is passed as a URL parameter

  try {
    // Call the service to fetch permissions by roleId
    const permissions = await rolePermissionService.getPermissionsByRole(
      parseInt(roleId)
    );

    // If permissions are found, return them
    res.status(200).json(permissions);
  } catch (error: any) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res
        .status(500)
        .json({ error: `Internal Server Error: ${error.message}` });
    }
  }
};

// Remove a permission from a role
const removePermissionFromRole = async (req: Request, res: Response) => {
  const { roleId, permissionId } = req.body; // Assuming roleId and permissionId are sent in the body

  try {
    // Call the service to remove the permission from the role
    await rolePermissionService.removePermissionFromRole(roleId, permissionId);

    // Respond with a success message
    res
      .status(200)
      .json({ message: "Permission removed from role successfully." });
  } catch (error: any) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res
        .status(500)
        .json({ error: `Internal Server Error: ${error.message}` });
    }
  }
};

export default {
  assignPermissionToRole,
  getPermissionsByRole,
  removePermissionFromRole,
};
