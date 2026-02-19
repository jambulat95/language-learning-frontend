import client from "./client";
import type {
  ConversationDetailResponse,
  ConversationEndResponse,
  ConversationStartResponse,
  ConversationSummary,
  CorrectionsEvent,
  DoneEvent,
  ScenarioListItem,
  ScenarioType,
  WeeklyDialogueStatus,
} from "@/types/conversation";
import { useAuthStore } from "@/stores";

export async function getScenariosApi(): Promise<ScenarioListItem[]> {
  const { data } = await client.get<ScenarioListItem[]>("/conversations/scenarios");
  return data;
}

export async function getWeeklyStatusApi(): Promise<WeeklyDialogueStatus> {
  const { data } = await client.get<WeeklyDialogueStatus>("/conversations/weekly-status");
  return data;
}

export async function startConversationApi(
  scenario: ScenarioType,
): Promise<ConversationStartResponse> {
  const { data } = await client.post<ConversationStartResponse>(
    "/conversations/start",
    { scenario },
  );
  return data;
}

export async function endConversationApi(
  conversationId: string,
): Promise<ConversationEndResponse> {
  const { data } = await client.post<ConversationEndResponse>(
    `/conversations/${conversationId}/end`,
  );
  return data;
}

export async function listConversationsApi(
  skip = 0,
  limit = 20,
): Promise<ConversationSummary[]> {
  const { data } = await client.get<ConversationSummary[]>("/conversations", {
    params: { skip, limit },
  });
  return data;
}

export async function getConversationApi(
  conversationId: string,
): Promise<ConversationDetailResponse> {
  const { data } = await client.get<ConversationDetailResponse>(
    `/conversations/${conversationId}`,
  );
  return data;
}

export interface SendMessageSSECallbacks {
  onCorrections: (data: CorrectionsEvent) => void;
  onToken: (token: string) => void;
  onDone: (data: DoneEvent) => void;
  onError: (error: string) => void;
}

export async function sendMessageSSE(
  conversationId: string,
  message: string,
  callbacks: SendMessageSSECallbacks,
): Promise<void> {
  const token = useAuthStore.getState().accessToken;

  const response = await fetch(`/api/v1/conversations/${conversationId}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    let detail = "Failed to send message";
    try {
      const errData = await response.json();
      detail = errData.detail ?? detail;
    } catch {
      // ignore parse error
    }
    callbacks.onError(detail);
    return;
  }

  const reader = response.body?.getReader();
  if (!reader) {
    callbacks.onError("No response body");
    return;
  }

  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Parse SSE events from buffer
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      let currentEvent = "";
      let currentData = "";

      for (const line of lines) {
        if (line.startsWith("event: ")) {
          currentEvent = line.slice(7).trim();
        } else if (line.startsWith("data: ")) {
          currentData = line.slice(6);
        } else if (line === "" && currentEvent) {
          // End of event block
          switch (currentEvent) {
            case "corrections":
              try {
                callbacks.onCorrections(JSON.parse(currentData));
              } catch {
                // ignore parse error
              }
              break;
            case "token":
              callbacks.onToken(currentData);
              break;
            case "done":
              try {
                callbacks.onDone(JSON.parse(currentData));
              } catch {
                // ignore parse error
              }
              break;
            case "error":
              try {
                const errData = JSON.parse(currentData);
                callbacks.onError(errData.detail ?? "Stream error");
              } catch {
                callbacks.onError("Stream error");
              }
              break;
          }
          currentEvent = "";
          currentData = "";
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
