import { Outlet, Navigate } from "react-router-dom";
import { endpointFront } from "./Routes/Enrouters";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: (string | number)[];
}
export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={endpointFront.login.action} />;
  }
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={endpointFront.unauthoraized.action} />;
  }
  return <Outlet />;
};
