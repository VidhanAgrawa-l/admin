import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to get a cookie value
const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return matches ? decodeURIComponent(matches[2]) : undefined;
};

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token"); // Replace 'authToken' with your cookie name
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
