import { useState } from "react";
import axios from "axios";
import { RegisterApiPayload, RegisterApiResponse } from "../types/types";
import toast from "react-hot-toast";

const useRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const URL = `${import.meta.env.VITE_API_URL}/auth/register`;

  const registerApi = async ({
    email,
    password,
    confirmPassword,
    gender,
    firstName,
    lastName,
  }: RegisterApiPayload): Promise<RegisterApiResponse> => {
    setIsLoading(true);
    try {
      const res = await axios.post<RegisterApiResponse>(
        URL,
        { email, password, confirmPassword, gender, firstName, lastName },
        { validateStatus: () => true, withCredentials: true }
      );
      return res.data; // Return the response data
    } catch (error) {
      toast.error("Error registering new user");
      throw error; // Re-throw the error to handle it in onSubmit
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, registerApi };
};

export default useRegister;
