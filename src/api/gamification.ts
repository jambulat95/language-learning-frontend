import client from "./client";
import type { GamificationProfile, Achievement, LeaderboardResponse } from "@/types";

export async function getGamificationProfileApi(): Promise<GamificationProfile> {
  const response = await client.get<GamificationProfile>("/gamification/profile");
  return response.data;
}

export async function getAchievementsApi(): Promise<Achievement[]> {
  const response = await client.get<Achievement[]>("/gamification/achievements");
  return response.data;
}

export async function getLeaderboardApi(
  period: string = "weekly",
  limit: number = 50,
): Promise<LeaderboardResponse> {
  const response = await client.get<LeaderboardResponse>("/gamification/leaderboard", {
    params: { period, limit },
  });
  return response.data;
}
