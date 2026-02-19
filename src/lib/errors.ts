import { AxiosError } from "axios";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Что-то пошло не так",
): string {
  if (!(error instanceof AxiosError) || !error.response?.data) {
    return fallback;
  }

  const detail = error.response.data.detail;

  if (typeof detail === "string") {
    return detail;
  }

  // Pydantic validation error array format
  if (Array.isArray(detail)) {
    return detail
      .map((e: { msg?: string }) => e.msg ?? String(e))
      .join("; ");
  }

  return fallback;
}
