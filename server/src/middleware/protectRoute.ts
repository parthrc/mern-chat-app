import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import { ProtectedRequest } from "types/requestDefinitions";

interface JwtPayload {
  userId: string;
}

const protectedRoute = async (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.chatapp_jwt;

    if (!token) {
      return res
        .status(400)
        .json({ status: "error", msg: "Token does not exist" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    if (!decoded) {
      return res.status(400).json({ status: "error", msg: "Invalid token" });
    }

    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ status: "error", msg: "User does not exist" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", msg: `Server error: ${error.message}` });
  }
};

export default protectedRoute;
