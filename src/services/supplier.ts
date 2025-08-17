import axiosInstance from "@/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetSupplierProfile = (profileId: string) => {
  return useQuery({
    queryKey: ["supplierProfile"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/profile/${profileId}`);

        return response?.data;
      } catch (error) {
        throw new Error("An error occurred while fetching supplier profile");
      }
    },
  });
};
