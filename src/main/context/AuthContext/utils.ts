import { AuthActionKind } from "main/context/AuthContext/enums";
import type { AuthAction } from "main/context/AuthContext/types";
import type { AuthStateInterface } from "main/context/AuthContext/interfaces";

export const authReducer = (
  prevState: AuthStateInterface,
  action: AuthAction
): AuthStateInterface => {
  switch (action.type) {
    case AuthActionKind.SET_INVALID_TOKENS:
      return {
        ...prevState,
        isRestoringTokens: false,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
      };
    case AuthActionKind.SET_STORED_REFRESH_TOKEN:
      return {
        ...prevState,
        isRestoringTokens: true,
        isAuthenticated: true,
        accessToken: null,
        refreshToken: action.payload.refreshToken,
      };
    case AuthActionKind.SET_TOKENS:
      return {
        ...prevState,
        isRestoringTokens: false,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case AuthActionKind.REMOVE_TOKENS:
      return {
        ...prevState,
        isRestoringTokens: false,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
      };
  }
};

export const validateTokens = (
  _accessTokenValue: string,
  _refreshTokenValue: string
): void => {
  return;
};
