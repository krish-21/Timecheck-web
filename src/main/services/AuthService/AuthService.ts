import { HTTPBaseService } from "main/services/Base/BaseHTTPService";
import type { AuthResponse } from "main/services/AuthService/interfaces";

class AuthService extends HTTPBaseService {
  private static classInstance?: AuthService;

  public static getInstance(): AuthService {
    if (this.classInstance === undefined) {
      this.classInstance = new AuthService();
    }
    return this.classInstance;
  }

  public async postRegister(
    username: string,
    password: string
  ): Promise<AuthResponse> {
    const { data } = await this.instance.post<AuthResponse>("/auth/register", {
      username,
      password,
    });
    return data;
  }

  public async postLogin(
    username: string,
    password: string
  ): Promise<AuthResponse> {
    const { data } = await this.instance.post<AuthResponse>("/auth/login", {
      username,
      password,
    });
    return data;
  }

  public async postRefresh(refreshToken: string): Promise<AuthResponse> {
    const { data } = await this.instance.post<AuthResponse>("/auth/refresh", {
      refreshToken,
    });
    return data;
  }
}

export const authService = AuthService.getInstance();
