import mongoose from "mongoose";
import dotenv from "dotenv";
import xlsx from "xlsx";
import Product from "./models/Product.js";

dotenv.config();

const EXCEL_FILE = "./products.xlsx"; // isi folder mein products.xlsx honi chahiye

const seedDatabase = async () => {
  try {
    const workbook = xlsx.readFile(EXCEL_FILE);
    const sheet = workbook.Sheets["Products"];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const products = rows
      .filter((row) => row.name && row.category) // khali rows ignore karega
      .map((row) => ({
        name: String(row.name).trim(),
        description: row.description ? String(row.description).trim() : "",
        price: Number(row.price) || 0,
        category: String(row.category).trim(),
        image: [String(row.image).trim()],
        stock: Number(row.stock) || 0,
      }));

    if (products.length === 0) {
      console.log("Koi valid product row nahi mili. Excel file check karein.");
      process.exit(1);
    }

    console.log(`${products.length} products Excel se mile. Database mein daal raha hoon...`);

    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB Connected");

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log(`${products.length} products successfully add ho gaye!`);
    process.exit();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedDatabase();