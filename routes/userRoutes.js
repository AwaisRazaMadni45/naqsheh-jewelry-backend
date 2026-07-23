import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    addToWishlist,
    removeFromWishlist,
    getWishlist
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
], validate, registerUser);

userRoutes.post("/login", [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required")
], validate, loginUser);

userRoutes.post("/logout", logoutUser);
userRoutes.get("/:id", protect, getUserProfile);
userRoutes.put("/:id", protect, updateUserProfile);
userRoutes.delete("/:id", protect, admin, deleteUser);
userRoutes.post("/:id/wishlist", protect, addToWishlist);
userRoutes.delete("/:id/wishlist", protect, removeFromWishlist);
userRoutes.get("/:id/wishlist", protect, getWishlist);

export default userRoutes;