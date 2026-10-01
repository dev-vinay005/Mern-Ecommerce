import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    brand: {
      type: String,
    },
    sizes: {
      type: [String],
      // required: true,
    },
    colors: {
      type: [String],
    },
    collection: {
      type: String,
    },
    material: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["men", "women", "unisex"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeyWords: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Product", productSchema);
export default productModel;


