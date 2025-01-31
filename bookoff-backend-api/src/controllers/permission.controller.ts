import { Request, Response } from "express";
import permissionService from "../services/permission.service"; // Import your service for interacting with the database

// Get all permissions
const getAllPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await permissionService.getAllPermissions();
    res.status(200).json(permissions);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Get permission by ID
const getPermissionById = async (req: Request, res: Response) => {
  const { id } = req.params; // Get the ID from the URL parameter
  try {
    const permission = await permissionService.getPermissionById(Number(id));
    res.status(200).json(permission);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Create a new permission
const createPermission = async (req: Request, res: Response) => {
  const payload = req.body; // Get the new permission data from the request body
  try {
    const newPermission = await permissionService.createPermission(payload);
    res.status(201).json(newPermission);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Update permission by ID
const updatePermission = async (req: Request, res: Response) => {
  const { id } = req.params; // Get the permission ID from the URL parameter
  const payload = req.body; // Get the updated permission data from the request body
  try {
    const updatedPermission = await permissionService.updatePermission(
      Number(id),
      payload
    );
    res.status(200).json(updatedPermission);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Delete permission by ID
const deletePermission = async (req: Request, res: Response) => {
  const { id } = req.params; // Get the permission ID from the URL parameter
  try {
    const deletedPermission = await permissionService.deletePermission(
      Number(id)
    );
    res.status(200).json(deletedPermission);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getPermissionsByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  try {
    const permissions = await permissionService.getPermissionsByUserId(userId);
    res.json(permissions);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
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
