import client from "./client";
import type { User, UserUpdateRequest } from "@/types";

export async function updateMeApi(data: UserUpdateRequest): Promise<User> {
  const response = await client.patch<User>("/users/me", data);
  return response.data;
}
