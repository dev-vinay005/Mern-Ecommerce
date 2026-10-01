import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET: process.env.JWT_SECRET,
  env: process.env.NODE_ENV,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export default Object.freeze(config);
