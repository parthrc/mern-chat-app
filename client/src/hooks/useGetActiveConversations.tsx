import { useEffect, useState } from "react";
// import { GetActiveConversationsApiResponse } from "../types/api.types";
import toast from "react-hot-toast";
import axios from "axios";
import { GetActiveConversationsApiResponse } from "../types/api.types";

const useGetActiveConversations = () => {
  const [isLoading, setIsLoading] = useState(false);

  const URL = `${import.meta.env.VITE_API_URL}/messages/activeConversations`;

  const [activeConversations, setActiveConversations] = useState<[]>([]);
  useEffect(() => {
    const getActiveConversationsApi =
      async (): Promise<GetActiveConversationsApiResponse> => {
        setIsLoading(true);
        try {
          const res = await axios.get(URL, {
            validateStatus: () => true,
            withCredentials: true,
          });

          setActiveConversations(res.data.data);
          return res.data;
        } catch (error) {
          toast.error("Error fetching active conversations");
          throw error;
        } finally {
          setIsLoading(false);
        }
      };

    getActiveConversationsApi();
  }, [URL]);

  return { isLoading, activeConversations };
};

export default useGetActiveConversations;
