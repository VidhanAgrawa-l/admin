import axiosInstance from "@/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetInquiries = () => {
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/inquiry/forsupllier`);

        return response?.data;
      } catch (error) {
        throw new Error("An error occurred while fetching supplier profile");
      }
    },
  });
};
