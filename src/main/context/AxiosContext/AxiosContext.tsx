import axios from "axios";
import { createContext, useContext } from "react";

import { appConfig } from "main/utils/environment/AppConfig";

import { AuthContext } from "main/context/AuthContext/AuthContext";
import { defaultAxiosContext } from "main/context/AxiosContext/defaultValues";

import type { AxiosContextInterface } from "main/context/AxiosContext/interfaces";

interface Props {
  children: JSX.Element;
}

const AxiosContext = createContext<AxiosContextInterface>(defaultAxiosContext);

const AxiosProvider = ({ children }: Props): JSX.Element => {
  const authContext = useContext(AuthContext);

  const publicAxios = defaultAxiosContext.publicAxios;

  const authAxios = axios.create({
    baseURL: appConfig.apiHost,
  });

  publicAxios.interceptors.request.use(
    (config) => {
      config.headers = {
        ...config.headers,
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      return config;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  authAxios.interceptors.request.use(
    (config) => {
      config.headers = {
        ...config.headers,
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authContext.authState.accessToken}`,
      };

      return config;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <AxiosContext.Provider
      value={{
        publicAxios,
        authAxios,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

export { AxiosContext, AxiosProvider };
