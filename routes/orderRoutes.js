import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import {
    createOrder,
    getOrderById,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} from "../controllers/orderController.js";

const orderRoutes = express.Router();

orderRoutes.post("/", [
    body("orderItems").isArray({ min: 1 }).withMessage("Order must have at least one item"),
    body("shippingAddress.address").notEmpty().withMessage("Address is required"),
    body("shippingAddress.city").notEmpty().withMessage("City is required"),
    body("totalPrice").isNumeric().withMessage("Total price must be a number")
], validate, createOrder);

orderRoutes.get("/", getAllOrders);
orderRoutes.get("/:id", getOrderById);
orderRoutes.get("/user/:userId", getUserOrders);
orderRoutes.put("/:id", updateOrderStatus);
orderRoutes.delete("/:id", deleteOrder);

export default orderRoutes;