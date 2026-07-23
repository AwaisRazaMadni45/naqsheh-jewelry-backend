import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getBestSellers
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const productRoutes = express.Router();

productRoutes.post("/", [
    body("name").notEmpty().withMessage("Product name is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("stock").isNumeric().withMessage("Stock must be a number"),
    body("category").notEmpty().withMessage("Category is required")
], validate, protect, admin, createProduct);

productRoutes.get("/", getAllProducts);

productRoutes.get("/best-sellers", getBestSellers);
productRoutes.get("/:id", getProduct);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;