import express from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import createHttpError from "http-errors";
import userRouter from "./routes/userRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import checkoutRouter from "./routes/checkoutRouter.js";
import orderRouter from "./routes/ordersRouter.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//here are the API routes

// user Route
app.use("/api/users", userRouter);

//category Route
app.use("/api/categories", categoryRouter);

// product Route
app.use("/api/products", productRouter);

//cart Route
app.use("/api/cart", cartRouter);

// checkout Route
app.use("/api/checkout", checkoutRouter);

// order Route
app.use("/api/orders", orderRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
