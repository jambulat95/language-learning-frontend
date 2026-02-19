import type { LanguageLevel } from "./auth";

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  language_level: LanguageLevel;
  is_premium: boolean;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
  card_sets_count: number;
  total_xp: number;
  level: number;
  league: string;
}

export interface PaginatedAdminUsers {
  items: AdminUser[];
  total: number;
  skip: number;
  limit: number;
}

export interface AdminUserUpdateRequest {
  is_premium?: boolean;
  is_active?: boolean;
}

export interface AdminCardSet {
  id: string;
  title: string;
  user_email: string;
  user_full_name: string;
  difficulty_level: LanguageLevel;
  card_count: number;
  is_public: boolean;
  is_ai_generated: boolean;
  created_at: string;
}

export interface PaginatedAdminCardSets {
  items: AdminCardSet[];
  total: number;
  skip: number;
  limit: number;
}

export interface PlatformStats {
  total_users: number;
  premium_users: number;
  total_card_sets: number;
  public_card_sets: number;
  total_cards: number;
  total_conversations: number;
  active_today: number;
}
