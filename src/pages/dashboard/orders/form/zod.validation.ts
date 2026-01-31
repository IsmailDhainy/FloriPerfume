import { z } from "zod";

export const checkoutStatusFormSchema = z.object({
  status: z.enum(["DELIVERED", "CANCELLED", "CHECKEDOUT"]),
  paymentStatus: z.enum(["PENDING", "PAID", "NOTPAID", "REFUND"]),
});

export type CheckoutStatusFormSchemaType = z.infer<
  typeof checkoutStatusFormSchema
>;
