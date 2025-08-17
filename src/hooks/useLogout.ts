// src/hooks/useLogout.ts
import { useState } from "react";
import axiosInstance from "@/axios";

// Helper function to get token from cookies
const getTokenFromCookies = () => {
  const token = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("token="))
    ?.split("=")[1];
  return token || "";
};

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // API function for logout
  const logout = async () => {
    const token = getTokenFromCookies(); // Get token from cookies

    if (!token) {
      setError("No token found");
      return; // If there's no token in the cookies, exit early
    }

    setIsLoading(true);
    setError(null); // Reset error state before starting the logout request

    try {
      // Make the logout API request with the token in the headers
      const response = await axiosInstance.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in Authorization header
          },
        }
      );

      // On success, clear the token
      localStorage.clear();
      document.cookie = "token=; max-age=0"; // Clear token cookie
      setIsSuccess(true); // Set success state to true
      return response.data; // Optional: return any response data if needed
    } catch (err) {
      setError("Logout failed. Please try again."); // Set error message
      setIsSuccess(false);
      return null;
    } finally {
      setIsLoading(false); // Set loading state to false once the request is done
    }
  };

  return { logout, isLoading, error, isSuccess };
};

export default useLogout;
