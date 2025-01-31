import { Request, Response } from "express";
import discountService from "../services/discount.service";

const getAllDiscounts = async (req: Request, res: Response) => {
  const discounts = await discountService.getAllDiscounts();
  res.json(discounts);
};

const getDiscountById = async (req: Request, res: Response) => {
  const discount = await discountService.getDiscountById(Number(req.params.id));
  res.json(discount);
};

const createDiscount = async (req: Request, res: Response) => {
  const newDiscount = await discountService.createDiscount(req.body);
  res.status(201).json(newDiscount);
};

const updateDiscount = async (req: Request, res: Response) => {
  const updatedDiscount = await discountService.updateDiscount(
    Number(req.params.id),
    req.body
  );
  res.json(updatedDiscount);
};

const deleteDiscount = async (req: Request, res: Response) => {
  const deletedDiscount = await discountService.deleteDiscount(
    Number(req.params.id)
  );
  res.json(deletedDiscount);
};

export default {
  getAllDiscounts,
  getDiscountById,
  createDiscount,
  updateDiscount,
  deleteDiscount,
};
