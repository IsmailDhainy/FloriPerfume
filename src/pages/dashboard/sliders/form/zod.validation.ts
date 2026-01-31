import { z } from "zod";

export const createSliderFormSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
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

export type CreateSliderFormSchemaType = z.infer<typeof createSliderFormSchema>;
