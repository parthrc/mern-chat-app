import protectedRoute from "../middleware/protectRoute";
import {
  getUsersForSidebar,
  searchUsers,
} from "../controllers/userControllers";
import express from "express";

const router = express.Router();

router.get("/", protectedRoute, getUsersForSidebar);
router.get("/search/:searchQuery", protectedRoute, searchUsers);

export default router;
