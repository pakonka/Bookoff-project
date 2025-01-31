import { Request, Response } from "express";
import staffService from "../services/staff.service";
import createError from "http-errors";

// Lấy tất cả nhân viên (role_id không NULL)
const getStaff = async (req: Request, res: Response) => {
  try {
    const staff = await staffService.getStaff();
    res.json(staff);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Lấy nhân viên theo role (e.g., Manager, Admin, Employee)
const getStaffWithRole = async (req: Request, res: Response) => {
  const { roleName } = req.params; // Extract role name from the URL parameters

  try {
    const staffWithRole = await staffService.getStaffWithRole(roleName);

    if (staffWithRole.length === 0) {
      return res
        .status(404)
        .json({ message: `No staff found with role ${roleName}` });
    }

    res.status(200).json(staffWithRole); // Return the staff with the specified role
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Lấy thông tin nhân viên theo ID và role
const getStaffById = async (req: Request, res: Response) => {
  const { userId } = req.params; // Lấy userId từ tham số đường dẫn (route parameter)

  try {
    // Call the service method to fetch staff by userId
    const staff = await staffService.getStaffById(Number(userId));

    // Nếu không tìm thấy nhân viên, trả về lỗi 404
    if (!staff) {
      return res
        .status(404)
        .json({ message: `Staff with ID ${userId} not found` });
    }

    res.status(200).json(staff); // Trả về thông tin nhân viên
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default {
  getStaff,
  getStaffWithRole,
  getStaffById,
};
