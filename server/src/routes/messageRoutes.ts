import protectedRoute from "../middleware/protectRoute";
import {
  sendMessage,
  getMessages,
  getActiveConversations,
  startNewConversation,
} from "../controllers/messageControllers";
import express from "express";

const router = express.Router();

router.get("/activeConversations", protectedRoute, getActiveConversations);
router.get("/:userId", protectedRoute, getMessages);
router.post("/send/:userId", protectedRoute, sendMessage);
router.get("/newconvo/:userId", protectedRoute, startNewConversation);

export default router;
