import type { AxiosError, AxiosRequestConfig } from "axios";

export type QueryObjectValue = string | number | boolean | null | undefined;

export type QueryObject = Record<string, QueryObjectValue | QueryObjectValue[]>;

export type HTTPError = {
  statusCode: number;
  message: string | string[];
  error: string;
  type?: string;
};

export type QueryError<TData = unknown> = AxiosError<HTTPError, TData>;

export type GetRequestParams<TQuery extends QueryObject, THeaders> = {
  query?: TQuery;
  headers?: THeaders;
};

export type MutationRequestParams<TData, THeaders> = {
  data?: TData;
  headers?: THeaders;
};

export type SendMutationRequestParams<TData, THeaders> = MutationRequestParams<
  TData,
  THeaders
> & {
  method: "post" | "delete" | "put";
};

export type HeadersType = AxiosRequestConfig["headers"];
