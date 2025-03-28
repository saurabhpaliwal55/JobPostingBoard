import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();


const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected successfully with host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

export {connectDB};
