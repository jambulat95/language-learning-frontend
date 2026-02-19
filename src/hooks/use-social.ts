import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptFriendRequestApi,
  getFriendProgressApi,
  getFriendsApi,
  getIncomingRequestsApi,
  getIncomingSharedSetsApi,
  getOutgoingSharedSetsApi,
  rejectFriendRequestApi,
  removeFriendApi,
  searchUsersApi,
  sendFriendRequestApi,
  shareCardSetApi,
  unshareCardSetApi,
} from "@/api/social";
import type { SendFriendRequestRequest, ShareCardSetRequest } from "@/types";

// ── Queries ──────────────────────────────────────────────────────────────────

export function useFriends() {
  return useQuery({
    queryKey: ["friends"],
    queryFn: getFriendsApi,
  });
}

export function useIncomingRequests() {
  return useQuery({
    queryKey: ["friend-requests"],
    queryFn: getIncomingRequestsApi,
  });
}

export function useUserSearch(query: string) {
  return useQuery({
    queryKey: ["user-search", query],
    queryFn: () => searchUsersApi(query),
    enabled: query.length >= 2,
  });
}

export function useFriendProgress(userId: string) {
  return useQuery({
    queryKey: ["friend-progress", userId],
    queryFn: () => getFriendProgressApi(userId),
    enabled: !!userId,
  });
}

export function useIncomingSharedSets() {
  return useQuery({
    queryKey: ["shared-sets", "incoming"],
    queryFn: getIncomingSharedSetsApi,
  });
}

export function useOutgoingSharedSets() {
  return useQuery({
    queryKey: ["shared-sets", "outgoing"],
    queryFn: getOutgoingSharedSetsApi,
  });
}

// ── Mutations ────────────────────────────────────────────────────────────────

export function useSendFriendRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SendFriendRequestRequest) =>
      sendFriendRequestApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friend-requests"] });
      queryClient.invalidateQueries({ queryKey: ["user-search"] });
    },
  });
}

export function useAcceptFriendRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (friendshipId: string) => acceptFriendRequestApi(friendshipId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friend-requests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["gamification-profile"] });
    },
  });
}

export function useRejectFriendRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (friendshipId: string) => rejectFriendRequestApi(friendshipId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friend-requests"] });
    },
  });
}

export function useRemoveFriend() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (friendshipId: string) => removeFriendApi(friendshipId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
}

export function useShareCardSet(setId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ShareCardSetRequest) => shareCardSetApi(setId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shared-sets"] });
    },
  });
}

export function useUnshareCardSet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (shareId: string) => unshareCardSetApi(shareId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shared-sets"] });
    },
  });
}
