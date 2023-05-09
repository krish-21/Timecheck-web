import { useContext } from "react";
import {
  useQueryClient,
  useMutation,
  type UseMutationResult,
} from "@tanstack/react-query";

import { AuthContext } from "main/context/AuthContext/AuthContext";

import { authService } from "main/services/AuthService/AuthService";

import type {
  AuthResponse,
  AuthMutationData,
  LogoutMutationData,
  LogoutResponse,
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

export const usePostLoginMutation = (): UseMutationResult<
  AuthResponse,
  unknown,
  AuthMutationData,
  unknown
> => {
  return useMutation({
    mutationKey: ["login", "auth"],
    mutationFn: async (authData: AuthMutationData) => {
      return authService.postLogin(authData.username, authData.password);
    },
  });
};

export const usePostLogoutMutation = (): UseMutationResult<
  LogoutResponse,
  unknown,
  LogoutMutationData,
  unknown
> => {
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);

  return useMutation({
    mutationKey: ["logout", "auth"],
    mutationFn: async (logoutMutationData) => {
      return authService.postLogout(logoutMutationData.axiosInstance);
    },
    onSettled: () => {
      void authContext.removeAuthTokens().then(() => {
        void queryClient.invalidateQueries();
        void queryClient.clear();
      });
    },
  });
};
