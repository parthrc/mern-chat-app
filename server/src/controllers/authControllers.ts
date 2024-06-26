import { Request, Response } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";
import { createAvatarLink, generateJWT } from "../utils/helpers";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "error", msg: "Please enter all required details" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: "error", msg: "Email does not exist" });
    }

    // check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ status: "error", msg: "Incorrect password" });
    }

    // generate JWT and set cookie
    const jwt = generateJWT(user._id as string);
    res.cookie("chatapp_jwt", jwt, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // milliseconds
      httpOnly: true, // prevent XSS attacks
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV !== "development",
    });

    return res.status(200).json({
      status: "success",
      msg: "User registered successfully",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
};

// Register new user
const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      gender,
      profilePic,
      firstName,
      lastName,
    } = req.body;
    // CHekc if all required fields exist
    if (!email || !password || !confirmPassword || !gender || !firstName) {
      return res
        .status(400)
        .json({ status: "error", msg: "Please enter all required fields" });
    }
    // chekc if passwords match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: "error", msg: "Passwords do not match" });
    }

    // check gender
    // if (Gender.includes(gender)) {
    //   return res
    //     .status(400)
    //     .json({ status: "error", msg: "Please select proper gender" });
    // }

    // check if email already exists
    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ status: "error", msg: "User with this email already exists" });
    }

    // if user does not exist

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      gender,
      profilePic: createAvatarLink(firstName, lastName),
      firstName,
      lastName,
    });

    if (newUser) {
      newUser.save();

      // generate JWT and set cookie
      const jwt = generateJWT(newUser._id as string);
      res.cookie("chatapp_jwt", jwt, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // milliseconds
        httpOnly: true, // prevent XSS attacks
        sameSite: "strict", // prevent CSRF attacks
        secure: process.env.NODE_ENV !== "development",
      });

      return res.status(201).json({
        status: "success",
        msg: "User registered successfully",
        data: newUser,
      });
    } else {
      return res
        .status(400)
        .json({ status: "error", msg: "Error creating new user" });
    }
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
};

const logoutUser = (req: Request, res: Response) => {
  try {
    res.cookie("chatapp_jwt", "", { maxAge: 0 });
    res.status(200).json({ status: "success", msg: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
};

export { loginUser, logoutUser, registerUser };
