export interface AuthStateInterface {
  userId: string;
  isRestoringTokens: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthContextInterface {
  userId: string;
  isRestoringTokens: boolean;
  isAuthenticated: boolean;
  restoreAuthTokens: () => Promise<void>;
  setAuthData: (
    userId: string,
    accessToken: string,
    refreshToken: string
  ) => Promise<void>;
  removeAuthTokens: () => Promise<void>;
  getAccessToken: () => string;
  getRefreshToken: () => string;
}
