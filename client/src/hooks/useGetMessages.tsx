import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  GetMessagesApiPayload,
  GetMessagesApiResponse,
} from "../types/api.types";
import useConversation from "../store/useConversation";

const useGetMessages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
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
        console.log("Res==", res.data.data.messages);
        setMessages(res.data.data.messages);
        return res.data.data.messages;
      } catch (error) {
        toast.error("Error fetching messages");
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedConversation?.user?._id)
      getMessagesApi({ participantId: selectedConversation?.user?._id });
  }, [selectedConversation?.user?._id, setMessages]);

  return { messages, isLoading };
};

export default useGetMessages;
