import mongoose from "mongoose";

const Connection = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB Connected Successfully `);
        
    } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
}
};
export default Connection;