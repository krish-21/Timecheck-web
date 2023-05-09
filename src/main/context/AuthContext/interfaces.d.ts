export interface AuthStateInterface {
  isRestoringTokens: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthContextInterface {
  restoreAuthTokens: () => Promise<void>;
  setAuthTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  removeAuthTokens: () => Promise<void>;
  getAccessToken: () => string;
  getRefreshToken: () => string;
}
