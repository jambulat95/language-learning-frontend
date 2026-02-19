import { useQuery } from "@tanstack/react-query";
import { getDashboardApi } from "@/api/dashboard";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardApi,
  });
}
