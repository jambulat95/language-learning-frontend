import client from "./client";
import type {
  StatisticsOverview,
  ActivityResponse,
  ProgressResponse,
  StrengthsResponse,
} from "@/types";

export async function getStatisticsOverviewApi(): Promise<StatisticsOverview> {
  const response = await client.get<StatisticsOverview>("/statistics/overview");
  return response.data;
}

export async function getStatisticsActivityApi(
  days: number = 90,
): Promise<ActivityResponse> {
  const response = await client.get<ActivityResponse>("/statistics/activity", {
    params: { days },
  });
  return response.data;
}

export async function getStatisticsProgressApi(
  weeks: number = 12,
): Promise<ProgressResponse> {
  const response = await client.get<ProgressResponse>("/statistics/progress", {
    params: { weeks },
  });
  return response.data;
}

export async function getStatisticsStrengthsApi(): Promise<StrengthsResponse> {
  const response = await client.get<StrengthsResponse>("/statistics/strengths");
  return response.data;
}
