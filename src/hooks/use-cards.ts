import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCardApi,
  deleteCardApi,
  importCardsApi,
  listCardsApi,
  updateCardApi,
} from "@/api/cards";
import type { CardCreateRequest, CardUpdateRequest } from "@/types";

export function useCards(setId: string, params?: { skip?: number; limit?: number; q?: string }) {
  return useQuery({
    queryKey: ["cards", setId, params],
    queryFn: () => listCardsApi(setId, params),
    enabled: !!setId,
  });
}

export function useCreateCard(setId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CardCreateRequest) => createCardApi(setId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", setId] });
      queryClient.invalidateQueries({ queryKey: ["card-set", setId] });
      queryClient.invalidateQueries({ queryKey: ["card-sets"] });
      queryClient.invalidateQueries({ queryKey: ["usage-limits"] });
    },
  });
}

export function useUpdateCard(setId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cardId, data }: { cardId: string; data: CardUpdateRequest }) =>
      updateCardApi(setId, cardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", setId] });
      queryClient.invalidateQueries({ queryKey: ["card-set", setId] });
    },
  });
}

export function useDeleteCard(setId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cardId: string) => deleteCardApi(setId, cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", setId] });
      queryClient.invalidateQueries({ queryKey: ["card-set", setId] });
      queryClient.invalidateQueries({ queryKey: ["card-sets"] });
    },
  });
}

export function useImportCards(setId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => importCardsApi(setId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", setId] });
      queryClient.invalidateQueries({ queryKey: ["card-set", setId] });
      queryClient.invalidateQueries({ queryKey: ["card-sets"] });
      queryClient.invalidateQueries({ queryKey: ["usage-limits"] });
    },
  });
}
