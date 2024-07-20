import { MessageObject } from "../store/useConversation";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export interface UserObject {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  gender: Gender;
  profilePic?: string;
  conversations?: [];
}

export interface RegisterApiPayload {
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  firstName: string;
  lastName?: string;
}

export interface RegisterApiResponse {
  status: string;
  msg: string;
  data: unknown;
}

export interface LoginApiPayload {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  status: string;
  msg: string;
  data: {
    id: string;
    firstName: string;
    lastName?: string;
    gender: string;
    profilePic?: string;
  };
}

export interface ActiveConversation {
  conversationId: string;
  otherParticipant: UserObject;
}

export interface GetActiveConversationsApiResponse {
  status: string;
  msg: string;
  totalActiveConversation: number;
  data: ActiveConversation[];
}

export interface GetMessagesApiPayload {
  participantId: string;
}

export interface GetMessagesApiResponse {
  status: string;
  msg: string;
  data: {
    _id: string;
    participants: string[];
    messages: MessageObject[];
  };
}
