import { Request, Response } from "express";
import shippingMethodService from "../services/shippingMethod.service";

const getAllShippingMethods = async (req: Request, res: Response) => {
  const shippingMethods = await shippingMethodService.getAllShippingMethods();
  res.json(shippingMethods);
};

const getShippingMethodById = async (req: Request, res: Response) => {
  const shippingMethod = await shippingMethodService.getShippingMethodById(
    Number(req.params.id)
  );
  res.json(shippingMethod);
};

const createShippingMethod = async (req: Request, res: Response) => {
  const newShippingMethod = await shippingMethodService.createShippingMethod(
    req.body
  );
  res.status(201).json(newShippingMethod);
};

const updateShippingMethod = async (req: Request, res: Response) => {
  const updatedShippingMethod =
    await shippingMethodService.updateShippingMethod(
      Number(req.params.id),
      req.body
    );
  res.json(updatedShippingMethod);
};

const deleteShippingMethod = async (req: Request, res: Response) => {
  const deletedShippingMethod =
    await shippingMethodService.deleteShippingMethod(Number(req.params.id));
  res.json(deletedShippingMethod);
};

export default {
  getAllShippingMethods,
  getShippingMethodById,
  createShippingMethod,
  updateShippingMethod,
  deleteShippingMethod,
};
