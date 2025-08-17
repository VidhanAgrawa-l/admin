// hooks/useImageUpload.ts
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axios";

interface UploadResponse {
  success: boolean;
  message: string;
  data?: {
    url: string;
  };
}

export const useImageUpload = () => {
  return useMutation<UploadResponse, Error, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post<UploadResponse>(
        "/file/upload",
        formData,  
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    },
  });
};
