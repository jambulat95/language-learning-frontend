import client from "./client";
import type {
  AdminUserUpdateRequest,
  AdminUser,
  PaginatedAdminUsers,
  PaginatedAdminCardSets,
  PlatformStats,
} from "@/types";

export async function getStatsApi(): Promise<PlatformStats> {
  const response = await client.get<PlatformStats>("/admin/stats");
  return response.data;
}

export async function listUsersApi(params: {
  skip?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedAdminUsers> {
  const response = await client.get<PaginatedAdminUsers>("/admin/users", {
    params,
  });
  return response.data;
}

export async function updateUserApi(
  userId: string,
  data: AdminUserUpdateRequest,
): Promise<AdminUser> {
  const response = await client.patch<AdminUser>(
    `/admin/users/${userId}`,
    data,
  );
  return response.data;
}

export async function deleteUserApi(userId: string): Promise<void> {
  await client.delete(`/admin/users/${userId}`);
}

export async function listCardSetsApi(params: {
  skip?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedAdminCardSets> {
  const response = await client.get<PaginatedAdminCardSets>(
    "/admin/card-sets",
    { params },
  );
  return response.data;
}

export async function deleteCardSetApi(setId: string): Promise<void> {
  await client.delete(`/admin/card-sets/${setId}`);
}
