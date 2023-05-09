import type { DefaultError } from "main/utils/errors/interfaces";

import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "main/routes/Authentication/AuthForm/constants";

export const validateUsername = (username: string): DefaultError => {
  if (username.length < USERNAME_MIN_LENGTH) {
    return {
      isError: true,
      message: `Username cannot be shorter than ${USERNAME_MIN_LENGTH} characters`,
    };
  }

  if (username.length > USERNAME_MAX_LENGTH) {
    return {
      isError: true,
      message: `Username cannot be longer than ${USERNAME_MAX_LENGTH} characters`,
    };
  }

  return {
    isError: false,
    message: "",
  };
};

export const validatePassword = (
  password: string,
  isLoginForm: boolean
): DefaultError => {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      isError: true,
      message: `Password cannot be shorter than ${PASSWORD_MIN_LENGTH} characters`,
    };
  }

  if (password.length > PASSWORD_MAX_LENGTH) {
    return {
      isError: true,
      message: `Password cannot be longer than ${PASSWORD_MAX_LENGTH} characters`,
    };
  }

  if (isLoginForm) {
    return {
      isError: false,
      message: "",
    };
  }

  if (password.search(/[a-z]/) < 0) {
    return {
      isError: true,
      message: "Password must contain lowercase characters",
    };
  }

  if (password.search(/[A-Z]/) < 0) {
    return {
      isError: true,
      message: "Password must contain uppercase characters",
    };
  }

  if (password.search(/[0-9]/) < 0) {
    return {
      isError: true,
      message: "Password must contain digits",
    };
  }

  if (password.search(/[!@#$%^&*]/) < 0) {
    return {
      isError: true,
      message: "Password must contain special characters",
    };
  }

  return {
    isError: false,
    message: "",
  };
};

export const validateForm = (
  username: string,
  password: string,
  isLoginForm: boolean
): DefaultError => {
  if (
    validateUsername(username).isError ||
    validatePassword(password, isLoginForm).isError
  ) {
    return {
      isError: true,
      message: "",
    };
  }

  return {
    isError: false,
    message: "",
  };
};
