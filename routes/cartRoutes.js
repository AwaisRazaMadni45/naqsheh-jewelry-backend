import express from "express";
import {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart
} from "../controllers/cartController.js";

const cartRoutes = express.Router();

cartRoutes.post("/", addToCart);
cartRoutes.get("/:userId", getCart);
cartRoutes.put("/", updateCartItem);
cartRoutes.delete("/", removeFromCart);
cartRoutes.delete("/clear/:userId", clearCart);

export default cartRoutes;