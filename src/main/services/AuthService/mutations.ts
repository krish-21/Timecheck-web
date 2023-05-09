import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { authService } from "main/services/AuthService/AuthService";

import type {
  AuthResponse,
  AuthMutationData,
} from "main/services/AuthService/interfaces";

export const usePostRegisterMutation = (): UseMutationResult<
  AuthResponse,
  unknown,
  AuthMutationData,
  unknown
> => {
  return useMutation({
    mutationKey: ["register", "auth"],
    mutationFn: async (authData: AuthMutationData) => {
      return authService.postRegister(authData.username, authData.password);
    },
  });
};
