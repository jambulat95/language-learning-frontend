import client from "./client";
import type { LoginRequest, RegisterRequest, TokenResponse, UsageLimits, User } from "@/types";

export async function loginApi(data: LoginRequest): Promise<TokenResponse> {
  const response = await client.post<TokenResponse>("/auth/login", data);
  return response.data;
}

export async function registerApi(data: RegisterRequest): Promise<{ user: User; accessToken: string }> {
  const response = await client.post<User>("/auth/register", data);
  const accessToken = response.headers["x-access-token"] as string;
  return { user: response.data, accessToken };
}

export async function refreshTokenApi(): Promise<TokenResponse> {
  const response = await client.post<TokenResponse>("/auth/refresh");
  return response.data;
}

export async function logoutApi(): Promise<void> {
  await client.post("/auth/logout");
}

export async function getMeApi(): Promise<User> {
  const response = await client.get<User>("/users/me");
  return response.data;
}

export async function requestPasswordResetApi(
  email: string,
): Promise<{ reset_token?: string }> {
  const response = await client.post("/auth/password-reset/request", { email });
  return response.data;
}

export async function confirmPasswordResetApi(
  token: string,
  newPassword: string,
): Promise<void> {
  await client.post("/auth/password-reset/confirm", {
    token,
    new_password: newPassword,
  });
}

export async function getUsageLimitsApi(): Promise<UsageLimits> {
  const response = await client.get<UsageLimits>("/auth/usage-limits");
  return response.data;
}
