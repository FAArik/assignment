import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import companiesRouter from "./routes/companies.js";
import productsRouter from "./routes/products.js";
import authenticationMiddleware from "./middlewares/authMiddleware.js";

var app = express();

dotenv.config();

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/companies", authenticationMiddleware, companiesRouter);
app.use("/products", authenticationMiddleware, productsRouter);
// app.use("/companies", companiesRouter);
// app.use("/products", productsRouter);
app.use("/auth", authRouter);

export default app;
