export interface LevelPrediction {
  current_cefr: string;
  next_cefr: string | null;
  current_xp: number;
  next_cefr_xp: number | null;
  avg_daily_xp: number;
  estimated_date: string | null;
}

export interface StatisticsOverview {
  words_learned: number;
  words_mastered: number;
  accuracy: number;
  study_days: number;
  level: number;
  total_xp: number;
  current_streak: number;
  level_prediction: LevelPrediction;
}

export interface DailyActivity {
  date: string;
  xp: number;
  reviews: number;
  cards_learned: number;
  conversations: number;
}

export interface ActivityResponse {
  days: DailyActivity[];
}

export interface WeeklyProgress {
  week_start: string;
  xp: number;
  reviews: number;
  accuracy: number;
}

export interface ProgressResponse {
  weeks: WeeklyProgress[];
}

export interface SetStrength {
  set_id: string;
  set_title: string;
  total_cards: number;
  cards_studied: number;
  correct_reviews: number;
  total_reviews: number;
  accuracy: number;
  mastered_cards: number;
}

export interface StrengthsResponse {
  sets: SetStrength[];
}
