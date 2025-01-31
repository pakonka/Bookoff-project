import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import { refreshTokenHelper, refreshTokens } from "../helpers/tokenHelper";
import { sendJsonSuccess } from "../helpers/responseHandle";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

const getUserById = async (req: Request, res: Response) => {
  console.log(req.params);
  const user = await userService.getUserById(Number(req.params.id));
  console.log(user);
  res.json(user);
};

const createUser = async (req: Request, res: Response) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
};

const updateUser = async (req: Request, res: Response) => {
  const updatedUser = await userService.updateUser(
    Number(req.params.id),
    req.body
  );
  res.json(updatedUser);
};

const deleteUser = async (req: Request, res: Response) => {
  const deletedUser = await userService.deleteUser(Number(req.params.id));
  res.json(deletedUser);
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const tokens = await userService.login(email, password);
    res.json(tokens);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Get profile function
const getProfile = async (req: Request, res: Response) => {
  const user = res.locals.user; // Giả định thông tin người dùng đã được thiết lập trong res.locals
  console.log("user", user);

  // Kiểm tra xem thông tin người dùng có tồn tại không
  if (!user) {
    return res.status(401).json({ message: "User not found Controller" });
  }

  try {
    // Gọi dịch vụ để lấy thông tin hồ sơ người dùng
    const userProfile = await userService.getProfile(user.user.id);

    // Kiểm tra xem thông tin hồ sơ có được trả về không
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Trả về thông tin hồ sơ người dùng
    res.json(userProfile);
  } catch (error: any) {
    // console.error("Error fetching user profile:", error); // Log lỗi để kiểm tra
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

// Middleware để làm mới token
const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user; // Giả sử bạn đã lưu thông tin người dùng trong res.locals
    const tokens = await refreshTokenHelper(user);
    sendJsonSuccess(res)(tokens);
  } catch (error) {
    next(error);
  }
};

// Xử lý yêu cầu làm mới token từ refresh token
const refreshTokenHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refresh_token } = req.body;

  // Giả sử refreshTokens là một hàm trả về các token mới
  const newTokens = refreshTokens(refresh_token);

  if (newTokens) {
    res.json(newTokens);
  } else {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  getProfile,
  refreshToken,
  refreshTokenHandler,
};
