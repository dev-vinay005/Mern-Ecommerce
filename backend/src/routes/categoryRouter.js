import express from "express";
import { Router } from "express";
import {
  categoryController,
  getAllCategories,
} from "../controllers/categoryControllers.js";
const categoryRouter = express.Router();

categoryRouter.post("/createCategory", categoryController);
categoryRouter.get("/getAllCategories", getAllCategories);

export default categoryRouter;
