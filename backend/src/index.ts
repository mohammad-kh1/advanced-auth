import cookieParser from "cookie-parser";
import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:process.env.APP_ORIGIN,
    credentials:true
}))
