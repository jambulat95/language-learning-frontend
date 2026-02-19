import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCardSetApi,
  deleteCardSetApi,
  getCardSetApi,
  listCardSetsApi,
  listPublicCardSetsApi,
  updateCardSetApi,
} from "@/api/cards";
import type {
  CardSetCreateRequest,
  CardSetListParams,
  CardSetUpdateRequest,
} from "@/types";

export function useCardSets(params?: CardSetListParams) {
  return useQuery({
    queryKey: ["card-sets", params],
    queryFn: () => listCardSetsApi(params),
  });
}

export function usePublicCardSets(params?: CardSetListParams) {
  return useQuery({
    queryKey: ["card-sets-public", params],
    queryFn: () => listPublicCardSetsApi(params),
  });
}

export function useCardSet(id: string) {
  return useQuery({
    queryKey: ["card-set", id],
    queryFn: () => getCardSetApi(id),
    enabled: !!id,
  });
}

export function useCreateCardSet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CardSetCreateRequest) => createCardSetApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card-sets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["usage-limits"] });
    },
  });
}

export function useUpdateCardSet(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CardSetUpdateRequest) => updateCardSetApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card-sets"] });
      queryClient.invalidateQueries({ queryKey: ["card-set", id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeleteCardSet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCardSetApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card-sets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["usage-limits"] });
    },
  });
}
