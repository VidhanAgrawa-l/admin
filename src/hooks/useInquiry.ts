import axiosInstance from "@/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const sendInquiry = async (inquiryData: {
  name: string;
  email: string;
  message: string;
}) => {
  const response = await axiosInstance.post("/send-inquiry", inquiryData);
  return response.data;
};
// Custom hook to submit inquiry
export const useSubmitInquiry = () => {
  const mutation = useMutation({
    mutationFn: sendInquiry,
    onSuccess: () => {
      // Handle success logic, like clearing form, showing success message
      console.log("Inquiry sent successfully");
      toast(
        "Inquiry sent successfully! The seller will get back to you soon.."
      );
    },
    onError: (error) => {
      // Handle error, log, or show toast
      console.error("Error sending inquiry:", error);
    },
  });

  return mutation;
};
