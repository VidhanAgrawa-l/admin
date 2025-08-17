import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { useAuthCookie } from "../utils/cookies";

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

const signup = async (data: SignupData) => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response.data;
};

export const useSignup = () => {
  const { saveToken } = useAuthCookie();
  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      saveToken(data.token); // Save token in cookies on successful signup
    },
  });
};
