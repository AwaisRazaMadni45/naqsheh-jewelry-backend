import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending"
    },
    paymentMethod: {
    type: String,
    enum: ["COD", "JazzCash", "EasyPaisa", "Card"],
    default: "COD"
}
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;