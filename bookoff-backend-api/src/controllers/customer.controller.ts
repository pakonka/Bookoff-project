import { Request, Response } from "express";
import customerService from "../services/customer.service";
import createError from "http-errors";

// Get all customers (role_id is NULL)
const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await customerService.getCustomers();
    res.json(customers);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
const getCustomersCount = async (req: Request, res: Response) => {
  try {
    const customers = await customerService.getCustomersCount();
    res.json(customers);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
const getCustomerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const customer = await customerService.getCustomerById(Number(id));
    res.status(200).json(customer);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default {
  getCustomers,
  getCustomerById,
  getCustomersCount,
};
