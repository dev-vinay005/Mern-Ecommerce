import { config } from "dotenv";
import Razorpay from "razorpay"
import createHttpError from "http-errors";
config()

export const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log(process.env.RAZORPAY_KEY_ID,
    process.env.RAZORPAY_KEY_SECRET)

export const createRazorpayOrder = async ({ amount, receipt, notes }) => {
    try {
        const options = {
            amount: Math.round(amount * 100), // ₹ → paise
            currency: "INR",
            receipt,
            notes,
        };

        const order = await razorpayInstance.orders.create(options);
        return order;

    } catch (error) {
        console.log("razor pay error", error);
        throw new Error("Failed to create Razorpay Order");
    }
}   