import express from "express";
import reviewController from "../../controllers/review.controller";

const router = express.Router();

router.get("", reviewController.getAllReviews);
router.get("/:id", reviewController.getReviewById);
// router.get("/product/id/:id", reviewController.getReviewByProductId);
router.get("/productslug/:slug", reviewController.getReviewByProductSlug);
router.get("/customers/:id", reviewController.getReviewByUserId);
router.post("", reviewController.createReview);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

export default router;
