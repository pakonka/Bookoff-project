import { Request, Response } from "express";
import productImageService from "../services/productImage.service";

const getAllProductImages = async (req: Request, res: Response) => {
  const productImages = await productImageService.getAllProductImages();
  res.json(productImages);
};

const getProductImageById = async (req: Request, res: Response) => {
  const productImage = await productImageService.getProductImageById(
    Number(req.params.id)
  );
  res.json(productImage);
};

const createProductImage = async (req: Request, res: Response) => {
  const newProductImage = await productImageService.createProductImage(
    req.body
  );
  res.status(201).json(newProductImage);
};

const updateProductImage = async (req: Request, res: Response) => {
  const updatedProductImage = await productImageService.updateProductImage(
    Number(req.params.id),
    req.body
  );
  res.json(updatedProductImage);
};

const deleteProductImage = async (req: Request, res: Response) => {
  const deletedProductImage = await productImageService.deleteProductImage(
    Number(req.params.id)
  );
  res.json(deletedProductImage);
};

export default {
  getAllProductImages,
  getProductImageById,
  createProductImage,
  updateProductImage,
  deleteProductImage,
};
