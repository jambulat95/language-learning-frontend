import { create } from "zustand";
import type { User } from "@/types";
import { getMeApi, loginApi, logoutApi, registerApi } from "@/api/auth";
import type { LoginRequest, RegisterRequest } from "@/types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;

  setAccessToken: (token: string | null) => void;
  clearAuth: () => void;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoading: true,

  setAccessToken: (token) => set({ accessToken: token }),

  clearAuth: () => set({ user: null, accessToken: null }),

  login: async (data) => {
    const response = await loginApi(data);
    set({ accessToken: response.access_token });
    const user = await getMeApi();
    set({ user });
  },

  register: async (data) => {
    const { user, accessToken } = await registerApi(data);
    set({ accessToken, user });
  },

  logout: async () => {
    try {
      await logoutApi();
    } finally {
      set({ user: null, accessToken: null });
    }
  },

  initialize: async () => {
    try {
      // This will trigger the interceptor to use the refresh cookie
      const user = await getMeApi();
      set({ user, isLoading: false });
    } catch {
      set({ user: null, accessToken: null, isLoading: false });
    }
  },
}));
