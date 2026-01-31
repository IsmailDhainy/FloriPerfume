import axios from "axios";

import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import { CreateProductFormSchemaType } from "$/pages/dashboard/products/form/zod.validation";
import {
  ProductAllTypesResponse,
  ProductDynamicTypesResponse,
  ProductResponseType,
  ProductTableResponseType,
  ProductTableResponseTypeDashboard,
  ProductTableType,
  ProductTypeEnum,
} from "$/types/native/product.types";
import { Pagination } from "$/types/native/utils.types";

import { ParamsExtendedType, ParamsRecordType } from "../contacts/contacts.api";
import { uploadFile } from "../media/upload-files";
import { restApiClient } from "../restApiClient";

const baseUrl = import.meta.env.VITE_BASE_API_URL;

interface GetAllProductsParams
  extends Record<
    string,
    string | number | number[] | null | boolean | undefined
  > {
  page?: number;
  limit?: number;
  search?: string | null;
  sort?: "asc" | "desc";
  sortBy?: string;
  type?: string;
  categoryIds?: number[];
  brandIds?: number[];
  onSale?: boolean;
}

export const getAllProducts = async (
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<ProductTableResponseTypeDashboard>,
) => {
  const params: ParamsExtendedType<ProductTableResponseType> = {};

  if (pagination) {
    params.page = pagination.offset + 1;
    params.limit = pagination.limit;
  }

  if (sorting) {
    params.sortBy = sorting.key as string;
    params.sort = sorting.order;
  }

  const data = await restApiClient.get<ProductTableResponseTypeDashboard>(
    "/product",
    {
      query: params as ParamsRecordType,
    },
  );

  return data;
};

export const getAllProductsByType = async (
  type?: ProductTypeEnum,
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<ProductTableResponseTypeDashboard>,
  categoryIds?: number[],
  brandIds?: number[],
  onSale?: boolean,
) => {
  const params: GetAllProductsParams = {};

  // Add type filter
  if (type) params.type = type;

  // Add pagination
  if (pagination) {
    params.page = pagination.offset + 1;
    params.limit = pagination.limit;
  }

  // Add sorting
  if (sorting) {
    params.sortBy = sorting.key as string;
    params.sort = sorting.order;
  }
  if (categoryIds && categoryIds.length > 0) {
    params.categoryIds = categoryIds;
  }

  if (brandIds && brandIds.length > 0) {
    params.brandIds = brandIds;
  }

  if (onSale) {
    params.onSale = Boolean(onSale);
  }

  const data = await restApiClient.get<ProductTableResponseTypeDashboard>(
    "/product/type",
    {
      query: params,
    },
  );

  return data;
};

export const getAllTypeProducts = async (
  type?: ProductTypeEnum,
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<ProductTableResponseTypeDashboard>,
  categoryIds?: number[],
  brandIds?: number[],
) => {
  const params: GetAllProductsParams = {};

  // Add type filter
  if (type) params.type = type;

  // Add pagination
  if (pagination) {
    params.page = pagination.offset + 1;
    params.limit = pagination.limit;
  }

  // Add sorting
  if (sorting) {
    params.sortBy = sorting.key as string;
    params.sort = sorting.order;
  }
  if (categoryIds && categoryIds.length > 0) {
    params.categoryIds = categoryIds;
  }

  if (brandIds && brandIds.length > 0) {
    params.brandIds = brandIds;
  }

  const data = await restApiClient.get<ProductAllTypesResponse>(
    "/product/all-types",
    {
      query: params,
    },
  );

  return data;
};

export const getAllDynamicTypeProducts = async () => {
  const data = await restApiClient.get<ProductDynamicTypesResponse>(
    "/product/dynamic-types",
  );
  return data;
};

export const getHighestPrice = async () => {
  const data = await restApiClient.get<number>("/product/highest-price");
  return data;
};

export const createProduct = async (data: CreateProductFormSchemaType) => {
  let images,
    imageUrls: string[] = [];

  if (data && Array.isArray(data.image) && data.image.length !== 0) {
    images = data.image as File[];

    imageUrls = await Promise.all(
      images.map((file) => {
        return uploadFile(file, "product-images");
      }),
    );
  }

  const payload = {
    ...data,
    image: imageUrls,
  };

  if (payload.brandId === 0 || payload.brandId === undefined) {
    delete payload.brandId;
  }
  if (!payload.description || payload.description.trim() === "") {
    delete payload.description;
  }
  if (!payload.sku || payload.sku.trim() === "") {
    delete payload.sku;
  }

  const response = await axios.post<ProductTableType>(
    `${baseUrl}/product`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
  );

  return response;
};

export const getOne = async (id: number) => {
  const data = await restApiClient.get<ProductResponseType>(`/product/${id}`);

  return data;
};

export const getOneDashboard = async (id: number) => {
  const data = await restApiClient.get<ProductResponseType>(
    `/product/dashboard/${id}`,
  );

  return data;
};

export const editProduct = async (
  id: number,
  data: CreateProductFormSchemaType,
) => {
  // Handle multiple images
  const images = data.image as File[];
  const imageUrls: string[] = [];

  if (data && Array.isArray(data.image) && data.image.length !== 0) {
    for (const image of images) {
      // @ts-expect-error: Check for custom previewUrl property
      if (image.previewUrl) {
        // Existing image - use the preview URL
        // @ts-expect-error: Access custom property
        imageUrls.push(image.previewUrl);
      } else {
        // New image - upload it
        const uploadedUrl = await uploadFile(image, "product-images");
        imageUrls.push(uploadedUrl);
      }
    }
  }

  // Create payload with processed images
  const payload = {
    ...data,
    image: imageUrls,
  };

  // Clean up empty/zero values
  if (payload.brandId === 0 || payload.brandId === undefined) {
    delete payload.brandId;
  }
  if (!payload.description || payload.description.trim() === "") {
    delete payload.description;
  }
  if (!payload.sku || payload.sku.trim() === "") {
    delete payload.sku;
  }

  const response = await axios.put<ProductTableType>(
    `${baseUrl}/product/${id}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
  );

  return response;
};

export const remove = async (id: number) => {
  return await restApiClient.delete<boolean>(`/product/${id}`);
};
