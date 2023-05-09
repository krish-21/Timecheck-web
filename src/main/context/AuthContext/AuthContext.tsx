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
    let accessToken: null | string = null;
    let refreshToken: null | string = null;

    try {
      accessToken = localStorage.getItem(AuthTokenKind.ACCESS_TOKEN);
      refreshToken = localStorage.getItem(AuthTokenKind.REFRESH_TOKEN);
    } catch (error) {}

    if (accessToken === null || refreshToken === null) {
      authDispatch({
        type: AuthActionKind.SET_INVALID_TOKENS,
      });
      return;
    }

    validateTokens(accessToken, refreshToken);

    authDispatch({
      type: AuthActionKind.SET_STORED_REFRESH_TOKEN,
      payload: { refreshToken },
    });
  };

  const setAuthTokens = async (
    accessToken: string,
    refreshToken: string
  ): Promise<void> => {
    validateTokens(accessToken, refreshToken);

    localStorage.setItem(AuthTokenKind.ACCESS_TOKEN, accessToken);
    localStorage.setItem(AuthTokenKind.REFRESH_TOKEN, refreshToken);

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

  const getAccessToken = (): string => {
    return authState.accessToken !== null ? authState.accessToken : "";
  };

  const getRefreshToken = (): string => {
    return authState.refreshToken !== null ? authState.refreshToken : "";
  };

  return (
    <AuthContext.Provider
      value={{
        restoreAuthTokens,
        setAuthTokens,
        removeAuthTokens,
        getAccessToken,
        getRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };