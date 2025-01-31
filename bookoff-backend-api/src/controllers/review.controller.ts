import { Request, Response } from "express";
import reviewService from "../services/review.service";

const getAllReviews = async (req: Request, res: Response) => {
  const reviews = await reviewService.getAllReviews();
  res.json(reviews);
};

const getReviewById = async (req: Request, res: Response) => {
  const review = await reviewService.getReviewById(Number(req.params.id));
  res.json(review);
};

const getReviewByProductId = async (req: Request, res: Response) => {
  const review = await reviewService.getReviewByProductId(
    Number(req.params.id)
  );
  res.json(review);
};

const getReviewByProductSlug = async (req: Request, res: Response) => {
  const review = await reviewService.getReviewByProductSlug(req.params.slug);
  res.json(review);
};

const getReviewByUserId = async (req: Request, res: Response) => {
  const review = await reviewService.getReviewByUserId(Number(req.params.id));
  res.json(review);
};

const createReview = async (req: Request, res: Response) => {
  const newReview = await reviewService.createReview(req.body);
  res.status(201).json(newReview);
};

const updateReview = async (req: Request, res: Response) => {
  const updatedReview = await reviewService.updateReview(
    Number(req.params.id),
    req.body
  );
  res.json(updatedReview);
};

const deleteReview = async (req: Request, res: Response) => {
  const deletedReview = await reviewService.deleteReview(Number(req.params.id));
  res.json(deletedReview);
};

export default {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewByProductId,
  getReviewByProductSlug,
  getReviewByUserId,
};
