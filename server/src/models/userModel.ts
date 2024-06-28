import mongoose, { Document } from "mongoose";
import { IConversation } from "./conversationModel";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  gender: Gender;
  profilePic?: string;
  conversations?: IConversation[];
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    conversations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        default: [],
      },
    ],
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
