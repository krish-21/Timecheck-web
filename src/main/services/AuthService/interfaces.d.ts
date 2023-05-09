export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthMutationData {
  username: string;
  password: string;
}
