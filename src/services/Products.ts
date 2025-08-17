import axiosInstance from "@/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["Allproducts"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/product/all`);
        return response?.data;
      } catch (error) {
        throw new Error("An error occurred while fetching vacation package");
      }
    },
  });
};

export const useGetFeaturedProducts = (category: string) => {
  return useQuery({
    queryKey: ["featuredProducts", category],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/products?category=${category}`
        );
        return response?.data;
      } catch (error) {
        throw new Error("An error occurred while fetching vacation package");
      }
    },
    enabled: !!category,
  });
};

export const useGetProductDetail = (productId: string) => {
  return useQuery({
    queryKey: ["productDetail", productId],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/product/${productId}`);
        return response?.data;
      } catch (error) {
        throw new Error("An error occurred while fetching the product details");
      }
    },
    enabled: !!productId, // Ensures the query only runs if productId is provided
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/categories`);
        return response?.data;
      } catch (error) {
        throw new Error("An error occurred while fetching the categories");
      }
    },
  });
};
