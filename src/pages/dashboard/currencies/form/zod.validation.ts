import { z } from "zod";

export const createCurrencyFormSchema = z.object({
  code: z.string().min(1, {
    message: "Code is required",
  }),
  symbol: z.string().min(1, {
    message: "Symbol is required",
  }),
  rate: z.string().min(1, {
    message: "Rate is required",
  }),
  default: z.boolean().default(false),
  image: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Image is required",
    })
    .transform((files) => files[0])
    .optional(),
});

export type CreateCurrencyFormSchemaType = z.infer<
  typeof createCurrencyFormSchema
>;
