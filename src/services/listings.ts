import axiosInstance from "@/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllListings = () => {
  return useQuery({
    queryKey: ["alllistings"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/product/products`);

        return response?.data;
      } catch (error) {
        throw new Error("An error occurred while fetching supplier profile");
      }
    },
  });
};

export const useGetListingDetail = (_id: string) => {
  return useQuery({
    queryKey: ["supplierProfile"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/product/${_id}`);

        return response?.data;
      } catch (error) {
        throw new Error("An error occurred while fetching supplier profile");
      }
    },
  });
};

// create product

export const useCreateProduct = () => {
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post("/product/add", data);
        return response.data;
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message ||
            "An error occurred while creating the supplier profile."
        );
      }
    },
    // onSuccess: (response) => {
    //   navigate("/supplier/login");
    // },
    // onError: (error: Error) => {},
  });
};
