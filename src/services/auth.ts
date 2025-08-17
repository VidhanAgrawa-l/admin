import axiosInstance from "@/axios";
import { useMutation } from "@tanstack/react-query";

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface submissionData {
  companyName: string;
  description: string;
  website: string;
  logo: string | null;
  banner: string | null;
  teamsize: string;
  industries: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
  };
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useSignup = () => {
  return useMutation({
    mutationFn: async (signupData: SignupData) => {
      try {
        const response = await axiosInstance.post("/auth/signup", signupData);
        return response.data;
      } catch (error: any) {
        if (error.response?.status === 409) {
          throw new Error("Email already exists");
        }
        throw new Error(
          error.response?.data?.message ||
            "An error occurred while creating the account."
        );
      }
    },
  });
};

export const useCreateSupplierProfile = () => {
  return useMutation<ApiResponse, Error, submissionData>({
    mutationFn: async (data: submissionData) => {
      try {
        const response = await axiosInstance.post<ApiResponse>(
          "/profile/add",
          data
        );
        console.log("profile add response:", response.data);

        return response.data;
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message ||
            "An error occurred while creating the supplier profile."
        );
      }
    },
  });
};
