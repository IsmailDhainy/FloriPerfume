import type { AxiosError } from "axios";
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  ResponseType,
} from "axios";

import {
  GetRequestParams,
  HTTPError,
  HeadersType,
  MutationRequestParams,
  QueryObject,
  SendMutationRequestParams,
} from "../types/native/restApiClient.types";

class RestApiClient {
  private readonly client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      withCredentials: true,
    });
  }
  private async _refreshToken() {
    await this.client.post("/auth/refresh");
  }

  private _constructQueryUrl<TQuery extends QueryObject>(
    url: string,
    query?: TQuery,
  ) {
    if (!query) return url;

    // check for array values and convert them to a comma-separated string
    for (const key in query) {
      if (Array.isArray(query[key])) {
        query[key] = (query[key] as unknown[]).join(",") as TQuery[typeof key];
      }

      if (query[key] === undefined || query[key] === null) {
        delete query[key];
      }
    }

    return `${url}?${new URLSearchParams(
      query as Record<string, string>,
    ).toString()}`;
  }

  private async _sendMutationRequest<
    TResponse,
    TData,
    THeaders extends HeadersType,
  >(
    url: string,
    params: SendMutationRequestParams<TData, THeaders>,
    responseType?: ResponseType,
  ): Promise<TResponse> {
    const { method, data, headers } = params;

    try {
      const res = await this.client[method]<
        TResponse,
        AxiosResponse<TResponse, TData>
      >(url, data, { ...headers, withCredentials: true, responseType });

      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<HTTPError, TData>;

      if (
        axiosError.response?.status === 401 &&
        axiosError.response.data.type === "token_expired"
      ) {
        await this._refreshToken();
        return await this._sendMutationRequest<TResponse, TData, THeaders>(
          url,
          params,
        );
      }
      throw axiosError;
    }
  }

  async get<
    TResponse = unknown,
    TQuery extends QueryObject = QueryObject,
    THeaders extends HeadersType = HeadersType,
  >(
    url: string,
    params?: GetRequestParams<TQuery, THeaders>,
    responseType?: ResponseType,
  ): Promise<TResponse> {
    const { headers, query } = params || {};
    try {
      const requestUrl = this._constructQueryUrl(url, query);

      const res = await this.client.get<
        TResponse,
        AxiosResponse<TResponse, never>,
        never
      >(requestUrl, { headers, withCredentials: true, responseType });

      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<HTTPError, never>;
      if (
        axiosError.response?.status === 401 &&
        axiosError.response.data.type === "token_expired"
      ) {
        await this._refreshToken();
        return await this.get<TResponse, TQuery, THeaders>(url, params);
      }
      throw axiosError;
    }
  }

  async post<
    TResponse = unknown,
    TData = unknown,
    THeaders extends HeadersType = HeadersType,
  >(
    url: string,
    request?: MutationRequestParams<TData, THeaders>,
    responseType?: ResponseType,
  ) {
    return this._sendMutationRequest<TResponse, TData, THeaders>(
      url,
      {
        method: "post",
        ...request,
      },
      responseType,
    );
  }

  async put<
    TResponse = unknown,
    TData = unknown,
    THeaders extends HeadersType = HeadersType,
  >(url: string, request?: MutationRequestParams<TData, THeaders>) {
    return this._sendMutationRequest<TResponse, TData, THeaders>(url, {
      ...request,
      method: "put",
    });
  }

  async delete<
    TResponse = unknown,
    TData = unknown,
    THeaders extends HeadersType = HeadersType,
  >(url: string, request?: MutationRequestParams<TData, THeaders>) {
    return this._sendMutationRequest<TResponse, TData, THeaders>(url, {
      ...request,
      method: "delete",
    });
  }
}

export const restApiClient = new RestApiClient(
  import.meta.env.VITE_BASE_API_URL ?? "https://speedywebsite.com",
);
