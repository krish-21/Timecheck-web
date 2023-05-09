import axios from "axios";

import { appConfig } from "main/utils/environment/AppConfig";

import type { AxiosContextInterface } from "main/context/AxiosContext/interfaces";

export const defaultAxiosContext: AxiosContextInterface = {
  publicAxios: axios.create({ baseURL: appConfig.apiHost }),
  authAxios: axios.create({ baseURL: appConfig.apiHost }),
};
