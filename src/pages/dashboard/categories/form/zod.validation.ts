import { z } from "zod";

export const createCategoryFormSchema = z.object({
  isActive: z.boolean(),
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  // image: z.any().optional(),
  showOnHomePage: z.boolean().default(false),
  image: z
    .any()
    .transform((files) => {
      // If no files or empty FileList, return undefined
      if (!files || (files instanceof FileList && files.length === 0)) {
        return undefined;
      }
      // If FileList with files, return first file
      if (files instanceof FileList && files.length > 0) {
        return files[0];
      }
      return files;
    })
    .optional(),
});

export type CreateCategoryFormSchemaType = z.infer<
  typeof createCategoryFormSchema
>;
