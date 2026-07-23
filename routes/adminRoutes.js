import express from "express";
import { getAdminStats } from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const adminRoutes = express.Router();

adminRoutes.get("/stats", protect, admin, getAdminStats);

export default adminRoutes;