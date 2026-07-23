import Product from "../models/Product.js";

export const createProduct = async(req,res)=>{
    try {
        const {name,description,price,category,image,stock,discount} = req.body;
        const product = await Product.create({
            name,
            description,
            price,
            category,
            image,
            stock,
            discount
        });
        res.status(201).json({
            success:true,
            message:"Product Created Successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
export const getProduct = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"Product fetch Successfully",
            product
        });
    } catch (error) {
         res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
export const getAllProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search, page, limit } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        const pageNumber = Number(page) || 1;
        const pageSize = Number(limit) || 10;
        const skip = (pageNumber - 1) * pageSize;

        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / pageSize);

        const products = await Product.find(filter)
            .skip(skip)
            .limit(pageSize);

        res.status(200).json({
            success: true,
            currentPage: pageNumber,
            totalPages,
            totalProducts,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const getBestSellers = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ soldCount: -1 })
            .limit(8);

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};