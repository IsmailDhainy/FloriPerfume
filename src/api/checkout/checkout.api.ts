import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import { CheckoutStatusFormSchemaType } from "$/pages/dashboard/orders/form/zod.validation";
import {
  Checkout,
  CheckoutTableResponseType,
} from "$/types/native/checkout.types";
import { Pagination } from "$/types/native/utils.types";

import { ParamsExtendedType, ParamsRecordType } from "../contacts/contacts.api";
import { restApiClient } from "../restApiClient";

export const createCheckout = async (data: Checkout) => {
  return restApiClient.post<Checkout, Checkout>("/checkout", {
    data: data,
  });
};

export const getOneById = async (id: number) => {
  const data = await restApiClient.get<Checkout>(`/checkout/${id}`);
  return data;
};

export const getAll = async (
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<CheckoutTableResponseType>,
) => {
  const params: ParamsExtendedType<CheckoutTableResponseType> = {};

  if (pagination) {
    params.page = pagination.offset + 1;
    params.limit = pagination.limit;
  }

  if (sorting) {
    params.sortBy = sorting.key as string;
    params.sort = sorting.order;
  }

  const data = await restApiClient.get<CheckoutTableResponseType>("/checkout", {
    query: params as ParamsRecordType,
  });

  return data;
};

export const getAllByUserId = async (
  id: number,
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<CheckoutTableResponseType>,
) => {
  const params: ParamsExtendedType<CheckoutTableResponseType> = {};

  if (pagination) {
    params.page = pagination.offset + 1;
    params.limit = pagination.limit;
  }

  if (sorting) {
    params.sortBy = sorting.key as string;
    params.sort = sorting.order;
  }

  const data = await restApiClient.get<CheckoutTableResponseType>(
    `/checkout/user/${id}`,
    {
      query: params as ParamsRecordType,
    },
  );

  return data;
};

export const editStatus = async (
  id: number,
  data: CheckoutStatusFormSchemaType,
) => {
  return restApiClient.put<
    CheckoutStatusFormSchemaType,
    CheckoutStatusFormSchemaType
  >(`/checkout/status/${id}`, {
    data,
  });
};
