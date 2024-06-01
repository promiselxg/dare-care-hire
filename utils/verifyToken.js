"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const verifyToken = async (token) => {
  try {
    const userToken = cookies().get("token").value;
    if (!token || !userToken || token !== userToken) {
      return {
        message: "Invalid Token",
      };
    }
    jwt.verify(token, process.env.JWT_SECRET);
    // If verification succeeds, return success message
    return {
      message: "success",
    };
  } catch (err) {
    return {
      message: "Token is not valid",
    };
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const clearCookies = () => {
  try {
    cookies().delete("token");
    return true;
  } catch (error) {
    return error;
  }
};

export const getCookie = async () => {
  try {
    const token = cookies().get("token").value;
    return token;
  } catch (error) {
    return error;
  }
};
