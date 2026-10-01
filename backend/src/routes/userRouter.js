import { Router } from "express";
import express from "express";
import {
  createUser,
  loginUser,
  userProfile,
} from "../controllers/userController.js";
import { authorizeUser } from "../middleware/authMiddleware.js";
const userRouter = express.Router();

userRouter.post("/createuser", createUser);
userRouter.post("/loginuser", loginUser);
userRouter.get("/userprofile", authorizeUser, userProfile);
export default userRouter;
