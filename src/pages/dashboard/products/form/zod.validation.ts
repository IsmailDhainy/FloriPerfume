import { z } from "zod";

// Base schema
const productBaseSchema = z.object({
  isActive: z.boolean(),
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  sale: z.coerce.number().optional(),
  sku: z.string().optional(),
  hotSale: z.boolean().optional(),
  newArrival: z.boolean().optional(),
  bestSeller: z.boolean().optional(),
  onSale: z.boolean().optional(),
  inStock: z.coerce.number().optional(),
  categoryId: z.number().min(1, "Category is required"),
  brandId: z.coerce.number().optional(),
  price: z.number().optional(),
  size: z
    .array(
      z.object({
        property: z.string().min(1, "Size property is required"),
        price: z.coerce
          .number()
          .positive("Price must be greater than 0")
          .refine((val) => Number.isFinite(val), {
            message: "Price must be a valid number",
          })
          .transform((val) => Math.round(val * 100) / 100),
      }),
    )
    .optional(),
});

// For creating new products (images required)
export const createProductFormSchema = productBaseSchema.extend({
  image: z
    .any()
    .transform((files) => {
      // If no files or empty FileList, return empty array
      if (!files || (files instanceof FileList && files.length === 0)) {
        return [];
      }
      // If already an array, return as is
      if (Array.isArray(files)) {
        return files;
      }
      // If FileList, convert to array
      if (files instanceof FileList) {
        return Array.from(files);
      }
      return [];
    })
    .pipe(z.array(z.instanceof(File)))
    .optional(),
});

// For editing products (images optional)
export const editProductFormSchema = productBaseSchema.extend({
  image: z
    .any()
    .transform((files) => {
      // If no files or empty FileList, return empty array
      if (!files || (files instanceof FileList && files.length === 0)) {
        return [];
      }
      // If already an array, return as is
      if (Array.isArray(files)) {
        return files;
      }
      // If FileList, convert to array
      if (files instanceof FileList) {
        return Array.from(files);
      }
      return [];
    })
    .pipe(z.array(z.instanceof(File)))
    .optional(),
});

export type CreateProductFormSchemaType = z.infer<
  typeof createProductFormSchema
>;
export type EditProductFormSchemaType = z.infer<typeof editProductFormSchema>;
