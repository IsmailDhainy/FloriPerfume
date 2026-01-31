import { z } from "zod";

export const createUserFormSchema = z.object({
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
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  role: z.enum(["ADMIN", "SUPER_ADMIN", "CLIENT"]).default("CLIENT"),
});

export type CreateUserFormSchemaType = z.infer<typeof createUserFormSchema>;

export const editUserFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First Name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last Name is required",
  }),
  isActive: z.boolean().optional(),
  phone: z.string().optional(),
  role: z.enum(["ADMIN", "SUPER_ADMIN"]).default("ADMIN"),
});

export type EditUserFormSchemaType = z.infer<typeof editUserFormSchema>;
