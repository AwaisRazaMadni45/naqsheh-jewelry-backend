import mongoose from "mongoose";

const Connection = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB Connected Successfully `);
        
    } catch (error) {
        console.log(error);

    }
};
export default Connection;