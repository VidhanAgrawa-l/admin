import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { useAuthCookie } from "../utils/cookies";
import { useAuthStore } from "@/store/useAuthStore";

interface User {
  firstName: string;
  lastName: string;
  profile_image: string;
  _id: string;
  email: string;
  profileId: { _id: string };
  role: string;
  profileCompleted: boolean;
}

interface LoginData {
  email: string;
  password: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

// API function for login
const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const useLogin = () => {
  const { saveToken } = useAuthCookie();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: login,
    onSuccess: (data) => {
      const { token, user } = data;
      saveToken(token); // Save token in cookies
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user)); // Persist user data
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
};
