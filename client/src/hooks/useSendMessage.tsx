import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";

const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { messages, setMessages } = useConversation();

  const sendMessageApi = async (receiverId: string, message: string) => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_API_URL}/messages/send/${receiverId}`;
    try {
      const res = await axios.post(
        URL,
        { message: message },
        {
          validateStatus: () => true,
          withCredentials: true,
        }
      );
      console.log("Send message res=", res.data.newMessage);
      setMessages([...messages, res.data.newMessage]);
    } catch (error) {
      toast.error("Error sending message");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, sendMessageApi };
};

export default useSendMessage;
