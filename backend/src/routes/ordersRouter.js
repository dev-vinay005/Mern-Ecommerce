import express, { Router } from "express";
import { authorizeUser } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";
import createHttpError from "http-errors";
const orderRouter = express.Router();

//@dec Get all orders for the authorized user

orderRouter.get("/", authorizeUser, async (req, res, next) => {

  try {
    const order = await Order.find({ user: req.user.userId }).populate(
      "user",
      "name email"
    );
    if (!order) {
      return next(createHttpError(404, "No orders found for this user"));
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Something went wrong"));
  }
});

orderRouter.get("/:id", authorizeUser, async (req, res, next) => {
  console.log("orderID", req.params.id);
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(createHttpError(404, "Order not found"));
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Something went wrong"));
  }
});

export default orderRouter;
