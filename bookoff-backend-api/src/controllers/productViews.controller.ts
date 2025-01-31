import { Request, Response } from "express";
import ProductViewService from "../services/productViews.service";
import createError from "http-errors";

// Lấy tất cả các lượt xem sản phẩm
const getAllProductViews = async (req: Request, res: Response) => {
  try {
    const productViews = await ProductViewService.getAllProductViews();
    res.json(productViews);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Lấy lượt xem của sản phẩm theo ID
const getProductViewById = async (req: Request, res: Response) => {
  try {
    const productView = await ProductViewService.getProductViewsByUserId(
      Number(req.params.id)
    );
    if (!productView) {
      throw createError(404, "Product view not found");
    }
    res.json(productView);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// Thêm lượt xem mới cho sản phẩm
const createProductView = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body; // Lấy userId và productId từ body của request
    const newProductView = await ProductViewService.createProductView(
      userId,
      productId
    );
    res.status(201).json(newProductView);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Cập nhật lượt xem của sản phẩm
const updateProductView = async (req: Request, res: Response) => {
  try {
    const updatedProductView = await ProductViewService.updateProductView(
      Number(req.params.id),
      req.body
    );
    res.json(updatedProductView);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// Xóa lượt xem của sản phẩm
const deleteProductView = async (req: Request, res: Response) => {
  try {
    const deletedProductView = await ProductViewService.deleteProductView(
      Number(req.params.id)
    );
    res.json(deletedProductView);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export default {
  getAllProductViews,
  getProductViewById,
  createProductView,
  updateProductView,
  deleteProductView,
};
