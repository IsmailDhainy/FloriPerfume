import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import { CreateCategoryFormSchemaType } from "$/pages/dashboard/categories/form/zod.validation";
import {
  CategoryResponseType,
  CategoryTableResponseTypeDashboard,
  CategoryTableType,
} from "$/types/native/category.types";
import { Pagination } from "$/types/native/utils.types";

import { ParamsExtendedType, ParamsRecordType } from "../contacts/contacts.api";
import { uploadFile } from "../media/upload-files";
import { restApiClient } from "../restApiClient";

export const getAllCategories = async (
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<CategoryTableResponseTypeDashboard>,
) => {
  const params: ParamsExtendedType<CategoryTableResponseTypeDashboard> = {};

  if (pagination) {
    params.page = pagination.offset + 1;
    params.limit = pagination.limit;
  }

  if (sorting) {
    params.sortBy = sorting.key as string;
    params.sort = sorting.order;
  }

  const data = await restApiClient.get<CategoryTableResponseTypeDashboard>(
    "/category",
    {
      query: params as ParamsRecordType,
    },
  );

  return data;
};

export const createCategory = async (data: CreateCategoryFormSchemaType) => {
  let imageUrl = "";

  if (data.image) {
    imageUrl = await uploadFile(data.image as File, "category-images");
  }

  return restApiClient.post<CategoryTableType, CreateCategoryFormSchemaType>(
    "/category",
    {
      data: {
        ...data,
        image: imageUrl,
      },
    },
  );
};

export const getOne = async (id: number) => {
  const data = await restApiClient.get<CategoryResponseType>(`/category/${id}`);

  return data;
};

export const editCategory = async (
  id: number,
  data: CreateCategoryFormSchemaType,
) => {
  if (data.image === undefined) {
    data = { ...data, image: null };
  } else {
    if (data.image.previewUrl) {
      data = { ...data, image: data.image.preview };
    } else {
      const imageUrl = await uploadFile(data.image as File, "category-images");
      data = { ...data, image: imageUrl };
    }
  }
  return await restApiClient.put<
    CategoryResponseType,
    CreateCategoryFormSchemaType
  >(`/category/${id}`, {
    data,
  });
};

export const remove = async (id: number) => {
  return await restApiClient.delete<boolean>(`/category/${id}`);
};

export const getAllAdminCategoriesDashboard = async (
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<CategoryTableResponseTypeDashboard>,
) => {
  const params: ParamsExtendedType<CategoryTableResponseTypeDashboard> = {};

  if (pagination) {
    params.page = pagination.offset + 1;
    params.limit = pagination.limit;
  }

  if (sorting) {
    params.sortBy = sorting.key as string;
    params.sort = sorting.order;
  }

  const data = await restApiClient.get<CategoryTableResponseTypeDashboard>(
    "/category/dashboard",
    {
      query: params as ParamsRecordType,
    },
  );

  return data;
};
