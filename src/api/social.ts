import client from "./client";
import type {
  FriendResponse,
  FriendshipResponse,
  FriendProgressResponse,
  UserSearchResult,
  SendFriendRequestRequest,
  ShareCardSetRequest,
  SharedCardSetResponse,
} from "@/types";

// ── Friend Requests ──────────────────────────────────────────────────────────

export async function sendFriendRequestApi(
  data: SendFriendRequestRequest,
): Promise<FriendshipResponse> {
  const response = await client.post<FriendshipResponse>(
    "/social/friend-requests",
    data,
  );
  return response.data;
}

export async function getIncomingRequestsApi(): Promise<FriendshipResponse[]> {
  const response = await client.get<FriendshipResponse[]>(
    "/social/friend-requests/incoming",
  );
  return response.data;
}

export async function acceptFriendRequestApi(
  friendshipId: string,
): Promise<FriendshipResponse> {
  const response = await client.post<FriendshipResponse>(
    `/social/friend-requests/${friendshipId}/accept`,
  );
  return response.data;
}

export async function rejectFriendRequestApi(
  friendshipId: string,
): Promise<void> {
  await client.delete(`/social/friend-requests/${friendshipId}`);
}

// ── Friends ──────────────────────────────────────────────────────────────────

export async function getFriendsApi(): Promise<FriendResponse[]> {
  const response = await client.get<FriendResponse[]>("/social/friends");
  return response.data;
}

export async function removeFriendApi(friendshipId: string): Promise<void> {
  await client.delete(`/social/friends/${friendshipId}`);
}

export async function getFriendProgressApi(
  userId: string,
): Promise<FriendProgressResponse> {
  const response = await client.get<FriendProgressResponse>(
    `/social/friends/${userId}/progress`,
  );
  return response.data;
}

// ── User Search ──────────────────────────────────────────────────────────────

export async function searchUsersApi(q: string): Promise<UserSearchResult[]> {
  const response = await client.get<UserSearchResult[]>(
    "/social/users/search",
    { params: { q } },
  );
  return response.data;
}

// ── Card Set Sharing ─────────────────────────────────────────────────────────

export async function shareCardSetApi(
  setId: string,
  data: ShareCardSetRequest,
): Promise<SharedCardSetResponse> {
  const response = await client.post<SharedCardSetResponse>(
    `/social/card-sets/${setId}/share`,
    data,
  );
  return response.data;
}

export async function unshareCardSetApi(shareId: string): Promise<void> {
  await client.delete(`/social/shared-sets/${shareId}`);
}

export async function getIncomingSharedSetsApi(): Promise<
  SharedCardSetResponse[]
> {
  const response = await client.get<SharedCardSetResponse[]>(
    "/social/shared-sets/incoming",
  );
  return response.data;
}

export async function getOutgoingSharedSetsApi(): Promise<
  SharedCardSetResponse[]
> {
  const response = await client.get<SharedCardSetResponse[]>(
    "/social/shared-sets/outgoing",
  );
  return response.data;
}
