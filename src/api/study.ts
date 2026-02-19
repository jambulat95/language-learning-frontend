import client from "./client";
import type { ReviewRating, ReviewResult, StudyCard, StudySetProgress } from "@/types";

export async function getDueCardsApi(
  setId: string,
  limit = 20,
  practice = false,
): Promise<StudyCard[]> {
  const response = await client.get<StudyCard[]>(
    `/study/sets/${setId}/due-cards`,
    { params: { limit, ...(practice && { practice: true }) } },
  );
  return response.data;
}

export async function submitReviewApi(
  cardId: string,
  rating: ReviewRating,
): Promise<ReviewResult> {
  const response = await client.post<ReviewResult>("/study/review", {
    card_id: cardId,
    rating,
  });
  return response.data;
}

export async function getStudyProgressApi(
  setId: string,
): Promise<StudySetProgress> {
  const response = await client.get<StudySetProgress>(
    `/study/sets/${setId}/progress`,
  );
  return response.data;
}
