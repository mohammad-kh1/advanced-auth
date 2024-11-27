import mongoose from "mongoose";
import { config } from "../config/app.config";

const connectDatabase = async()=>{
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("DATABASE CONNECTED TO " + mongoose.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDatabase;