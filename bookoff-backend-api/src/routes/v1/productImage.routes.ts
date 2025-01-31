import express from "express";
import productImageController from "../../controllers/productImage.controller";

const router = express.Router();

router.get("", productImageController.getAllProductImages);
router.get("/:id", productImageController.getProductImageById);
router.post("", productImageController.createProductImage);
router.put("/:id", productImageController.updateProductImage);
router.delete("/:id", productImageController.deleteProductImage);

export default router;
