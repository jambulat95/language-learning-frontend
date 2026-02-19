import { useQuery } from "@tanstack/react-query";
import { getUsageLimitsApi } from "@/api/auth";

export function useUsageLimits() {
  return useQuery({
    queryKey: ["usage-limits"],
    queryFn: getUsageLimitsApi,
  });
}
