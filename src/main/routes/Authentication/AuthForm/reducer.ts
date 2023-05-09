import { AuthFormActionKind } from "main/routes/Authentication/AuthForm/enums";
import type { AuthFormAction } from "main/routes/Authentication/AuthForm/types";
import { authFormDefaultValue } from "main/routes/Authentication/AuthForm/defaultValues";
import type { AuthFormStateInterface } from "main/routes/Authentication/AuthForm/interfaces";

import {
  validateUsername,
  validatePassword,
} from "main/routes/Authentication/AuthForm/utils";

export const authFormReducer = (
  prevState: AuthFormStateInterface,
  action: AuthFormAction
): AuthFormStateInterface => {
  switch (action.type) {
    case AuthFormActionKind.UPDATE_USERNAME: {
      return {
        ...prevState,
        username: action.payload.username,
        usernameError: validateUsername(action.payload.username),
        serverError: authFormDefaultValue.serverError,
      };
    }
    case AuthFormActionKind.UPDATE_PASSWORD: {
      return {
        ...prevState,
        password: action.payload.password,
        passwordError: validatePassword(
          action.payload.password,
          prevState.isLoginForm
        ),
        serverError: authFormDefaultValue.serverError,
      };
    }
    case AuthFormActionKind.VALIDATE_FORM: {
      return {
        ...prevState,
        usernameError: validateUsername(prevState.username),
        passwordError: validatePassword(
          prevState.password,
          prevState.isLoginForm
        ),
        serverError: authFormDefaultValue.serverError,
      };
    }
    case AuthFormActionKind.SET_SERVER_ERROR: {
      return {
        ...prevState,
        serverError: {
          isError: true,
          message: action.payload.message,
        },
      };
    }
    case AuthFormActionKind.RESET_FORM: {
      return authFormDefaultValue;
    }
  }
};
