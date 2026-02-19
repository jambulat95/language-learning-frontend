import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores";
import { LoadingScreen } from "./loading-screen";

export function ProtectedRoute() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
