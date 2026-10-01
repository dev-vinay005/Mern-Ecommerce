import createHTTPError from "http-errors";
import productModel from "../models/product.js";
import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// Current file ka full path
const __filename = fileURLToPath(import.meta.url);
// Current file ka directory
const __dirname = path.dirname(__filename);

// controller for creating a product
const createProduct = async (req, res, next) => {
  let images = [];
  if (!req.files || req.files.length === 0) {
    return next(
      createHTTPError(400, "No images uploaded. please uplaod images"),
    );
  }

  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      // brand,
      // colors,
      // collection,
      // material,
      gender,
      isFeatured,
      isPublished,
    } = req.body;

    if (!name || !description || !price || !countInStock || !sku || !category) {
      return next(
        createHTTPError(
          400,
          "Name, Description, Price, Stock, SKU and Category are required",
        ),
      );
    }

    if (!req.body.sizes || !req.body.tags) {
      return next(createHTTPError(400, "Sizes and Tags are required"));
    }

    const sizes = JSON.parse(req.body.sizes);
    const tags = JSON.parse(req.body.tags);

    for (const file of req.files) {
      const mimeType = file.mimetype.split("/")[1];
      const fileName = file.filename;
      const filePath = path.resolve(
        __dirname,
        "../../public/imageUploads",
        fileName,
      );

      try {
        const uploadImage = await cloudinary.uploader.upload(filePath, {
          filename_override: fileName,
          folder: "products-images",
        });
        images.push({
          url: uploadImage.secure_url,
          altText: uploadImage.original_filename,
          publicId: uploadImage.public_id,
        });
      } catch (err) {
        console.log(err);
        return next(createHTTPError(500, "failed to upload image"));
      }
      await fs.promises.unlink(filePath);
    }

    const createdProduct = await productModel.create({
      name,
      description,
      price: Number(price),
      discountPrice: Number(discountPrice),
      countInStock: Number(countInStock),
      sku,
      category,
      // brand,
      sizes,
      // colors,
      // collection,
      // material,
      gender,
      images,
      isFeatured: isFeatured === "true" ? true : false,
      isPublished: isPublished === "true" ? true : false,
      tags,
      user: req.user.userId,
    });

    console.log(images);
    res.status(201).json({
      message: "Product created sucesfully",
      data: createdProduct,
    });
  } catch (err) {
    console.log(err);
    return next(createHTTPError(500, "internal server error"));
  }
};

//controller for updating a product
const updateProduct = async (req, res, next) => {
  const {
    name,
    description,
    price,
    discountPrice,
    countInStock,
    sku,
    category,
    // brand,
    // colors,
    // collection,
    // material,
    gender,
    isFeatured,
    isPublished,
    imageIndex,
  } = req.body;

  const { productId } = req.params;
  console.log(productId);

  const product = await productModel.findById({ _id: productId });
  if (!product) {
    return next(createHttpError(404, "product not found"));
  }

  if (req.files && req.files.length > 0) {
    // converting image index to array if it's not already an array

    const imageIndexes = Array.isArray(imageIndex) ? imageIndex : [imageIndex];

    for (let i = 0; i < req.files.length; i++) {
      const targetIndex = Number(imageIndexes[i]);
      const fileName = req.files[i].filename;
      const mimeType = req.files[i].mimetype.split("/")[1];
      const filePath = path.resolve(
        __dirname,
        "../../public/imageUploads",
        fileName,
      );

      try {
        const uploadImage = await cloudinary.uploader.upload(filePath, {
          filename_override: fileName,
          folder: "products-images",
        });

        product.images[targetIndex] = {
          url: uploadImage.secure_url,
          altText: uploadImage.original_filename,
          publicId: uploadImage.public_id,
        };
      } catch (err) {
        console.log(err);
      }

      await fs.promises.unlink(filePath);
    }
  }
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price ? Number(price) : product.price;
  product.images = product.images || [];
  product.save();

  res.status(200).json(product);
};

//controller for deleting a product

const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await productModel.findById({ _id: productId });
    if (!product) {
      return next(createHttpError(404, "product not found"));
    }

    // cloudinary image deletion
    for (const image of product.images) {
      try {
        await cloudinary.uploader.destroy(image.publicId);
      } catch (err) {
        console.log("cloudinary image deletion error", err);
      }
    }

    await productModel.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product deleted Sucessfully" });
  } catch (err) {
    console.log("product delete error", err);

    return next(
      createHttpError(500, "Something went wrong while deleting the product"),
    );
  }
};

//controller for getting all the products
const getAllProducts = async (req, res, next) => {

  const category = req.query.category || "allproducts"
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 0
  const skip = (page - 1) * limit
  const total = await productModel.countDocuments();
  const totalPages = Math.ceil(total / limit);
  // console.log(limit, typeof (limit))

  // console.log(category, page, limit);
  try {
    const products = await productModel
      .find()
      .populate("category", "user").skip(skip)
      .limit(Number(limit));
    console.log(products);

    res.status(201).json({ products, total, page, limit, totalPages });
  } catch (err) {
    // console.error(err);
    return next(createHTTPError(500, "Internal server error"));
  }
};

// get Single Product by ID
const getSingleProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await productModel
      .findById(productId)
      .populate("category")
      .populate("user");

    if (!product) {
      return next(createHttpError(404, "Product not found"));
    }
    res.status(200).json({ product });
  } catch (err) {
    console.log(err);
  }
};
export {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
};
