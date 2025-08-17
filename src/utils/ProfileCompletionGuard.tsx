import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

export const ProfileCompletionGuard = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/signup" />;
  }

  if (user.profileCompleted) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};
