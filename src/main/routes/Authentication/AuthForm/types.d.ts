import { AuthFormActionKind } from "main/routes/Authentication/AuthForm/enums";

export type AuthFormAction =
  | {
      type: AuthFormActionKind.UPDATE_USERNAME;
      payload: { username: string };
    }
  | {
      type: AuthFormActionKind.UPDATE_PASSWORD;
      payload: { password: string };
    }
  | {
      type: AuthFormActionKind.SET_SERVER_ERROR;
      payload: { message: string };
    }
  | {
      type: AuthFormActionKind.VALIDATE_FORM;
    }
  | {
      type: AuthFormActionKind.RESET_FORM;
    };
