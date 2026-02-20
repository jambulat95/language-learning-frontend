import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores";
import { LoadingScreen } from "@/components/loading-screen";
import { LandingPage } from "@/pages/landing-page";

export function HomePage() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LandingPage />;
}
