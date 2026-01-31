import { z } from "zod";

export const createContactFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().optional(),
  phone: z.string().min(1, {
    message: "Phone is required",
  }),
  message: z.string().min(1, {
    message: "Phone is required",
  }),
});

export type CreateContactFormSchemaType = z.infer<
  typeof createContactFormSchema
>;
