import { ProtectedRequest } from "../types/requestDefinitions";
import { Response } from "express";
import UserModel from "../models/userModel";
import ConversationModel from "../models/conversationModel";
import mongoose from "mongoose";

const getUsersForSidebar = async (req: ProtectedRequest, res: Response) => {
  try {
    const currentUserId = req.user._id;

    // get all users who have conversations with the currently logged in user
    // Step 1: Find all conversations that include the current user
    const conversations = await ConversationModel.find({
      participants: currentUserId,
    }).exec();

    // Step 2: Extract the IDs of all other participants in those conversations
    const participantIds = new Set<mongoose.Schema.Types.ObjectId>();
    conversations.forEach((conversation) => {
      conversation.participants.forEach((participantId) => {
        if (participantId.toString() !== currentUserId.toString()) {
          console.log(participantId);
          participantIds.add(participantId);
        }
      });
    });

    // Convert the Set to an Array
    const participantIdArray = Array.from(participantIds);
    console.log("Array=", participantIdArray);

    // Step 3: Find user details for those participant IDs
    const usersWithActiveConversations = await UserModel.find({
      _id: { $in: participantIdArray },
    }).exec();

    // Return the users
    return res.status(200).json({
      status: "success",
      totalActiveConversations: usersWithActiveConversations.length,
      data: usersWithActiveConversations,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", msg: `Server error: ${error.message}` });
  }
};

export { getUsersForSidebar };
