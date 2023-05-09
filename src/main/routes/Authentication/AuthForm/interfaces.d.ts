import type { DefaultError } from "main/utils/errors/interfaces";

export interface AuthFormStateInterface {
  isLoginForm: boolean;
  username: string;
  usernameError: DefaultError;
  password: string;
  passwordError: DefaultError;
  serverError: DefaultError;
}
