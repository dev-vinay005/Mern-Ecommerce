import express from "express";
import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController.js";
import { authorizeRoles, authorizeUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

// for creating products
productRouter.post(
  "/createProduct",
  authorizeUser,
  authorizeRoles("admin"),
  upload.array("images", 4),
  createProduct
);

//for update product
productRouter.put(
  "/editProduct/:productId",
  authorizeUser,
  authorizeRoles("admin"),
  upload.array("images", 4),
  updateProduct
);

//for delete a product

productRouter.delete(
  "/deleteProduct/:productId",
  authorizeUser,
  authorizeRoles("admin"),
  deleteProduct
);

//for getting all the products
productRouter.get("/getAllProducts", getAllProducts);

// for getting single product
productRouter.get("/getSingleProduct/:productId", getSingleProduct);

export default productRouter;
