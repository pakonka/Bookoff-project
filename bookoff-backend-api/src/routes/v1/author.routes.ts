import express from "express";
import authorController from "../../controllers/author.controller";

const router = express.Router();

router.get("", authorController.getAllAuthors);
router.get("/:id", authorController.getAuthorById);
router.get("/slug/:slug", authorController.getAuthorById);
router.post("", authorController.createAuthor);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);

export default router;
