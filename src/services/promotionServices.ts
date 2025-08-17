import axiosInstance from "@/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Function to create a promotion
export const useCreatePromotion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (promotion: FormData) => {
      try {
        const response = await axiosInstance.post(`/promotion`, promotion);
        return response.data;
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
    },
  });
};

export interface Promotion {
  _id: string;
  title: string;
  description?: string;
  discount_type: "percentage" | "fixed_price";
  discount_rate: number;
  start_date: string;
  expiration_date: string;
  usage: "expiration" | "max_redemptions";
  max_redemptions?: number;
  discount_code?: string;
  service_ids: string[];
  is_active: boolean;
}

export interface PromotionResponse {
  promotions: Promotion[];
}

export const useFetchPromotions = () => {
  return useQuery<PromotionResponse>({
    queryKey: ["promotions"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<PromotionResponse>(
          `/promotion`
        );
        return response.data;
      } catch (error) {
        throw new Error("An error occurred while fetching promotions");
      }
    },
  });
};
