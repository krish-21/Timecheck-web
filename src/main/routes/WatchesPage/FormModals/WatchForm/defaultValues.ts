import type { WatchFormStateInterface } from "main/routes/WatchesPage/FormModals/WatchForm/interfaces";

export const watchFormDefaultValue: WatchFormStateInterface = {
  name: "",
  nameError: {
    isError: false,
    message: "",
  },
  brand: "",
  brandError: {
    isError: false,
    message: "",
  },
  reference: "",
  referenceError: {
    isError: false,
    message: "",
  },
  serverError: {
    isError: false,
    message: "",
  },
};
