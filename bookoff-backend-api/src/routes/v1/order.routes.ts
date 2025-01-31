import express from "express";
import orderController from "../../controllers/order.controller";
import { authenticateToken } from "../../middlewares/auth.middleware"; // Import the authentication middleware
import { staffAuthorize } from "../../middlewares/auth.middleware"; // Import the staff authorization middleware

const router = express.Router();

// Public routes (if needed, you can modify this based on your authorization logic)
router.get(
  "",
  authenticateToken(),
  staffAuthorize(["view_orders"]),
  orderController.getAllOrders
);
router.get(
  "/:id",
  authenticateToken(),
  staffAuthorize(["view_orders"]),
  orderController.getOrderById
);
router.get(
  "/customers/:id",
  authenticateToken(),
  orderController.getOrderByCustomerId
);

// Staff-only routes
router.post(
  "",
  authenticateToken(),
  staffAuthorize(["create_order"]),
  orderController.createOrder
); // Only staff can create orders
router.put(
  "/:id",
  authenticateToken(),
  staffAuthorize(["update_order"]),
  orderController.updateOrder
); // Only staff can update orders
router.delete(
  "/:id",
  authenticateToken(),
  staffAuthorize(["delete_order"]),
  orderController.deleteOrder
); // Only staff can delete orders

export default router;
