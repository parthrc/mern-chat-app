import { Request, Response } from "express";
import ConversationModel from "../models/conversationModel";
import MessageModel from "../models/messageModel";
import { ProtectedRequest } from "../types/requestDefinitions";
import mongoose from "mongoose";
import UserModel from "../models/userModel";

const sendMessage = async (req: ProtectedRequest, res: Response) => {
  try {
    const { message } = req.body;
    const { userId: receiverId } = req.params;
    const senderId = req.user._id;

    if (!message) {
      return res
        .status(400)
        .json({ status: "error", msg: "Message cannot be blank" });
    }

    // get conversation if it exists
    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // create new conversation if it does not exists
    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    // Add the conversation ID to both users' conversation arrays
    await UserModel.findByIdAndUpdate(senderId, {
      $push: { conversations: conversation._id },
    });

    await UserModel.findByIdAndUpdate(receiverId, {
      $push: { conversations: conversation._id },
    });

    // create a new message
    const newMessage = new MessageModel({
      senderId,
      receiverId,
      message,
    });
    console.log("New message", newMessage);
    // if new message is created successfully push the ID to the conversation
    if (newMessage) {
      conversation.messages.push(
        newMessage._id as mongoose.Schema.Types.ObjectId
      );

      // SOCKET IO

      // this will run in parallel
      await Promise.all([newMessage.save(), conversation.save()]);
      console.log(`Message sent to ${receiverId}`);

      return res
        .status(200)
        .json({ status: "success", msg: `Message sent successfully` });
    } else {
      return res
        .status(400)
        .json({ status: "error", msg: `Error sending new message` });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", msg: `Server error: ${error.message}` });
  }
};

const getMessages = async (req: ProtectedRequest, res: Response) => {
  try {
    const { userId: receiverId } = req.params;
    const senderId = req.user._id;

    // get conversation, and populate the messages with the entire message object, since we only store ID's in the conversation object
    const conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    // error if no conversation exists
    if (!conversation) {
      return res.status(400).json({
        status: "error",
        msg: "Conversation not found for given participants",
      });
    }
    console.log("Conversation=", conversation);
    return res.json({
      status: "success",
      msg: "Messages fetched successfully",
      data: conversation,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", msg: `Server error: ${error.message}` });
  }
};

const getActiveConversations = async (req: ProtectedRequest, res: Response) => {
  try {
    const currentUserId = req.user._id;

    // Convert participantId to ObjectId
    const participantObjectId = new mongoose.Types.ObjectId(
      currentUserId as string
    );

    // get all convos of the current user
    const allActiveConversations = await ConversationModel.find({
      participants: { $in: [participantObjectId] },
    })
      .populate({ path: "participants", select: "-password" })
      .exec();

    // Filter out the other participants
    const convos = allActiveConversations.map((convo) => {
      const otherParticipants = convo.participants.filter((participant) => {
        return participant.toString() !== currentUserId.toString();
      });
      return {
        conversationId: convo._id,
        otherParticipant: otherParticipants[0],
      };
    });

    console.log(convos);

    return res.status(200).json({
      status: "success",
      msg: "Active conversations fetched successfully",
      totalActiveConversation: convos.length,
      data: convos,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", msg: `Server error: ${error.message}` });
  }
};

export { sendMessage, getMessages, getActiveConversations };
