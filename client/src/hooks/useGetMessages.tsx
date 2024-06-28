import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  GetMessagesApiPayload,
  GetMessagesApiResponse,
} from "../types/api.types";

const useGetMessages = () => {
  const [isLoading, setIsLoading] = useState(false);

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

      return res.data;
    } catch (error) {
      toast.error("Error fetching messages");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { getMessagesApi, isLoading };
};

export default useGetMessages;
