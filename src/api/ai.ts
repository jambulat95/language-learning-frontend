import client from "./client";
import type { GenerateCardsRequest, GenerateCardsResponse } from "@/types";

export async function generateCardsApi(
  data: GenerateCardsRequest,
): Promise<GenerateCardsResponse> {
  const response = await client.post<GenerateCardsResponse>(
    "/ai/generate-cards",
    data,
  );
  return response.data;
}
