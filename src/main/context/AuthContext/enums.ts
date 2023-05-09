export enum AuthActionKind {
  SET_INVALID_TOKENS = "SET_INVALID_TOKENS",
  SET_STORED_REFRESH_TOKEN = "SET_STORED_REFRESH_TOKEN",
  SET_TOKENS = "SET_TOKENS",
  REMOVE_TOKENS = "REMOVE_TOKENS",
}

export enum AuthTokenKind {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
}