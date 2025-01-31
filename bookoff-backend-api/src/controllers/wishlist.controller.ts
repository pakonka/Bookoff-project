import { Request, Response } from "express";
import wishlistService from "../services/wishlist.service";

const getAllWishlists = async (req: Request, res: Response) => {
  const wishlists = await wishlistService.getAllWishlists();
  res.json(wishlists);
};

const getWishlistItemById = async (req: Request, res: Response) => {
  const wishlistItem = await wishlistService.getWishlistItemById(
    Number(req.params.id)
  );
  res.json(wishlistItem);
};

const getWishlistItemByCustomerId = async (req: Request, res: Response) => {
  const wishlistItem = await wishlistService.getWishlistItemByCustomerId(
    Number(req.params.id)
  );
  res.json(wishlistItem);
};

const createWishlistItem = async (req: Request, res: Response) => {
  const newWishlistItem = await wishlistService.createWishlistItem(req.body);
  res.status(201).json(newWishlistItem);
};

const updateWishlistItem = async (req: Request, res: Response) => {
  const updatedWishlistItem = await wishlistService.updateWishlistItem(
    Number(req.params.id),
    req.body
  );
  res.json(updatedWishlistItem);
};

const deleteWishlistItem = async (req: Request, res: Response) => {
  const deletedWishlistItem = await wishlistService.deleteWishlistItem(
    Number(req.params.id)
  );
  res.json(deletedWishlistItem);
};

export default {
  getAllWishlists,
  getWishlistItemById,
  getWishlistItemByCustomerId,
  createWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
};
