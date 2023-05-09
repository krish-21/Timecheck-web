export interface AuthStateInterface {
  isRestoringTokens: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthContextInterface {
  isRestoringTokens: boolean;
  isAuthenticated: boolean;
  restoreAuthTokens: () => Promise<void>;
  setAuthTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  removeAuthTokens: () => Promise<void>;
  getAccessToken: () => string;
  getRefreshToken: () => string;
}
