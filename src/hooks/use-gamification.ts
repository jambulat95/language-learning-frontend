import { useQuery } from "@tanstack/react-query";
import {
  getGamificationProfileApi,
  getAchievementsApi,
  getLeaderboardApi,
} from "@/api/gamification";

export function useGamificationProfile() {
  return useQuery({
    queryKey: ["gamification-profile"],
    queryFn: getGamificationProfileApi,
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievementsApi,
  });
}

export function useLeaderboard(period: string = "weekly") {
  return useQuery({
    queryKey: ["leaderboard", period],
    queryFn: () => getLeaderboardApi(period),
  });
}
