import type { DefaultError } from "main/utils/errors/interfaces";

export interface WatchFormStateInterface {
  name: string;
  nameError: DefaultError;
  brand: string;
  brandError: DefaultError;
  reference: string;
  referenceError: DefaultError;
  serverError: DefaultError;
}
