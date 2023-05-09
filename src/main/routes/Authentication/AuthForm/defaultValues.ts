import type { AuthFormStateInterface } from "main/routes/Authentication/AuthForm/interfaces";

export const authFormDefaultValue: AuthFormStateInterface = {
  isLoginForm: false,
  username: "",
  usernameError: {
    isError: false,
    message: "",
  },
  password: "",
  passwordError: {
    isError: false,
    message: "",
  },
  serverError: {
    isError: false,
    message: "",
  },
};
