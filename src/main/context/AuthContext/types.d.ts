import type { AuthActionKind } from "main/context/AuthContext/enums";

export type AuthAction =
  | {
      type: AuthActionKind.SET_INVALID_TOKENS;
    }
  | {
      type: AuthActionKind.SET_STORED_REFRESH_TOKEN;
      payload: { refreshToken: string | null };
    }
  | {
      type: AuthActionKind.SET_USER_ID;
      payload: { userId: string };
    }
  | {
      type: AuthActionKind.SET_TOKENS;
      payload: { accessToken: string | null; refreshToken: string | null };
    }
  | { type: AuthActionKind.REMOVE_TOKENS };
