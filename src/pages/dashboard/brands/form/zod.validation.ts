import { z } from "zod";

export const createBrandFormSchema = z.object({
  isActive: z.boolean(),
  name: z.string().min(1, "Brand name is required"),
});

export type CreateBrandFormSchemaType = z.infer<typeof createBrandFormSchema>;
