import { useContext } from "react";
import {
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";

import { SECONDS, MILLISECONDS } from "main/utils/time/constants";
import { AuthContext } from "main/context/AuthContext/AuthContext";

import { authService } from "main/services/AuthService/AuthService";

export const usePostRefreshTokenQuery = (): UseQueryResult<
  undefined,
  unknown
> => {
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);
  const refreshToken = authContext.authState.refreshToken;
  const isRestoringTokens = authContext.authState.isRestoringTokens;
  const isAuthenticated = authContext.authState.isAuthenticated;

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["refresh-token"],
    queryFn: async () => {
      const data = await authService.postRefresh(
        refreshToken === null ? "" : refreshToken
      );

      await authContext.setAuthData(
        data.userId,
        data.tokens.accessToken,
        data.tokens.refreshToken
      );

      return null;
    },
    enabled: !isRestoringTokens && isAuthenticated && refreshToken !== "",
    retry: isRestoringTokens ? 1 : 3,
    refetchInterval:
      (SECONDS.FIVE_HOURS + SECONDS.HALF_AN_HOUR) * MILLISECONDS.SECONDS,
    onError: () => {
      void authContext.removeAuthTokens();
      void queryClient.invalidateQueries();
      void queryClient.clear();
    },
  });
};
