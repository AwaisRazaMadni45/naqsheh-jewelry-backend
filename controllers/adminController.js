import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getAdminStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();

        const revenueResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPrice" }
                }
            }
        ]);
        const totalRevenue = revenueResult[0]?.totalRevenue || 0;

        const recentOrders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .limit(5);

        const ordersByStatus = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const topProducts = await Product.find()
            .sort({ rating: -1 })
            .limit(5)
            .select("name price rating stock category");

        res.status(200).json({
            success: true,
            stats: {
                totalOrders,
                totalProducts,
                totalUsers,
                totalRevenue
            },
            ordersByStatus,
            recentOrders,
            topProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};