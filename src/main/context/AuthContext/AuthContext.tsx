import { createContext, useReducer } from "react";

import { AuthActionKind, AuthTokenKind } from "main/context/AuthContext/enums";

import type { AuthContextInterface } from "main/context/AuthContext/interfaces";

import {
  defaultAuthState,
  defaultAuthContext,
} from "main/context/AuthContext/defaultValues";
import { authReducer, validateTokens } from "main/context/AuthContext/utils";

interface Props {
  children: JSX.Element;
}

const AuthContext = createContext<AuthContextInterface>(defaultAuthContext);

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [authState, authDispatch] = useReducer(authReducer, defaultAuthState);

  const restoreAuthTokens = async (): Promise<void> => {
    const accessToken = localStorage.getItem(AuthTokenKind.ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(AuthTokenKind.REFRESH_TOKEN);

    if (accessToken === null || refreshToken === null) {
      authDispatch({
        type: AuthActionKind.SET_INVALID_TOKENS,
      });
      return;
    }

    validateTokens(accessToken, refreshToken);

    authDispatch({
      type: AuthActionKind.SET_STORED_TOKENS,
      payload: { accessToken, refreshToken },
    });
  };

  const setAuthData = async (
    userId: string,
    accessToken: string,
    refreshToken: string
  ): Promise<void> => {
    validateTokens(accessToken, refreshToken);

    localStorage.setItem(AuthTokenKind.ACCESS_TOKEN, accessToken);
    localStorage.setItem(AuthTokenKind.REFRESH_TOKEN, refreshToken);

    authDispatch({
      type: AuthActionKind.SET_USER_ID,
      payload: { userId },
    });

    authDispatch({
      type: AuthActionKind.SET_TOKENS,
      payload: { accessToken, refreshToken },
    });
  };

  const removeAuthTokens = async (): Promise<void> => {
    localStorage.removeItem(AuthTokenKind.ACCESS_TOKEN);
    localStorage.removeItem(AuthTokenKind.REFRESH_TOKEN);

    authDispatch({
      type: AuthActionKind.REMOVE_TOKENS,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        restoreAuthTokens,
        setAuthData,
        removeAuthTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
