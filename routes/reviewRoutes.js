import express from "express";
import {
    addReview,
    getProductReviews,
    deleteReview
} from "../controllers/reviewController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const reviewRoutes = express.Router();

reviewRoutes.post("/:id/reviews", protect, addReview);
reviewRoutes.get("/:id/reviews", getProductReviews);
reviewRoutes.delete("/:id/reviews/:reviewId", protect, admin, deleteReview);

export default reviewRoutes;