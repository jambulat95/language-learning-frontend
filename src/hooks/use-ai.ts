import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateCardsApi } from "@/api/ai";
import type { GenerateCardsRequest } from "@/types";

export function useGenerateCards() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: GenerateCardsRequest) => generateCardsApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card-sets"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
