import express, { Router } from "express";
import { cartModel } from "../models/CartModel.js";
import productModel from "../models/product.js";
import { authorizeRoles, authorizeUser } from "../middleware/authMiddleware.js";
import {
  addToCart,
  updateCart,
  deleteCartItem,
  getCartItems,
  mergeCarts,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/", addToCart);
cartRouter.put("/", updateCart);
cartRouter.delete("/", deleteCartItem);
cartRouter.get("/", getCartItems);
cartRouter.post("/merge", authorizeUser, mergeCarts);

export default cartRouter;
