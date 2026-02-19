import type { CardType } from "./cards";
import type { AchievementUnlock } from "./gamification";

export type ReviewRating = "again" | "hard" | "good" | "easy";

export interface CardProgress {
  id: string;
  user_id: string;
  card_id: string;
  ease_factor: number;
  interval: number;
  repetitions: number;
  next_review_date: string;
  last_reviewed_at: string | null;
  total_reviews: number;
  correct_reviews: number;
}

export interface StudyCard {
  id: string;
  card_set_id: string;
  front_text: string;
  back_text: string;
  example_sentence: string | null;
  image_url: string | null;
  audio_url: string | null;
  card_type: CardType;
  order_index: number;
  created_at: string;
  progress: CardProgress | null;
}

export interface ReviewResult {
  card_id: string;
  ease_factor: number;
  interval: number;
  next_review_date: string;
  is_correct: boolean;
  xp_earned: number;
  new_achievements: AchievementUnlock[];
}

export interface StudySetProgress {
  total_cards: number;
  learned_cards: number;
  due_cards: number;
  mastered_cards: number;
}
