import { WatchFormActionKind } from "main/routes/WatchesPage/FormModals/WatchForm/enums";

export type WatchFormAction =
  | {
      type: WatchFormActionKind.UPDATE_NAME;
      payload: { name: string };
    }
  | {
      type: WatchFormActionKind.UPDATE_BRAND;
      payload: { brand: string };
    }
  | {
      type: WatchFormActionKind.UPDATE_REFERENCE;
      payload: { reference: string };
    }
  | {
      type: WatchFormActionKind.SET_SERVER_ERROR;
      payload: { message: string };
    }
  | {
      type: WatchFormActionKind.VALIDATE_FORM;
    }
  | {
      type: WatchFormActionKind.RESET_FORM;
    };
