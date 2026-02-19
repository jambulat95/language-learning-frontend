import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  endConversationApi,
  getConversationApi,
  getScenariosApi,
  getWeeklyStatusApi,
  listConversationsApi,
  startConversationApi,
} from "@/api/conversations";
import type { ScenarioType } from "@/types/conversation";

export function useScenarios() {
  return useQuery({
    queryKey: ["scenarios"],
    queryFn: getScenariosApi,
    staleTime: 30 * 60 * 1000, // scenarios rarely change
  });
}

export function useWeeklyStatus() {
  return useQuery({
    queryKey: ["weekly-status"],
    queryFn: getWeeklyStatusApi,
  });
}

export function useStartConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (scenario: ScenarioType) => startConversationApi(scenario),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weekly-status"] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useEndConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (conversationId: string) => endConversationApi(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["weekly-status"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["gamification-profile"] });
    },
  });
}

export function useConversations(skip = 0, limit = 20) {
  return useQuery({
    queryKey: ["conversations", skip, limit],
    queryFn: () => listConversationsApi(skip, limit),
  });
}

export function useConversation(conversationId: string | undefined) {
  return useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => getConversationApi(conversationId!),
    enabled: !!conversationId,
  });
}
