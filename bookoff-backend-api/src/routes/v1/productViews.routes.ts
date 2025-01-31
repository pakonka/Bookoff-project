import express from "express";
import productViewsController from "../../controllers/productViews.controller";

const router = express.Router();

router.get("", productViewsController.getAllProductViews);
router.get("/:id", productViewsController.getProductViewById);
router.post("", productViewsController.createProductView);
router.put("/:id", productViewsController.updateProductView);
router.delete("/:id", productViewsController.deleteProductView);

export default router;
