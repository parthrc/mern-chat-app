import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useSearchUsers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchUsersApi = async (serachQuery: string) => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_API_URL}/users/search/${serachQuery}`;
    try {
      const res = await axios.get(URL, {
        validateStatus: () => true,
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      toast.error("Error searching users");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { searchUsersApi, isLoading };
};

export default useSearchUsers;
