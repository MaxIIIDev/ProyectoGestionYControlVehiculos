import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { endpointFront } from "./Routes/Enrouters";
import { useAuth } from "../context/AuthContext";
import { Toast } from "../Utils/Toast";

interface ProtectedRouteProps {
  allowedRoles?: (string | number)[];
}
export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      Toast.fire({ icon: "warning", title: "No autorizado. Inicie sesión." });
    }
    // Se deja el arreglo vacío para que solo se ejecute al intentar entrar a la ruta, no al hacer logout
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={endpointFront.login.action} replace />;
  }
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={endpointFront.unauthoraized.action} replace />;
  }
  return <Outlet />;
};
