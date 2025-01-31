import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { globalConfig } from "../../constants/configs";
import { myDataSource } from "../databases/data_source";
import { User } from "../databases/entities/user.entity";
import { Role } from "../databases/entities/role.entity";
import { Permission } from "../databases/entities/permission.entity";
import { RolePermission } from "../databases/entities/rolePermission.entity";

interface DecodedJWT extends JwtPayload {
  _id?: string;
}

export const authenticateToken = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // console.log("Authorization header:", authHeader); // Log để kiểm tra token
    // console.log("Token extracted:", token); // Log token đã lấy

    if (!token) {
      return next(createError(401, "Unauthorized: No token provided"));
    }

    try {
      const decoded = jwt.verify(
        token,
        globalConfig.JWT_SECRET_KEY as string
      ) as DecodedJWT;

      const userRepository = myDataSource.getRepository(User);
      const userId = decoded.user_id ? Number(decoded.user_id) : undefined;

      if (!userId) {
        return next(createError(401, "Unauthorized: Invalid token payload"));
      }

      const user = await userRepository.findOne({
        where: { id: userId },
        relations: ["role"],
      });

      if (!user) {
        return next(createError(401, "Unauthorized: User not found"));
      }

      res.locals.user = { user };
      // console.log("User set in res.locals:", user);
      next();
    } catch (err) {
      console.error("Token verification error:", err); // Log lỗi nếu có
      return next(createError(403, "Forbidden: Invalid token"));
    }
  };
};

export const staffAuthorize = (requiredPermissions: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if (!user) {
      console.log("No user found in locals");
      return next(createError(401, "Unauthorized"));
    }

    // Check if user has a valid role object
    if (!user.user.role.role_id) {
      console.log("No role found for user:", user.user.role.role_id);
      return next(createError(403, "Forbidden: No role assigned"));
    }

    const roleRepository = myDataSource.getRepository(Role);
    const permissionRepository = myDataSource.getRepository(Permission);

    // Bỏ qua kiểm tra quyền nếu role_name là 'admin'
    if (user.user.role.role_name.toLowerCase() === "admin") {
      // console.log("User is admin, full access granted");
      return next();
    }

    // Get role information
    const role = await roleRepository.findOne({
      where: { role_id: user.role.role_id },
      relations: ["rolePermissions", "rolePermissions.permission"], // Get related permissions
    });

    if (!role) {
      // console.log("Role not found for user with role ID:", user.role.role_id);
      return next(createError(403, "Forbidden: Role not found"));
    }

    // Log to check permissions related to the user's role
    const permissions = role.rolePermissions.map(
      (rp) => rp.permission.permission_name
    );
    console.log("User Permissions:", permissions);

    // Log required permissions
    console.log("Required Permissions:", requiredPermissions);

    // Check if all required permissions are present in user's permissions
    const hasRequiredPermissions = requiredPermissions.every((perm) =>
      permissions.includes(perm)
    );

    console.log("Has Required Permissions:", hasRequiredPermissions);

    if (!hasRequiredPermissions) {
      return next(createError(403, "Forbidden: Insufficient permissions"));
    }

    next();
  };
};

export const authorize = (allowedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user) {
      return res.redirect("/login"); // Chuyển hướng đến trang đăng nhập
    }

    if (!allowedRoles.includes(user.role_id)) {
      return next(
        createError(403, "Forbidden: You do not have access to this resource")
      );
    }

    next();
  };
};
