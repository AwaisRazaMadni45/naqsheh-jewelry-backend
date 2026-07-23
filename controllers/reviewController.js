import Review from "../models/Review.js";
import Product from "../models/Product.js";

export const addReview = async (req, res) => {
    try {
        const { userId, rating, comment } = req.body;
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check karo ek user ne pehle se review to nahi diya
        const alreadyReviewed = await Review.findOne({
            user: userId,
            product: productId
        });

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this product"
            });
        }

        const review = await Review.create({
            user: userId,
            product: productId,
            rating,
            comment
        });

        // Product ka average rating update karo
        const reviews = await Review.find({ product: productId });
        const avgRating =
            reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

        await Product.findByIdAndUpdate(productId, {
            rating: avgRating.toFixed(1)
        });

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.id }).populate(
            "user",
            "name"
        );

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.reviewId);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        // Average rating dobara calculate karo
        const reviews = await Review.find({ product: req.params.id });

        if (reviews.length === 0) {
            await Product.findByIdAndUpdate(req.params.id, { rating: 0 });
        } else {
            const avgRating =
                reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
            await Product.findByIdAndUpdate(req.params.id, {
                rating: avgRating.toFixed(1)
            });
        }

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};