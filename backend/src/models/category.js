import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    image: String,
  },
  { timestamps: true }
);

const categoryModle = mongoose.model("category", categorySchema);

export default categoryModle;
