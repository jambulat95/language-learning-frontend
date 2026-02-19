import type { LanguageLevel } from "./auth";
import type { League } from "./dashboard";

export type FriendshipStatus = "pending" | "accepted";

export interface FriendUserInfo {
  id: string;
  full_name: string;
  avatar_url: string | null;
  language_level: LanguageLevel;
}

export interface FriendshipResponse {
  id: string;
  user: FriendUserInfo;
  status: FriendshipStatus;
  created_at: string;
}

export interface FriendResponse {
  id: string;
  full_name: string;
  avatar_url: string | null;
  language_level: LanguageLevel;
  is_premium: boolean;
}

export interface UserSearchResult {
  id: string;
  full_name: string;
  avatar_url: string | null;
  language_level: LanguageLevel;
  friendship_status: FriendshipStatus | null;
  friendship_id: string | null;
}

export interface SharedCardSetInfo {
  id: string;
  title: string;
  card_count: number;
  difficulty_level: LanguageLevel;
}

export interface SharedByInfo {
  id: string;
  full_name: string;
  avatar_url: string | null;
}

export interface SharedCardSetResponse {
  id: string;
  card_set: SharedCardSetInfo;
  shared_by: SharedByInfo;
  created_at: string;
}

export interface FriendGamificationStats {
  total_xp: number;
  level: number;
  league: League;
  current_streak: number;
  longest_streak: number;
}

export interface FriendStudyStats {
  words_learned: number;
  words_mastered: number;
  study_days: number;
  accuracy: number;
}

export interface FriendProgressResponse {
  id: string;
  full_name: string;
  avatar_url: string | null;
  language_level: LanguageLevel;
  is_premium: boolean;
  gamification: FriendGamificationStats;
  study: FriendStudyStats;
}

export interface SendFriendRequestRequest {
  friend_id: string;
}

export interface ShareCardSetRequest {
  friend_id: string;
}
