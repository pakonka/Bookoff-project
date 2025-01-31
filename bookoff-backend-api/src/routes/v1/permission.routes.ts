import express from "express";
import permissionController from "../../controllers/permission.controller";

const router = express.Router();

// Get all permissions
router.get("/", permissionController.getAllPermissions);

// Get permission by ID
router.get("/:id", permissionController.getPermissionById);

// Create a new permission
router.post("/", permissionController.createPermission);

// Update permission by ID
router.put("/:id", permissionController.updatePermission);

// Delete permission by ID
router.delete("/:id", permissionController.deletePermission);

router.get("/user/:userId", permissionController.getPermissionsByUserId);

export default router;
