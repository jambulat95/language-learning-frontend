import type { LanguageLevel } from "./auth";

export type League = "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";

export interface DashboardGamification {
  total_xp: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  league: League;
}

export interface DashboardCardSetItem {
  id: string;
  title: string;
  category: string | null;
  difficulty_level: LanguageLevel;
  card_count: number;
  learned_cards: number;
  due_cards: number;
  updated_at: string | null;
}

export interface DashboardData {
  gamification: DashboardGamification;
  today_xp: number;
  daily_xp_goal: number;
  today_reviews: number;
  recent_sets: DashboardCardSetItem[];
  total_cards_learned: number;
  total_due_cards: number;
}
