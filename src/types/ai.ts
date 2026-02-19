import type { CardSetDetail, LanguageLevel } from "@/types";

export interface GenerateCardsRequest {
  topic: string;
  difficulty_level: LanguageLevel;
  count: number;
  interests: string[];
}

export interface GenerateCardsResponse {
  card_set: CardSetDetail;
  generated_count: number;
}
