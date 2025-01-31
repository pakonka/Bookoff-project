import express from "express";
import userController from "../../controllers/user.controller";
import rateLimit from "express-rate-limit";
import { authenticateToken } from "../../middlewares/auth.middleware";

// const loginLimiter = rateLimit({
//   windowMs: 5 * 60 * 1000, // 5 minutes
//   max: 5, // Limit each IP to 5 login requests per `window`
//   message:
//     "Too many login attempts from this IP, please try again after 5 minutes",
// });

const router = express.Router();

router.get("", userController.getAllUsers);
router.get("/:id(\\d+)", userController.getUserById);
router.post("", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.post("/login", userController.login);

router.get("/profile", authenticateToken(), userController.getProfile);
router.post("/refresh-token", authenticateToken(), userController.refreshToken);

export default router;
