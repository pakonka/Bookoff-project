import express from "express";
import rolePermissionController from "../../controllers/rolePermission.controller";

const router = express.Router();

// Assign permission to a role
router.post("/assign", rolePermissionController.assignPermissionToRole);

// Get all permissions assigned to a role
router.get(
  "/:roleId/permissions",
  rolePermissionController.getPermissionsByRole
);

// Remove a permission from a role
router.delete("/remove", rolePermissionController.removePermissionFromRole);

export default router;
