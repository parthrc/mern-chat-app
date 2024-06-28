import { create } from "zustand";
import { UserObject } from "../types/api.types";

export interface MessageObject {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface ConversationStore {
  selectedConversation?: { conversationId?: string; user?: UserObject };
  setSelectedConversation: (
    selectConversationId?: string,
    user?: UserObject
  ) => void;
  messages: MessageObject[];
  setMessages: (updatedMessages: MessageObject[]) => void;
}

const useConversation = create<ConversationStore>((set) => ({
  selectedConversation: undefined,
  setSelectedConversation: (selectConversationId, user) =>
    set(() => ({
      selectedConversation: { conversationId: selectConversationId, user },
    })),
  messages: [],
  setMessages: (updatedMessages) => set(() => ({ messages: updatedMessages })),
}));

export default useConversation;
