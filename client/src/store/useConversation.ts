import { create } from "zustand";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface ConversationStore {
  selectedConversation?: string;
  setSelectedConversation: (selectConversationId: string) => void;
  messages: Message[];
  setMessages: (updatedMessages: Message[]) => void;
}

const useConversation = create<ConversationStore>((set) => ({
  selectedConversation: undefined,
  setSelectedConversation: (selectConversationId) =>
    set(() => ({ selectedConversation: selectConversationId })),
  messages: [],
  setMessages: (updatedMessages) => set(() => ({ messages: updatedMessages })),
}));

export default useConversation;
