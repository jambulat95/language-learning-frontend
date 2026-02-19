import client from "./client";
import type { DashboardData } from "@/types";

export async function getDashboardApi(): Promise<DashboardData> {
  const response = await client.get<DashboardData>("/dashboard");
  return response.data;
}
