import { useEffect, useState } from "react";
import useConversation from "../../../store/useConversation";
import toast from "react-hot-toast";
import {
  GetMessagesApiPayload,
  GetMessagesApiResponse,
} from "../../../types/api.types";
import axios from "axios";
import MessageBubble from "./MessageBubble";

const ChatMessages = () => {
  const { selectedConversation, setMessages, messages } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedConversation?.user?._id) return;
    setIsLoading(true);
    try {
      const getMessagesApi = async ({
        participantId,
      }: GetMessagesApiPayload): Promise<GetMessagesApiResponse> => {
        const URL = `${import.meta.env.VITE_API_URL}/messages/${participantId}`;
        setIsLoading(true);
        try {
          const res = await axios.get(URL, {
            validateStatus: () => true,
            withCredentials: true,
          });
          if (res.data.status === "error") {
            toast.error("Error fetching messages");
          }
          // console.log("Get messages=", res.data.data.messages);
          setMessages(res.data.data.messages);
          return res.data;
        } catch (error) {
          toast.error("Error fetching messages");
          throw error;
        } finally {
          setIsLoading(false);
        }
      };

      getMessagesApi({ participantId: selectedConversation?.user?._id });
    } catch (error) {
      toast.error("Error loading messages");
    }
  }, [selectedConversation, setMessages]);

  return (
    <div className=" bg-slate-200 w-full end grow overflow-y-auto flex-col">
      {isLoading && <div>Loading...</div>}
      {!isLoading && messages && (
        <div className="flex flex-col w-full  gap-y-1">
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
