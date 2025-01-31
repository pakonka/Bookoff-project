import { Request, Response } from "express";
import orderItemService from "../services/orderItem.service";

const getAllOrderItems = async (req: Request, res: Response) => {
  const orderItems = await orderItemService.getAllOrderItems();
  res.json(orderItems);
};

const getOrderItemById = async (req: Request, res: Response) => {
  const orderItem = await orderItemService.getOrderItemById(
    Number(req.params.id)
  );
  res.json(orderItem);
};

const createOrderItem = async (req: Request, res: Response) => {
  const newOrderItem = await orderItemService.createOrderItem(req.body);
  res.status(201).json(newOrderItem);
};

const updateOrderItem = async (req: Request, res: Response) => {
  const updatedOrderItem = await orderItemService.updateOrderItem(
    Number(req.params.id),
    req.body
  );
  res.json(updatedOrderItem);
};

const deleteOrderItem = async (req: Request, res: Response) => {
  const deletedOrderItem = await orderItemService.deleteOrderItem(
    Number(req.params.id)
  );
  res.json(deletedOrderItem);
};

export default {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
