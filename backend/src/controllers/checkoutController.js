import checkout from "../models/CheckOut.js";
import { cartModel } from "../models/CartModel.js";
import productModel from "../models/product.js";
import Order from "../models/Order.js";
import createHttpError from "http-errors";
import { createRazorpayOrder } from "../services/payment.service.js";
import crypto from "crypto"

const createCheckoutItem = async (req, res, next) => {
  const { checkOutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkOutItems || checkOutItems.length === 0) {
    return next(createHttpError(400, "No checkout items provided"));
  }

  // check for existing checkout session for the user
  const existingCheckout = await checkout.findOne({ user: req.user.userId, isPaid: false, isFinalized: false });
  if (existingCheckout) {
    existingCheckout.checkOutItems = checkOutItems;
    existingCheckout.shippingAddress = shippingAddress;
    existingCheckout.paymentMethod = paymentMethod;
    existingCheckout.totalPrice = totalPrice;
    // safety reset
    existingCheckout.paymentStatus = "Pending";
    existingCheckout.isPaid = false;

    await existingCheckout.save();

    return res.status(200).json(existingCheckout);
  }

  try {
    // create a new checkout session
    const newCheckout = await checkout.create({
      user: req.user.userId,
      checkOutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid: false,
      paymentStatus: "Pending",
    });

    res.status(201).json(newCheckout);
  } catch (error) {
    console.log("error creating checkout session", error);
    return next(createHttpError(500, "something went wrong"));
  }
};

const createPaymentOrder = async (req, res, next) => {
  try {
    // Implementation for creating payment order
    const checkoutId = req.body.checkoutId

    const checkOut = await checkout.findOne({ _id: checkoutId })
    if (!checkOut) {
      return next(createHttpError(404, `check not found for this Id ${checkOut}`))
    }
    try {
      const razorpayOrder = await createRazorpayOrder({
        amount: checkOut.totalPrice,
        receipt: checkOut._id.toString(),
        notes: {
          checkoutId,
          userId: checkOut.user.toString(),
        }
      })
      console.log("Razorpay Order:", razorpayOrder);
      res.json({
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
      })
    } catch (err) {
      return next(createHttpError(500, err))
    }

  } catch (error) {
    console.log("error creating payment order", error);
    return next(createHttpError(500, "something went wrong"));
  }
};

const updateCheckout = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

  try {
    const checkOut = await checkout.findById(req.params.id);

    if (!checkOut) {
      return next(createHttpError(404, "Checkout is not found"));
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(createHttpError(400, "Invalid payment signature"));
    }

    checkOut.isPaid = true;
    checkOut.paymentStatus = "paid";
    checkOut.paymentDetails = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    };
    checkOut.paidAt = Date.now();

    await checkOut.save();

    res.status(201).json(checkOut);

  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Payment verification failed"));
  }
};

const finalizeCheckOut = async (req, res, next) => {
  try {
    const checkOut = await checkout.findById(req.params.id);
    if (!checkOut) {
      return next(createHttpError(404, "Checkout not found"));
    }

    if (checkOut.isPaid && !checkOut.isFinalized) {
      // Create final order based in the checkout details
      const finalOrder = await Order.create({
        user: checkOut.user,
        orderItems: checkOut.checkOutItems,
        shippingAddres: checkOut.shippingAddress,
        paymentMethod: checkOut.paymentMethod,
        paymentResult: {
          razorpay_order_id: checkOut.paymentDetails.razorpay_order_id,
          razorpay_payment_id: checkOut.paymentDetails.razorpay_payment_id,
        },
        totalPrice: checkOut.totalPrice,
        isPaid: true,
        paidAt: checkOut.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
      });

      // Mark the checkOut as finalized
      checkOut.isFinalized = true;
      checkOut.finalizedAt = Date.now();

      await checkOut.save();

      // Delete the cart associated with the user

      await cartModel.findOneAndDelete({ userId: checkOut.user });

      res.status(201).json(finalOrder);
    } else if (checkOut.isFinalized) {
      res.status(400).json({ message: "Checkout is already Finalized" });
    } else {
      res.status(400).json({ message: "CheckOut is not Paid" });
    }
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "something went wrong"));
  }
};

export { createCheckoutItem, createPaymentOrder, updateCheckout, finalizeCheckOut };
