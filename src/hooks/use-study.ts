import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDueCardsApi, getStudyProgressApi, submitReviewApi } from "@/api/study";
import type { ReviewRating } from "@/types";

export function useDueCards(setId: string, limit = 20, practice = false) {
  return useQuery({
    queryKey: ["due-cards", setId, limit, practice],
    queryFn: () => getDueCardsApi(setId, limit, practice),
    enabled: !!setId,
  });
}

export function useStudyProgress(setId: string) {
  return useQuery({
    queryKey: ["study-progress", setId],
    queryFn: () => getStudyProgressApi(setId),
    enabled: !!setId,
  });
}

export function useSubmitReview(setId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cardId, rating }: { cardId: string; rating: ReviewRating }) =>
      submitReviewApi(cardId, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-progress", setId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
