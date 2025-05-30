// components/ProtectedRoute.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
}

const ProtectedRoute = ({ children, isAuthenticated }: ProtectedRouteProps) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
