import createHTTPError from "http-errors";
import JWT from "jsonwebtoken";
import config from "../config/config.js";

const authorizeUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(createHTTPError(401, "Access token is missing"));
  }
  try {
    const decodedToken = JWT.verify(token, config.JWT_SECRET);
    req.user = { userId: decodedToken.id, role: decodedToken.role };
  } catch (err) {
    console.log(err);
    return next(createHTTPError(505, "Not authorized, token failed"));
  }
  next();
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(createHTTPError(403, "Not Authorized as an admin"));
    next();
  };
};

export { authorizeUser, authorizeRoles };
