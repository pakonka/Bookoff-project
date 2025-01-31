import { Request, Response } from "express";
import stockService from "../services/stock.service";

const getAllStocks = async (req: Request, res: Response) => {
  const stocks = await stockService.getAllStocks();
  res.json(stocks);
};

const getStockById = async (req: Request, res: Response) => {
  const stock = await stockService.getStockById(Number(req.params.id));
  res.json(stock);
};

const createStock = async (req: Request, res: Response) => {
  const newStock = await stockService.createStock(req.body);
  res.status(201).json(newStock);
};

const updateStock = async (req: Request, res: Response) => {
  const updatedStock = await stockService.updateStock(
    Number(req.params.id),
    req.body
  );
  res.json(updatedStock);
};

const deleteStock = async (req: Request, res: Response) => {
  const deletedStock = await stockService.deleteStock(Number(req.params.id));
  res.json(deletedStock);
};

export default {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
};
