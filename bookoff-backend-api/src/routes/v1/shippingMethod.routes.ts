import express from "express";
import shippingMethodController from "../../controllers/shippingMethod.controller";

const router = express.Router();

router.get("", shippingMethodController.getAllShippingMethods);
router.get("/:id", shippingMethodController.getShippingMethodById);
router.post("", shippingMethodController.createShippingMethod);
router.put("/:id", shippingMethodController.updateShippingMethod);
router.delete("/:id", shippingMethodController.deleteShippingMethod);

export default router;
