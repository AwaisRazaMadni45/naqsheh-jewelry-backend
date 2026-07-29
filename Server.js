import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Connection from "./db/Conn.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";

dotenv.config();

const app = express();
Connection()
app.use(express.json());

app.use(cors( ));
app.use("/api/products",productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products",reviewRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
});