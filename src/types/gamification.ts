import type { League } from "./dashboard";

export type AchievementCondition =
  | "cards_learned"
  | "streak_days"
  | "conversations"
  | "xp_earned"
  | "sets_created"
  | "perfect_reviews";

export interface AchievementUnlock {
  id: string;
  title: string;
  xp_reward: number;
}

export interface GamificationProfile {
  total_xp: number;
  level: number;
  league: League;
  current_streak: number;
  longest_streak: number;
  today_xp: number;
  daily_xp_goal: number;
  achievements_unlocked: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon_url: string | null;
  condition_type: AchievementCondition;
  condition_value: number;
  xp_reward: number;
  unlocked_at: string | null;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  total_xp: number;
  level: number;
  league: League;
}

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
  period: string;
  user_rank: number | null;
}
