import { Request, Response } from "express";
import paymentService from "../services/payment.service";

const getAllPayments = async (req: Request, res: Response) => {
  const payments = await paymentService.getAllPayments();
  res.json(payments);
};

const getPaymentById = async (req: Request, res: Response) => {
  const payment = await paymentService.getPaymentById(Number(req.params.id));
  res.json(payment);
};

const createPayment = async (req: Request, res: Response) => {
  const newPayment = await paymentService.createPayment(req.body);
  res.status(201).json(newPayment);
};

const updatePayment = async (req: Request, res: Response) => {
  const updatedPayment = await paymentService.updatePayment(
    Number(req.params.id),
    req.body
  );
  res.json(updatedPayment);
};

const deletePayment = async (req: Request, res: Response) => {
  const deletedPayment = await paymentService.deletePayment(
    Number(req.params.id)
  );
  res.json(deletedPayment);
};

export default {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
