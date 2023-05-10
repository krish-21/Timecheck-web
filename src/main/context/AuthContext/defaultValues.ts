import type {
  AuthStateInterface,
  AuthContextInterface,
} from "main/context/AuthContext/interfaces";

export const defaultAuthState: AuthStateInterface = {
  userId: "",
  isRestoringTokens: true,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

export const defaultAuthContext: AuthContextInterface = {
  userId: "",
  isRestoringTokens: true,
  isAuthenticated: false,

  restoreAuthTokens: () => {
    throw new Error("INSIDE DEFAULT restoreAuthTokens!");
  },
  setAuthData: (
    _userId: string,
    _accessToken: string,
    _refreshToken: string
  ) => {
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
