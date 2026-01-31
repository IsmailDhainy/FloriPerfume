import { WhihlistResponseType } from "$/types/native/whishlist.types";

import { restApiClient } from "../restApiClient";

export const createWhislist = async (data: {
  productId: number;
  userId: number;
}) => {
  return restApiClient.post<
    WhihlistResponseType,
    { productId: number; userId: number }
  >("/whishlist", {
    data: data,
  });
};

export const remove = async (productId: number, userId: number) => {
  return restApiClient.delete<boolean>(`/whishlist/${productId}/${userId}`);
};

export const getByUserId = async (userId: number) => {
  const data = await restApiClient.get<WhihlistResponseType>(
    `/whishlist/${userId}`,
  );
  return data;
};
