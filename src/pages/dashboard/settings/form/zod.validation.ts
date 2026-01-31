import { z } from "zod";

export const settingFormSchema = z.object({
  productBanner: z
    .any()
    .transform((files) => {
      if (!files || (files instanceof FileList && files.length === 0)) {
        return undefined;
      }
      if (files instanceof FileList && files.length > 0) {
        return files[0];
      }
      return files;
    })
    .optional(),
  categoryBanner: z
    .any()
    .transform((files) => {
      if (!files || (files instanceof FileList && files.length === 0)) {
        return undefined;
      }
      if (files instanceof FileList && files.length > 0) {
        return files[0];
      }
      return files;
    })
    .optional(),
  cartBanner: z
    .any()
    .transform((files) => {
      if (!files || (files instanceof FileList && files.length === 0)) {
        return undefined;
      }
      if (files instanceof FileList && files.length > 0) {
        return files[0];
      }
      return files;
    })
    .optional(),
  checkoutBanner: z
    .any()
    .transform((files) => {
      if (!files || (files instanceof FileList && files.length === 0)) {
        return undefined;
      }
      if (files instanceof FileList && files.length > 0) {
        return files[0];
      }
      return files;
    })
    .optional(),
  productDetailBanner: z
    .any()
    .transform((files) => {
      if (!files || (files instanceof FileList && files.length === 0)) {
        return undefined;
      }
      if (files instanceof FileList && files.length > 0) {
        return files[0];
      }
      return files;
    })
    .optional(),
  whishlistBanner: z
    .any()
    .transform((files) => {
      if (!files || (files instanceof FileList && files.length === 0)) {
        return undefined;
      }
      if (files instanceof FileList && files.length > 0) {
        return files[0];
      }
      return files;
    })
    .optional(),
  accountBanner: z
    .any()
    .transform((files) => {
      if (!files || (files instanceof FileList && files.length === 0)) {
        return undefined;
      }
      if (files instanceof FileList && files.length > 0) {
        return files[0];
      }
      return files;
    })
    .optional(),
  contactUsBanner: z
    .any()
    .transform((files) => {
      if (!files || (files instanceof FileList && files.length === 0)) {
        return undefined;
      }
      if (files instanceof FileList && files.length > 0) {
        return files[0];
      }
      return files;
    })
    .optional(),
  whatsapp: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  x: z.string().optional(),
  tiktok: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  googleLocation: z.string().optional(),
  shippingRate: z.coerce.number().min(0, "Shipping rate must be at least 0"),
});

export type SettingFormSchemaType = z.infer<typeof settingFormSchema>;
