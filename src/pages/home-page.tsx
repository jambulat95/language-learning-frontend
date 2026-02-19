import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores";
import { LoadingScreen } from "@/components/loading-screen";

export function HomePage() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Navigate to={user ? "/dashboard" : "/login"} replace />;
}
