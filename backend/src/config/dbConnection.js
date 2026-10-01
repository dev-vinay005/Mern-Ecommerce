import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  console.log(config.MONGO_CONNECTION_STRING)
  mongoose
    .connect(config.MONGO_CONNECTION_STRING)
    .then(() => console.log(mongoose.connection.name))
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};

export default connectDB;
