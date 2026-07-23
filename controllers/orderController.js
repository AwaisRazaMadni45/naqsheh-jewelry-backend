import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
    try {
        const { userId, orderItems, shippingAddress, totalPrice } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No order items provided"
            });
        }

        // Stock check karo har product ka
        for (const item of orderItems) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found: ${item.product}`
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for: ${product.name}. Available: ${product.stock}`
                });
            }
        }

        // Stock decrease aur soldCount increase karo
        for (const item of orderItems) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { 
                    stock: -item.quantity,
                    soldCount: item.quantity
                }
            });
        }

        const order = await Order.create({
            user: userId,
            orderItems,
            shippingAddress,
            totalPrice
        });

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "orderItems.product"
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email");

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const updateOrderStatus = async (req, res) => {
    try {
        const { status, isPaid } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (status) order.status = status;
        if (isPaid !== undefined) {
            order.isPaid = isPaid;
            if (isPaid) order.paidAt = new Date();
        }

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
