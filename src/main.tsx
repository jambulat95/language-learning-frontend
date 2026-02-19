import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { setAuthStoreAccessor } from "@/api/client";
import { useAuthStore } from "@/stores";

setAuthStoreAccessor(() => ({
  accessToken: useAuthStore.getState().accessToken,
  setAccessToken: (token) => useAuthStore.setState({ accessToken: token }),
  clearAuth: () => useAuthStore.setState({ user: null, accessToken: null }),
}));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
