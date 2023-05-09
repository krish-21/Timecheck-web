import type {
  AuthStateInterface,
  AuthContextInterface,
} from "main/context/AuthContext/interfaces";

export const defaultAuthState: AuthStateInterface = {
  isRestoringTokens: true,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

export const defaultAuthContext: AuthContextInterface = {
  isRestoringTokens: true,
  isAuthenticated: false,

  restoreAuthTokens: () => {
    throw new Error("INSIDE DEFAULT restoreAuthTokens!");
  },
  setAuthTokens: (_accessToken: string, _refreshToken: string) => {
    throw new Error("INSIDE DEFAULT setAuthTokens!");
  },
  removeAuthTokens: () => {
    throw new Error("INSIDE DEFAULT removeAuthTokens!");
  },
  getAccessToken: () => {
    throw new Error("INSIDE DEFAULT getAccessToken!");
  },
  getRefreshToken: () => {
    throw new Error("INSIDE DEFAULT getRefreshToken!");
  },
};
