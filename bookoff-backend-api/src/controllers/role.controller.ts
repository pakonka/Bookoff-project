import { Request, Response } from "express";
import roleService from "../services/role.service";
import createError from "http-errors";

// Get all roles
const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json(roles);
  } catch (error: any) {
    if (error.status === 500) {
      res
        .status(500)
        .json({ error: `Internal Server Error: ${error.message}` });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Get role by ID
const getRoleById = async (req: Request, res: Response) => {
  const { id } = req.params; // Get role ID from URL parameters

  try {
    const role = await roleService.getRoleById(parseInt(id));
    res.status(200).json(role);
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

// Create a new role
const createRole = async (req: Request, res: Response) => {
  const payload = req.body; // Get the request body for the new role

  try {
    const newRole = await roleService.createRole(payload);
    res
      .status(201)
      .json({ message: "Role created successfully", role: newRole });
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

// Update role by ID
const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params; // Get role ID from URL parameters
  const payload = req.body; // Get updated data from the request body

  try {
    const updatedRole = await roleService.updateRole(parseInt(id), payload);
    res
      .status(200)
      .json({ message: "Role updated successfully", role: updatedRole });
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

// Delete role by ID
const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params; // Get role ID from URL parameters

  try {
    const deletedRole = await roleService.deleteRole(parseInt(id));
    res
      .status(200)
      .json({ message: "Role deleted successfully", role: deletedRole });
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
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
