import type { AxiosInstance } from "axios";

export interface AxiosContextInterface {
  publicAxios: AxiosInstance;
  authAxios: AxiosInstance;
}
