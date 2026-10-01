import createHttpError from "http-errors";
import categoryModle from "../models/category.js";
import createHTTPError from "http-errors";

const categoryController = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    if (!name) {
      return next(createHttpError(409, "Category name is required"));
    }
    const category = await categoryModle.create({
      name,
      description,
    });

    res.status(202).json({
      message: "Category created sucesfully",
    });
  } catch (err) {
    console.log(err);
    return next(500, "Internal server error");
  }
};

// for getting all categories

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModle.find().select("name _id");

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json({ categories });
  } catch (err) {
    console.error("Error fetching categories:", err.message);
    return next(createHttpError(500, "Failed to fetch categories"));
  }
};

export { categoryController, getAllCategories };
