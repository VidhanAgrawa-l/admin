import { Navigate, Outlet } from "react-router-dom";
import { useAuthCookie } from "../utils/cookies";

const PrivateRoute: React.FC = () => {
  const { cookies } = useAuthCookie();
  console.log("cookies", cookies);

  if (!cookies.token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
