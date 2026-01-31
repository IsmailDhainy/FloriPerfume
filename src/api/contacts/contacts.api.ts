import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import { CreateContactFormSchemaType } from "$/pages/dashboard/contacts/form/zod.validation";
import {
  ContactResponseType,
  ContactTableResponseType,
  ContactTableResponseTypeDashboard,
  ContactTableType,
} from "$/types/native/contact.types";
import { QueryObjectValue } from "$/types/native/restApiClient.types";
import { Pagination } from "$/types/native/utils.types";

import { restApiClient } from "../restApiClient";

export type ParamsExtendedType<T> = Record<
  string,
  string | number | EnhancedTableSorting<T>
>;

export type ParamsRecordType = Record<
  string,
  QueryObjectValue | QueryObjectValue[]
>;

export const getAllContacts = async (
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<ContactTableResponseType>,
) => {
  const params: ParamsExtendedType<ContactTableResponseType> = {};

  if (pagination) {
    params.page = pagination.offset + 1;
    params.limit = pagination.limit;
  }

  if (sorting) {
    params.sortBy = sorting.key as string;
    params.sort = sorting.order;
  }

  const data = await restApiClient.get<ContactTableResponseType>("/contact", {
    query: params as ParamsRecordType,
  });

  return data;
};

export const getAllContactsDashboard = async (
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<ContactTableResponseTypeDashboard>,
) => {
  const params: ParamsExtendedType<ContactTableResponseTypeDashboard> = {};

  if (pagination) {
    params.page = pagination.offset + 1;
    params.limit = pagination.limit;
  }

  if (sorting) {
    params.sortBy = sorting.key as string;
    params.sort = sorting.order;
  }

  const data = await restApiClient.get<ContactTableResponseTypeDashboard>(
    "/contact",
    {
      query: params as ParamsRecordType,
    },
  );

  return data;
};

export const createConatct = async (data: CreateContactFormSchemaType) => {
  return restApiClient.post<ContactTableType, CreateContactFormSchemaType>(
    "/contact",
    {
      data,
    },
  );
};

export const getOne = async (id: number) => {
  const data = await restApiClient.get<ContactResponseType>(`/contact/${id}`);

  return data;
};
