import express from "express";
import stockController from "../../controllers/stock.controller";

const router = express.Router();

router.get("", stockController.getAllStocks);
router.get("/:id", stockController.getStockById);
router.post("", stockController.createStock);
router.put("/:id", stockController.updateStock);
router.delete("/:id", stockController.deleteStock);

export default router;
