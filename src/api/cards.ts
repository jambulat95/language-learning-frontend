import client from "./client";
import type {
  Card,
  CardCreateRequest,
  CardImportResponse,
  CardSet,
  CardSetCreateRequest,
  CardSetDetail,
  CardSetListParams,
  CardSetUpdateRequest,
  CardUpdateRequest,
  PaginatedCards,
  PaginatedCardSets,
} from "@/types";

// --- Card Sets ---

export async function listCardSetsApi(
  params?: CardSetListParams,
): Promise<PaginatedCardSets> {
  const response = await client.get<PaginatedCardSets>("/card-sets", {
    params,
  });
  return response.data;
}

export async function listPublicCardSetsApi(
  params?: CardSetListParams,
): Promise<PaginatedCardSets> {
  const response = await client.get<PaginatedCardSets>("/card-sets/public", {
    params,
  });
  return response.data;
}

export async function getCardSetApi(id: string): Promise<CardSetDetail> {
  const response = await client.get<CardSetDetail>(`/card-sets/${id}`);
  return response.data;
}

export async function createCardSetApi(
  data: CardSetCreateRequest,
): Promise<CardSet> {
  const response = await client.post<CardSet>("/card-sets", data);
  return response.data;
}

export async function updateCardSetApi(
  id: string,
  data: CardSetUpdateRequest,
): Promise<CardSet> {
  const response = await client.patch<CardSet>(`/card-sets/${id}`, data);
  return response.data;
}

export async function deleteCardSetApi(id: string): Promise<void> {
  await client.delete(`/card-sets/${id}`);
}

// --- Cards ---

export async function listCardsApi(
  setId: string,
  params?: { skip?: number; limit?: number; q?: string },
): Promise<PaginatedCards> {
  const response = await client.get<PaginatedCards>(
    `/card-sets/${setId}/cards`,
    { params },
  );
  return response.data;
}

export async function createCardApi(
  setId: string,
  data: CardCreateRequest,
): Promise<Card> {
  const response = await client.post<Card>(`/card-sets/${setId}/cards`, data);
  return response.data;
}

export async function updateCardApi(
  setId: string,
  cardId: string,
  data: CardUpdateRequest,
): Promise<Card> {
  const response = await client.patch<Card>(
    `/card-sets/${setId}/cards/${cardId}`,
    data,
  );
  return response.data;
}

export async function deleteCardApi(
  setId: string,
  cardId: string,
): Promise<void> {
  await client.delete(`/card-sets/${setId}/cards/${cardId}`);
}

export async function importCardsApi(
  setId: string,
  file: File,
): Promise<CardImportResponse> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await client.post<CardImportResponse>(
    `/card-sets/${setId}/cards/import`,
    formData,
  );
  return response.data;
}
