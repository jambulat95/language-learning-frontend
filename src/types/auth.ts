export type LanguageLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type InterestType =
  | "technology" | "science" | "travel" | "food" | "sports"
  | "music" | "movies" | "books" | "gaming" | "art"
  | "business" | "health" | "fashion" | "nature" | "history"
  | "photography" | "education" | "politics" | "humor" | "pets";

export interface Interest {
  id: string;
  interest: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  language_level: LanguageLevel;
  native_language: string;
  daily_xp_goal: number;
  is_premium: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
  interests: Interest[];
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
  native_language?: string;
  language_level?: LanguageLevel;
  interests: InterestType[];
}

export interface UsageLimits {
  is_premium: boolean;
  card_sets_used: number;
  card_sets_limit: number;
  cards_today: number;
  cards_today_limit: number;
  ai_dialogues_used: number;
  ai_dialogues_limit: number;
}

export interface UserUpdateRequest {
  full_name?: string;
  avatar_url?: string | null;
  language_level?: LanguageLevel;
  native_language?: string;
  daily_xp_goal?: number;
  interests?: InterestType[];
}
