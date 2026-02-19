import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCardSetApi,
  deleteUserApi,
  getStatsApi,
  listCardSetsApi,
  listUsersApi,
  updateUserApi,
} from "@/api/admin";
import type { AdminUserUpdateRequest } from "@/types";

export function usePlatformStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getStatsApi,
  });
}

export function useAdminUsers(params: {
  skip?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => listUsersApi(params),
  });
}

export function useUpdateAdminUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: AdminUserUpdateRequest;
    }) => updateUserApi(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
}

export function useDeleteAdminUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => deleteUserApi(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
}

export function useAdminCardSets(params: {
  skip?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ["admin-card-sets", params],
    queryFn: () => listCardSetsApi(params),
  });
}

export function useDeleteAdminCardSet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (setId: string) => deleteCardSetApi(setId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-card-sets"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
}
