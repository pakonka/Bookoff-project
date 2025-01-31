import { Request, Response } from "express";
import cartService from "../services/cart.service";

const getAllCarts = async (req: Request, res: Response) => {
  const carts = await cartService.getAllCarts();
  res.json(carts);
};

const getCartById = async (req: Request, res: Response) => {
  const cart = await cartService.getCartById(Number(req.params.id));
  res.json(cart);
};

const createCart = async (req: Request, res: Response) => {
  const newCart = await cartService.createCart(req.body);
  res.status(201).json(newCart);
};

const updateCart = async (req: Request, res: Response) => {
  const updatedCart = await cartService.updateCart(
    Number(req.params.id),
    req.body
  );
  res.json(updatedCart);
};

const deleteCart = async (req: Request, res: Response) => {
  const deletedCart = await cartService.deleteCart(Number(req.params.id));
  res.json(deletedCart);
};

export default {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
};
