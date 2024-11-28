import cookieParser from "cookie-parser";
import dotenv from "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "./config/app.config";
import connectDatabase from "./database/database";
import { errorHandler } from "./middlewares/errorHandler";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler";
import authRoutes from "./modules/auth/auth.routes";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:config.APP_ORIGIN,
    credentials:true
}))
app.use(errorHandler);
app.use(`${BASE_PATH}/auth` , authRoutes);

app.post("/" , asyncHandler(async(req:Request , res:Response)=>{
    res.status(HTTPSTATUS.OK).json({
        message:"Hello World!"
    });
}));

app.listen(config.PORT , async()=>{
    console.log(`server listening on http://localhost:${config.PORT} in ${config.NODE_ENV}`);
    await connectDatabase();
});