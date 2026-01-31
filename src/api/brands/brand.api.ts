import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import { CreateBrandFormSchemaType } from "$/pages/dashboard/brands/form/zod.validation";
import {
  BrandResponseType,
  BrandTableResponseTypeDashboard,
  BrandTableType,
} from "$/types/native/brand.types";
import { Pagination } from "$/types/native/utils.types";

import { ParamsExtendedType, ParamsRecordType } from "../contacts/contacts.api";
import { restApiClient } from "../restApiClient";

export const getAllBrands = async (
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<BrandTableResponseTypeDashboard>,
) => {
  const params: ParamsExtendedType<BrandTableResponseTypeDashboard> = {};

  if (pagination) {
    params.page = pagination.offset + 1;
    params.limit = pagination.limit;
  }

  if (sorting) {
    params.sortBy = sorting.key as string;
    params.sort = sorting.order;
  }

  const data = await restApiClient.get<BrandTableResponseTypeDashboard>(
    "/brand",
    {
      query: params as ParamsRecordType,
    },
  );

  return data;
};

export const getAllDashboardBrands = async (
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<BrandTableResponseTypeDashboard>,
) => {
  const params: ParamsExtendedType<BrandTableResponseTypeDashboard> = {};

  if (pagination) {
    params.page = pagination.offset + 1;
    params.limit = pagination.limit;
  }

  if (sorting) {
    params.sortBy = sorting.key as string;
    params.sort = sorting.order;
  }

  const data = await restApiClient.get<BrandTableResponseTypeDashboard>(
    "/brand/dashboard",
    {
      query: params as ParamsRecordType,
    },
  );

  return data;
};

export const createBrand = async (data: CreateBrandFormSchemaType) => {
  return restApiClient.post<BrandTableType, CreateBrandFormSchemaType>(
    "/brand",
    {
      data: data,
    },
  );
};

export const getOne = async (id: number) => {
  const data = await restApiClient.get<BrandResponseType>(`/brand/${id}`);

  return data;
};

export const editBrand = async (
  id: number,
  data: CreateBrandFormSchemaType,
) => {
  return await restApiClient.put<BrandResponseType, CreateBrandFormSchemaType>(
    `/brand/${id}`,
    {
      data,
    },
  );
};

export const remove = async (id: number) => {
  return await restApiClient.delete<boolean>(`/brand/${id}`);
};
