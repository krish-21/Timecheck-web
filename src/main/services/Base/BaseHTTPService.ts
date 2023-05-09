import axios, {
  type AxiosRequestConfig,
  type AxiosInstance,
  type AxiosError,
} from "axios";
import { appConfig } from "main/utils/environment/AppConfig";

export abstract class HTTPBaseService {
  protected readonly baseURL: string;
  protected instance: AxiosInstance;

  constructor() {
    this.baseURL = appConfig.apiHost;
    this.instance = axios.create({ baseURL: this.baseURL });

    this.initializeRequestInterceptor();

    this.initializeResponseInterceptor();
  }

  private readonly initializeRequestInterceptor = (): void => {
    this.instance.interceptors.request.use(this.handleRequest);
  };

  private readonly initializeResponseInterceptor = (): void => {
    this.instance.interceptors.response.use((response) => {
      return response;
    }, this.handleError);
  };

  private readonly handleRequest = (
    config: AxiosRequestConfig
  ): AxiosRequestConfig => {
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  };

  private readonly handleError = async (error: AxiosError): Promise<never> => {
    if (error.response?.status === 401) {
      //   Logout User
    }
    return Promise.reject(error);
  };
}
