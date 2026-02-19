import { useQuery } from "@tanstack/react-query";
import {
  getStatisticsOverviewApi,
  getStatisticsActivityApi,
  getStatisticsProgressApi,
  getStatisticsStrengthsApi,
} from "@/api/statistics";

export function useStatisticsOverview() {
  return useQuery({
    queryKey: ["statistics-overview"],
    queryFn: getStatisticsOverviewApi,
  });
}

export function useStatisticsActivity(days: number = 90) {
  return useQuery({
    queryKey: ["statistics-activity", days],
    queryFn: () => getStatisticsActivityApi(days),
  });
}

export function useStatisticsProgress(weeks: number = 12) {
  return useQuery({
    queryKey: ["statistics-progress", weeks],
    queryFn: () => getStatisticsProgressApi(weeks),
  });
}

export function useStatisticsStrengths() {
  return useQuery({
    queryKey: ["statistics-strengths"],
    queryFn: getStatisticsStrengthsApi,
  });
}
