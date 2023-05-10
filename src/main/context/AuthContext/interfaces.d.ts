export interface AuthStateInterface {
  userId: string;
  isRestoringTokens: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthContextInterface {
  authState: AuthStateInterface;
  restoreAuthTokens: () => Promise<void>;
  setAuthData: (
    userId: string,
    accessToken: string,
    refreshToken: string
  ) => Promise<void>;
  removeAuthTokens: () => Promise<void>;
}
