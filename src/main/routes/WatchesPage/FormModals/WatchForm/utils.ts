import type { DefaultError } from "main/utils/errors/interfaces";

import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  BRAND_MIN_LENGTH,
  BRAND_MAX_LENGTH,
  REFERENCE_MIN_LENGTH,
  REFERENCE_MAX_LENGTH,
} from "main/routes/WatchesPage/FormModals/WatchForm/constants";

export const validateName = (name: string): DefaultError => {
  if (name.length < NAME_MIN_LENGTH) {
    return {
      isError: true,
      message: `Name cannot be shorter than ${NAME_MIN_LENGTH} characters`,
    };
  }

  if (name.length > NAME_MAX_LENGTH) {
    return {
      isError: true,
      message: `Name cannot be longer than ${NAME_MAX_LENGTH} characters`,
    };
  }

  return {
    isError: false,
    message: "",
  };
};

export const validateBrand = (brand: string): DefaultError => {
  if (brand.length < BRAND_MIN_LENGTH) {
    return {
      isError: true,
      message: `Brand cannot be shorter than ${BRAND_MIN_LENGTH} characters`,
    };
  }

  if (brand.length > BRAND_MAX_LENGTH) {
    return {
      isError: true,
      message: `Brand cannot be longer than ${BRAND_MAX_LENGTH} characters`,
    };
  }

  return {
    isError: false,
    message: "",
  };
};

export const validateReference = (reference: string): DefaultError => {
  if (reference.length < REFERENCE_MIN_LENGTH) {
    return {
      isError: true,
      message: `Reference cannot be shorter than ${REFERENCE_MIN_LENGTH} characters`,
    };
  }

  if (reference.length > REFERENCE_MAX_LENGTH) {
    return {
      isError: true,
      message: `Reference cannot be longer than ${REFERENCE_MAX_LENGTH} characters`,
    };
  }

  return {
    isError: false,
    message: "",
  };
};

export const validateForm = (
  name: string,
  brand: string,
  reference: string
): DefaultError => {
  if (
    validateName(name).isError ||
    validateBrand(brand).isError ||
    validateReference(reference).isError
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
