import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpClient } from "./http.utils";
import settings from "./settings";

export default class ApiHttpClient extends HttpClient {
  constructor(options?: AxiosRequestConfig) {
    const accessToken = localStorage.getItem("quyx_dev_access_token");
    const refreshToken = localStorage.getItem("quyx_dev_refresh_token");

    super({
      baseURL: options?.baseURL || settings.ENDPOINT_URL,
      headers: options?.headers
        ? options.headers
        : {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...(refreshToken ? { "X-Refresh": refreshToken } : {}),
          },
    });
  }

  _handleResponse({ data, status: statusCode }: AxiosResponse<any>) {
    return { error: false, statusCode, data };
  }

  _handleError(error: AxiosError<any>) {
    const response = {
      error: true,
      statusCode: error.response?.status,
      data: error.response?.data,
    };

    return response;
  }

  getInstance() {
    return this.instance;
  }

  getInstanceWithoutAuth() {
    return this.instanceWithoutAuth;
  }
}
