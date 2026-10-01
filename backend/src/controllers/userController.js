import createHTTPError from "http-errors";
import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import config from "../config/config.js";

const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return next(createHTTPError(404, "All fields are required"));
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return next(createHTTPError(409, "user already exist"));
  }

  //password hasing

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = JWT.sign({ id: user._id, role: user.role }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(201).json({
    message: "user create Sucessfuly",
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken: token,
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(createHTTPError(409, "All fields are required"));
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return next(createHTTPError(404, "User not found"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(createHTTPError(401, "Username or password is incorrect"));
    }

    const token = JWT.sign(
      { id: user._id, role: user.role },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(202).json({
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken: token,
    });
  } catch (err) {
    console.log(err);
    return next(createHTTPError(505, "Internal server error"));
  }
};

const userProfile = async (req, res) => {
  const userId = req.user;

  const userInfo = await userModel.findOne({ _id: userId });
  res.json(userInfo);
};

export { createUser, loginUser, userProfile };
