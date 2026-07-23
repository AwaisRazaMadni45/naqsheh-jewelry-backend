import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity }]
            });
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }

            await cart.save();
        }

        res.status(200).json({
            success: true,
            message: "Item added to cart",
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate(
            "items.product"
        );

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart updated",
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item removed from cart",
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared",
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};