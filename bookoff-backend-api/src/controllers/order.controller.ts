import { Request, Response } from "express";
import orderService from "../services/order.service";

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await orderService.getAllOrders();
  res.json(orders);
};

const getOrderById = async (req: Request, res: Response) => {
  const order = await orderService.getOrderById(Number(req.params.id));
  res.json(order);
};

const getOrderByCustomerId = async (req: Request, res: Response) => {
  const order = await orderService.getOrderByCustomerId(Number(req.params.id));
  res.json(order);
};

const createOrder = async (req: Request, res: Response) => {
  const newOrder = await orderService.createOrder(req.body);
  res.status(201).json(newOrder);
};

const updateOrder = async (req: Request, res: Response) => {
  const updatedOrder = await orderService.updateOrder(
    Number(req.params.id),
    req.body
  );
  res.json(updatedOrder);
};

const deleteOrder = async (req: Request, res: Response) => {
  const deletedOrder = await orderService.deleteOrder(Number(req.params.id));
  res.json(deletedOrder);
};

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderByCustomerId,
};
