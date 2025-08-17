import axiosInstance from "@/axios";

import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetListings = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/products`);
        return response?.data;
      } catch (error) {
        throw new Error("An error occurred while fetching vacation package");
      }
    },
  });
};

export const useGetProductDetail = (productId: string) => {
  return useQuery({
    queryKey: ["productDetail", productId],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/product/${productId}`);

        return response.data;
      } catch (error) {
        throw new Error("An error occurred while fetching vacation package");
      }
    },
  });
};

export const useSendInquiry = () => {
  return useMutation({
    mutationFn: async (data: { [key: string]: any }) => {
      try {
        const response = await axiosInstance.post(`/inquiry/add`, data);
        return response.data;
      } catch (error) {
        throw new Error("An error occurred while sending the inquiry.");
      }
    },
  });
};
