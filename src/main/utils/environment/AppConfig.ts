class AppConfig {
  public env: string;
  public apiHost: string;

  constructor(env: NodeJS.ProcessEnv, API_HOST: string | undefined) {
    this.env = env["NODE_ENV"] === undefined ? "development" : env["NODE_ENV"];
    this.apiHost =
      API_HOST === undefined || API_HOST === ""
        ? "http://127.0.0.1:8000"
        : API_HOST;
  }
}

export const appConfig = new AppConfig(
  process.env,
  process.env.REACT_APP_API_HOST
);
