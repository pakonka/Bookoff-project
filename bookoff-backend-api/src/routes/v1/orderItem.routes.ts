import express from "express";
import orderItemController from "../../controllers/orderItem.controller";

const router = express.Router();

router.get("", orderItemController.getAllOrderItems);
router.get("/:id", orderItemController.getOrderItemById);
router.post("", orderItemController.createOrderItem);
router.put("/:id", orderItemController.updateOrderItem);
router.delete("/:id", orderItemController.deleteOrderItem);

export default router;
