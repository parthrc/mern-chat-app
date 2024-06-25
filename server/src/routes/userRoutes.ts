import protectedRoute from "../middleware/protectRoute";
import { getUsersForSidebar } from "../controllers/userControllers";
import express from "express";

const router = express.Router();

router.get("/", protectedRoute, getUsersForSidebar);

export default router;
