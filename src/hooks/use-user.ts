import { useMutation } from "@tanstack/react-query";
import { updateMeApi } from "@/api/users";
import { useAuthStore } from "@/stores";
import type { UserUpdateRequest } from "@/types";

export function useUpdateMe() {
  return useMutation({
    mutationFn: (data: UserUpdateRequest) => updateMeApi(data),
    onSuccess: (updatedUser) => {
      useAuthStore.setState({ user: updatedUser });
    },
  });
}
