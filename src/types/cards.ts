import type { LanguageLevel } from "./auth";

export type CardType =
  | "flashcard"
  | "fill_blank"
  | "match"
  | "listening"
  | "multiple_choice"
  | "sentence_build"
  | "visual";

export interface CardSet {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string | null;
  difficulty_level: LanguageLevel;
  is_public: boolean;
  is_ai_generated: boolean;
  card_count: number;
  created_at: string;
  updated_at: string | null;
}

export interface Card {
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
}

export interface CardSetDetail extends CardSet {
  cards: Card[];
}

export interface PaginatedCardSets {
  items: CardSet[];
  total: number;
  skip: number;
  limit: number;
}

export interface PaginatedCards {
  items: Card[];
  total: number;
  skip: number;
  limit: number;
}

export interface CardSetCreateRequest {
  title: string;
  description?: string | null;
  category?: string | null;
  difficulty_level: LanguageLevel;
  is_public?: boolean;
}

export interface CardSetUpdateRequest {
  title?: string;
  description?: string | null;
  category?: string | null;
  difficulty_level?: LanguageLevel;
  is_public?: boolean;
}

export interface CardCreateRequest {
  front_text: string;
  back_text: string;
  example_sentence?: string | null;
  card_type?: CardType;
  order_index?: number;
}

export interface CardUpdateRequest {
  front_text?: string;
  back_text?: string;
  example_sentence?: string | null;
  card_type?: CardType;
  order_index?: number;
}

export interface CardImportResponse {
  imported_count: number;
  skipped_count: number;
  cards: Card[];
}

export interface CardSetListParams {
  skip?: number;
  limit?: number;
  q?: string;
  category?: string;
  difficulty_level?: LanguageLevel;
}
