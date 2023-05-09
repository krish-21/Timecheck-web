export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthMutationData {
  username: string;
  password: string;
}

export interface LogoutMutationData {
  axiosInstance: AxiosInstance;
}

export interface LogoutResponse {
  message: string;
}
