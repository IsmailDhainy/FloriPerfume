import { SettingFormSchemaType } from "$/pages/dashboard/settings/form/zod.validation";
import { SettingsResponseType } from "$/types/native/settings.types";

import { uploadFile } from "../media/upload-files";
import { restApiClient } from "../restApiClient";

export const getOne = async () => {
  const data = await restApiClient.get<SettingsResponseType>(`/settings`);
  return data;
};

export const editSettings = async (data: SettingFormSchemaType) => {
  const processedData: any = { ...data };

  // Process productBanner
  if (data.productBanner !== undefined) {
    if (data.productBanner.previewUrl) {
      processedData.productBanner = data.productBanner.previewUrl;
    } else {
      processedData.productBanner = await uploadFile(
        data.productBanner as File,
        "settings-images",
      );
    }
  } else {
    processedData.productBanner = null; // Set to null if removed
  }

  // Process categoryBanner
  if (data.categoryBanner !== undefined) {
    if (data.categoryBanner.previewUrl) {
      processedData.categoryBanner = data.categoryBanner.previewUrl;
    } else {
      processedData.categoryBanner = await uploadFile(
        data.categoryBanner as File,
        "settings-images",
      );
    }
  } else {
    processedData.categoryBanner = null;
  }

  // Process cartBanner
  if (data.cartBanner !== undefined) {
    if (data.cartBanner.previewUrl) {
      processedData.cartBanner = data.cartBanner.previewUrl;
    } else {
      processedData.cartBanner = await uploadFile(
        data.cartBanner as File,
        "settings-images",
      );
    }
  } else {
    processedData.cartBanner = null;
  }

  // Process checkoutBanner
  if (data.checkoutBanner !== undefined) {
    if (data.checkoutBanner.previewUrl) {
      processedData.checkoutBanner = data.checkoutBanner.previewUrl;
    } else {
      processedData.checkoutBanner = await uploadFile(
        data.checkoutBanner as File,
        "settings-images",
      );
    }
  } else {
    processedData.checkoutBanner = null;
  }

  // Process accountBanner
  if (data.accountBanner !== undefined) {
    if (data.accountBanner.previewUrl) {
      processedData.accountBanner = data.accountBanner.previewUrl;
    } else {
      processedData.accountBanner = await uploadFile(
        data.accountBanner as File,
        "settings-images",
      );
    }
  } else {
    processedData.accountBanner = null;
  }

  // Process contactUsBanner
  if (data.contactUsBanner !== undefined) {
    if (data.contactUsBanner.previewUrl) {
      processedData.contactUsBanner = data.contactUsBanner.previewUrl;
    } else {
      processedData.contactUsBanner = await uploadFile(
        data.contactUsBanner as File,
        "settings-images",
      );
    }
  } else {
    processedData.contactUsBanner = null;
  }

  // Process productDetailBanner
  if (data.productDetailBanner !== undefined) {
    if (data.productDetailBanner.previewUrl) {
      processedData.productDetailBanner = data.productDetailBanner.previewUrl;
    } else {
      processedData.productDetailBanner = await uploadFile(
        data.productDetailBanner as File,
        "settings-images",
      );
    }
  } else {
    processedData.productDetailBanner = null;
  }

  // Process whishlistBanner
  if (data.whishlistBanner !== undefined) {
    if (data.whishlistBanner.previewUrl) {
      processedData.whishlistBanner = data.whishlistBanner.previewUrl;
    } else {
      processedData.whishlistBanner = await uploadFile(
        data.whishlistBanner as File,
        "settings-images",
      );
    }
  } else {
    processedData.whishlistBanner = null;
  }

  return await restApiClient.put<SettingsResponseType>(`/settings`, {
    data: processedData,
  });
};
