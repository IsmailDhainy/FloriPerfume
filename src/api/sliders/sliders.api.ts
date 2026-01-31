import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import { CreateSliderFormSchemaType } from "$/pages/dashboard/sliders/form/zod.validation";
import {
  SliderResponseType,
  SliderTableResponseTypeDashboard,
  SliderTableType,
} from "$/types/native/slider.types";
import { Pagination } from "$/types/native/utils.types";

import { ParamsExtendedType, ParamsRecordType } from "../contacts/contacts.api";
import { uploadFile } from "../media/upload-files";
import { restApiClient } from "../restApiClient";

export const getSliders = async (
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<SliderTableResponseTypeDashboard>,
) => {
  const params: ParamsExtendedType<SliderTableResponseTypeDashboard> = {};

  if (pagination) {
    params.page = pagination.offset + 1;
    params.limit = pagination.limit;
  }

  if (sorting) {
    params.sortBy = sorting.key as string;
    params.sort = sorting.order;
  }

  const data = await restApiClient.get<SliderTableResponseTypeDashboard>(
    "/slider",
    {
      query: params as ParamsRecordType,
    },
  );

  return data;
};

export const createSlider = async (data: CreateSliderFormSchemaType) => {
  let imageUrl = "";
  if (data.image) {
    imageUrl = await uploadFile(data.image as File, "slider-images");
  }
  return restApiClient.post<SliderTableType, CreateSliderFormSchemaType>(
    "/slider",
    {
      data: {
        ...data,
        image: imageUrl,
      },
    },
  );
};

export const getOne = async (id: number) => {
  const data = await restApiClient.get<SliderResponseType>(`/slider/${id}`);

  return data;
};

export const editSlider = async (
  id: number,
  data: CreateSliderFormSchemaType,
) => {
  if (data.image === undefined) {
    data = { ...data, image: null };
  } else {
    if (data.image.previewUrl) {
      data = { ...data, image: data.image.preview };
    } else {
      const imageUrl = await uploadFile(data.image as File, "slider-images");
      data = { ...data, image: imageUrl };
    }
  }
  return await restApiClient.put<
    SliderResponseType,
    CreateSliderFormSchemaType
  >(`/slider/${id}`, {
    data,
  });
};

export const remove = async (id: number) => {
  return await restApiClient.delete<boolean>(`/slider/${id}`);
};
