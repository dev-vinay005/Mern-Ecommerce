import express, { Router } from "express";
import {
  createCheckoutItem,
  updateCheckout,
  finalizeCheckOut,
  createPaymentOrder,
} from "../controllers/checkoutController.js";
import { authorizeUser } from "../middleware/authMiddleware.js";

const checkOutRouter = express.Router();

checkOutRouter.post("/", authorizeUser, createCheckoutItem);

checkOutRouter.post("/payment/create-order", authorizeUser, createPaymentOrder);

//@dec Update the checkout to mark as paid after successfull payment
checkOutRouter.put("/:id/pay", authorizeUser, updateCheckout);

//@ Finalize checkout and convert to an order after the payment confirmation
checkOutRouter.post("/:id/finalize", authorizeUser, finalizeCheckOut);

export default checkOutRouter;
