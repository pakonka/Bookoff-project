import { Request, Response } from "express";
import productService from "../services/product.service";
import createError from "http-errors";

const getAllProducts = async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

const getProductById = async (req: Request, res: Response) => {
  const product = await productService.getProductById(Number(req.params.id));
  res.json(product);
};

const getProductBySlug = async (req: Request, res: Response) => {
  const product = await productService.getProductBySlug(req.params.slug);
  res.json(product);
};

const createProduct = async (req: Request, res: Response) => {
  const newProduct = await productService.createProduct(req.body);
  res.status(201).json(newProduct);
};
const createProductByName = async (req: Request, res: Response) => {
  const newProduct = await productService.createProductByName(req.body);
  res.status(201).json(newProduct);
};

const updateProduct = async (req: Request, res: Response) => {
  const updatedProduct = await productService.updateProduct(
    Number(req.params.id),
    req.body
  );
  res.json(updatedProduct);
};

const updateProductByName = async (req: Request, res: Response) => {
  const updatedProduct = await productService.updateProductByName(
    Number(req.params.id),
    req.body.data
  );
  res.json(updatedProduct);
};

const deleteProduct = async (req: Request, res: Response) => {
  const deletedProduct = await productService.deleteProduct(
    Number(req.params.id)
  );
  res.json(deletedProduct);
};

const getProductsWithDetails = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProductsWithDetails();
    res.json(products);
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getProductDetailsById = async (req: Request, res: Response) => {
  const product = await productService.getProductDetailsById(
    Number(req.params.id)
  );
  console.log(product);
  res.json(product);
};

const getProductDetailsByCategorySlug = async (req: Request, res: Response) => {
  const product = await productService.getProductDetailsByCategorySlug(
    String(req.params.categorySlug)
  );
  res.json(product);
};

const getRecommentProducts = async (req: Request, res: Response) => {
  const products = await productService.getRecommentProducts();
  res.json(products);
};

const getTopSellingProductsByCategorySlug = async (
  req: Request,
  res: Response
) => {
  const product = await productService.getTopSellingProductsByCategorySlug(
    String(req.params.categorySlug)
  );
  res.json(product);
};

export default {
  getAllProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  updateProductByName,
  deleteProduct,
  getProductsWithDetails,
  getProductDetailsById,
  createProductByName,
  getProductDetailsByCategorySlug,
  getRecommentProducts,
  getTopSellingProductsByCategorySlug,
};
