import type { WatchFormAction } from "main/routes/WatchesPage/FormModals/WatchForm/types";
import type { WatchFormStateInterface } from "main/routes/WatchesPage/FormModals/WatchForm/interfaces";

import { WatchFormActionKind } from "main/routes/WatchesPage/FormModals/WatchForm/enums";
import { watchFormDefaultValue } from "main/routes/WatchesPage/FormModals/WatchForm/defaultValues";

import {
  validateName,
  validateBrand,
  validateReference,
} from "main/routes/WatchesPage/FormModals/WatchForm/utils";

export const authFormReducer = (
  prevState: WatchFormStateInterface,
  action: WatchFormAction
): WatchFormStateInterface => {
  switch (action.type) {
    case WatchFormActionKind.UPDATE_NAME: {
      return {
        ...prevState,
        name: action.payload.name,
        nameError: validateName(action.payload.name),
        serverError: watchFormDefaultValue.serverError,
      };
    }
    case WatchFormActionKind.UPDATE_BRAND: {
      return {
        ...prevState,
        brand: action.payload.brand,
        brandError: validateBrand(action.payload.brand),
        serverError: watchFormDefaultValue.serverError,
      };
    }
    case WatchFormActionKind.UPDATE_REFERENCE: {
      return {
        ...prevState,
        reference: action.payload.reference,
        referenceError: validateReference(action.payload.reference),
        serverError: watchFormDefaultValue.serverError,
      };
    }
    case WatchFormActionKind.VALIDATE_FORM: {
      return {
        ...prevState,
        nameError: validateName(prevState.name),
        brandError: validateBrand(prevState.brand),
        referenceError: validateReference(prevState.reference),
        serverError: watchFormDefaultValue.serverError,
      };
    }
    case WatchFormActionKind.SET_SERVER_ERROR: {
      return {
        ...prevState,
        serverError: {
          isError: true,
          message: action.payload.message,
        },
      };
    }
    case WatchFormActionKind.RESET_FORM: {
      return watchFormDefaultValue;
    }
  }
};
