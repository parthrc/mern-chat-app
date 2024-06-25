import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authControllers";
import express from "express";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);

export default router;
