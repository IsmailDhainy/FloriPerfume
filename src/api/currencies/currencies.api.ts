import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import { CreateCurrencyFormSchemaType } from "$/pages/dashboard/currencies/form/zod.validation";
import {
  CurrencyResponseType,
  CurrencyTableResponseType,
  CurrencyTableType,
} from "$/types/native/currency.types";
import { Pagination } from "$/types/native/utils.types";

import { ParamsExtendedType, ParamsRecordType } from "../contacts/contacts.api";
import { restApiClient } from "../restApiClient";

export const getAllCurrencies = async (
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<CurrencyTableResponseType>,
) => {
  const params: ParamsExtendedType<CurrencyTableResponseType> = {};

  if (pagination) {
    params.page = pagination.offset + 1;
    params.limit = pagination.limit;
  }

  if (sorting) {
    params.sortBy = sorting.key as string;
    params.sort = sorting.order;
  }

  const data = await restApiClient.get<CurrencyTableResponseType>("/currency", {
    query: params as ParamsRecordType,
  });

  return data;
};

export const createCurrency = async (data: CreateCurrencyFormSchemaType) => {
  return restApiClient.post<CurrencyTableType, CreateCurrencyFormSchemaType>(
    "/currency",
    {
      data,
    },
  );
};

export const getOne = async (id: number) => {
  const data = await restApiClient.get<CurrencyResponseType>(`/currency/${id}`);

  return data;
};

export const getDefaultOne = async () => {
  const data =
    await restApiClient.get<CurrencyResponseType>(`/currency/default`);
  return data;
};

export const editCurrency = async (
  id: number,
  data: CreateCurrencyFormSchemaType,
) => {
  return restApiClient.put<CurrencyResponseType, CreateCurrencyFormSchemaType>(
    `/currency/${id}`,
    {
      data,
    },
  );
};

export const remove = async (id: number) => {
  return restApiClient.delete<boolean>(`/currency/${id}`);
};
