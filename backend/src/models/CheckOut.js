import mongoose from "mongoose";

const CheckOutItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: String,
    image: String,
    price: Number,
    sizes: String,
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    _id: false,
  }
);

const CheckOutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkOutItems: [CheckOutItemSchema],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    paymentDetails: {
      type: mongoose.Schema.Types.Mixed,
    },
    isFinalized: {
      type: Boolean,
      default: false,
    },
    finalizedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const checkOutModel = mongoose.model("checkOut", CheckOutSchema);
export default checkOutModel;
