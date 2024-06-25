import { Request, Response } from "express";
import UserModel from "../models/userModel";
import { Error } from "mongoose";

const loginUser = (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
};

// Register new user
const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, confirm_password, gender, profilePic, fullName } =
      req.body;
    // CHekc if all required fields exist
    if (!email || !password || !confirm_password || !gender || !fullName) {
      return res
        .status(400)
        .json({ status: "error", msg: "Please enter all required fields" });
    }
    // chekc if passwords match
    if (password !== confirm_password) {
      return res
        .status(400)
        .json({ status: "error", msg: "Passwords do not match" });
    }

    // check if email already exists
    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ status: "error", msg: "User with this email already exists" });
    }

    // if user does not exist

    // hash password

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
};

const logoutUser = (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
};

export { loginUser, logoutUser, registerUser };
