import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const URL = `${import.meta.env.VITE_API_URL}/auth/logout`;


  const logoutApi = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        URL,

        { validateStatus: () => true, withCredentials: true }
      );

      return res.data;
    } catch (error) {
      toast.error("Error logging out");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, logoutApi };
};

export default useLogout;
