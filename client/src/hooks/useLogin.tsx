import { useState } from "react";
import { LoginApiPayload, LoginApiResponse } from "../types/api.types";
import axios from "axios";
import toast from "react-hot-toast";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const URL = `${import.meta.env.VITE_API_URL}/auth/login`;
  const loginApi = async ({
    email,
    password,
  }: LoginApiPayload): Promise<LoginApiResponse> => {
    setIsLoading(true);
    try {
      const res = await axios.post<LoginApiResponse>(
        URL,
        { email, password },
        { validateStatus: () => true, withCredentials: true }
      );
      return res.data; // Return the response data
    } catch (error) {
      toast.error("Error loggin in");
      throw error; // Re-throw the error to handle it in onSubmit
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, loginApi };
};

export default useLogin;
