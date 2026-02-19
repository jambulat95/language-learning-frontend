export type ScenarioType =
  | "airport"
  | "restaurant"
  | "job_interview"
  | "hotel_checkin"
  | "shopping"
  | "doctor_visit"
  | "small_talk"
  | "business_meeting"
  | "free_conversation";

export interface ScenarioListItem {
  type: ScenarioType;
  title: string;
  description: string;
  suggested_turns: number;
}

export interface GrammarCorrection {
  original: string;
  corrected: string;
  explanation: string;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  corrections: GrammarCorrection[] | null;
  suggestions: string[] | null;
}

export interface StartConversationRequest {
  scenario: ScenarioType;
}

export interface SendMessageRequest {
  message: string;
}

export interface ConversationStartResponse {
  conversation_id: string;
  scenario: ScenarioType;
  scenario_title: string;
  ai_message: string;
  suggestions: string[];
}

export interface ConversationFeedback {
  total_turns: number;
  total_errors: number;
  common_error_types: string[];
  strengths: string[];
  areas_to_improve: string[];
  overall_assessment: string;
  xp_earned: number;
}

export interface ConversationEndResponse {
  conversation_id: string;
  feedback: ConversationFeedback;
}

export interface ConversationSummary {
  id: string;
  scenario: string;
  scenario_title: string;
  started_at: string;
  ended_at: string | null;
  total_turns: number;
  is_active: boolean;
}

export interface ConversationDetailResponse {
  id: string;
  scenario: string;
  scenario_title: string;
  started_at: string;
  ended_at: string | null;
  total_turns: number;
  messages: ConversationMessage[];
  feedback: ConversationFeedback | null;
}

export interface WeeklyDialogueStatus {
  used: number;
  limit: number;
  is_premium: boolean;
}

// SSE event types
export interface CorrectionsEvent {
  corrections: GrammarCorrection[];
  suggestions: string[];
  turn_number: number;
}

export interface DoneEvent {
  ai_message: string;
}
