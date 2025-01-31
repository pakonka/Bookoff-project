import express from "express";
import staffController from "../../controllers/staff.controller";

const router = express.Router();

// Lấy tất cả nhân viên (role_id không NULL)
router.get("/", staffController.getStaff);

// Lấy nhân viên theo role (Manager, Admin, Employee)
router.get("/role/:roleName", staffController.getStaffWithRole);

// Lấy thông tin nhân viên theo userId và role
router.get("/:userId", staffController.getStaffById);

export default router;
