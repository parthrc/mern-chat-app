import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useCreateNewConvo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createNewConvoApi = async (receiverId: string) => {
    setIsLoading(true);
    const URL = `${
      import.meta.env.VITE_API_URL
    }/messages/newconvo/${receiverId}`;

    try {
      const res = await axios.get(URL, {
        validateStatus: () => true,
        withCredentials: true,
      });

      return res;
    } catch (error) {
      toast.error("Error sending message");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, createNewConvoApi };
};

export default useCreateNewConvo;
