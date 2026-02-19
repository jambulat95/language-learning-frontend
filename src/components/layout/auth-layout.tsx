import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores";
import { LoadingScreen } from "@/components/loading-screen";

export function AuthLayout() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
