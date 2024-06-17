import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpClient } from './http.utils';
import settings from './settings';

export default class ApiHttpClient extends HttpClient {
    constructor(options?: AxiosRequestConfig) {
        const token = window.localStorage.getItem('token');

        super({
            baseURL: options?.baseURL || settings.ENDPOINT_URL,
            headers: token
                ? {
                      'x-dev-token': token,
                  }
                : undefined,
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
