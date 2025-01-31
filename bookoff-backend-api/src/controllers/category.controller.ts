import { Request, Response } from "express";
import categoryService from "../services/category.service";

const getAllCategories = async (req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};

const getParentCategories = async (req: Request, res: Response) => {
  const parentCategories = await categoryService.getParentCategories();
  res.json(parentCategories);
};

const getSubCategories = async (req: Request, res: Response) => {
  const parentCategories = await categoryService.getSubCategories();
  res.json(parentCategories);
};

const getCategoriesByParentId = async (req: Request, res: Response) => {
  const categories = await categoryService.getCategoriesByParentId(
    Number(req.params.parentId)
  );
  res.json(categories);
};

const getCategoriesByParentSlug = async (req: Request, res: Response) => {
  const categories = await categoryService.getCategoriesByParentSlug(
    req.params.slug
  );
  res.json(categories);
};

const getCategoryBySlug = async (req: Request, res: Response) => {
  const category = await categoryService.getCategoryBySlug(req.params.slug);
  res.json(category);
};

const getCategoryById = async (req: Request, res: Response) => {
  const category = await categoryService.getCategoryById(Number(req.params.id));
  res.json(category);
};

const createCategory = async (req: Request, res: Response) => {
  const newCategory = await categoryService.createCategory(req.body);
  res.status(201).json(newCategory);
};

const updateCategory = async (req: Request, res: Response) => {
  const updatedCategory = await categoryService.updateCategory(
    Number(req.params.id),
    req.body
  );
  res.json(updatedCategory);
};

const deleteCategory = async (req: Request, res: Response) => {
  const deletedCategory = await categoryService.deleteCategory(
    Number(req.params.id)
  );
  res.json(deletedCategory);
};

export default {
  getAllCategories,
  getParentCategories,
  getSubCategories,
  getCategoriesByParentId,
  getCategoriesByParentSlug,
  getCategoryBySlug,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
