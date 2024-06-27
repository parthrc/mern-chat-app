import protectedRoute from "../middleware/protectRoute";
import {
  sendMessage,
  getMessages,
  getActiveConversations,
} from "../controllers/messageControllers";
import express from "express";

const router = express.Router();

router.get("/activeConversations", protectedRoute, getActiveConversations);
router.get("/:userId", protectedRoute, getMessages);
router.post("/send/:userId", protectedRoute, sendMessage);

export default router;
