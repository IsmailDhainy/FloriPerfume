import { z } from "zod";

export const createClientFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First Name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last Name is required",
  }),
  isActive: z.boolean().optional(),
  phone: z.string().optional(),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email address",
    })
    .transform((value) => value.toLowerCase()),
  orders: z.number().optional(),
  ordersCount: z.number().optional(),
});

export type CreateUserFormSchemaType = z.infer<typeof createClientFormSchema>;
