import axios from "axios";
import type { TokenResponse } from "@/types";

let authStoreAccessor: (() => {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clearAuth: () => void;
}) | null = null;

export function setAuthStoreAccessor(accessor: typeof authStoreAccessor) {
  authStoreAccessor = accessor;
}

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  withCredentials: true,
});

// Attach access token to every request
client.interceptors.request.use((config) => {
  const store = authStoreAccessor?.();
  if (store?.accessToken) {
    config.headers.Authorization = `Bearer ${store.accessToken}`;
  }
  return config;
});

// Handle 401 with token refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
}

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't try to refresh for auth endpoints or already-retried requests
    const isAuthEndpoint = originalRequest?.url?.startsWith("/auth/");
    if (error.response?.status !== 401 || isAuthEndpoint || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return client(originalRequest);
      });
    }

    isRefreshing = true;
    originalRequest._retry = true;

    try {
      const { data } = await axios.post<TokenResponse>(
        `${import.meta.env.VITE_API_URL || "/api/v1"}/auth/refresh`,
        null,
        { withCredentials: true },
      );
      const newToken = data.access_token;
      authStoreAccessor?.().setAccessToken(newToken);
      processQueue(null, newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return client(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      authStoreAccessor?.().clearAuth();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default client;
