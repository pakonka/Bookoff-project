import express from "express";
import categoryController from "../../controllers/category.controller";

const router = express.Router();

// Định nghĩa route cho danh mục
router.get("", categoryController.getAllCategories);
router.get("/parent", categoryController.getParentCategories);
router.get("/sub-category", categoryController.getSubCategories);
router.get("/parent/:parentId", categoryController.getCategoriesByParentId);
router.get("/parent/slug/:slug", categoryController.getCategoriesByParentSlug);
router.get("/slug/:slug", categoryController.getCategoryBySlug);
router.get("/:id", categoryController.getCategoryById);
router.post("", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
