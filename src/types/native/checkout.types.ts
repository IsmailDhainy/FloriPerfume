import { z } from "zod";

export const CheckoutSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email().optional(),
  phone: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City is required"),
  building: z.string().min(1, "Building is required"),
  street: z.string().min(1, "Street is required"),
  notes: z.string().optional(),
  status: z.string().optional(),
  total: z.number(),
  subTotal: z.number(),
  delivery: z.number().optional(),
  discount: z.number().optional(),
  rate: z.number().optional(),
  currency: z.string().optional(),
  userId: z.number().optional(),
  createdAt: z.string().optional(),
  paymentStatus: z.string().optional(),
  cart: z.array(
    z.object({
      productId: z.number(),
      basePrice: z.number(),
      sale: z.number().optional(),
      image: z.string().optional(),
      name: z.string().optional(),
      selectedSize: z.array(
        z.object({
          property: z.string(),
          price: z.number(),
          quantity: z.number(),
        }),
      ),
    }),
  ),
  location: z
    .object({
      city: z.string().optional(),
      street: z.string().optional(),
      building: z.string().optional(),
      notes: z.string().optional(),
    })
    .optional(),
});

export type Checkout = z.infer<typeof CheckoutSchema>;

export type Checkouts = {
  id?: number;
  status: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  total: number;
  subTotal?: number;
  userId?: number;
  currency?: string;
  rate?: number;
  delivery?: number;
  discount?: number;
  locationId?: number;
  createdAt: string;
  updatedAt?: string;
  paymentStatus?: string;
};

export type CheckoutTableType = {
  id?: number;
  status: string;
  firstName: string;
  lastName: string;
  total: number;
  createdAt: string;
  paymentStatus?: string;
};

export type CheckoutResponseType = Checkouts;

export type CheckoutTableResponseType = {
  data: Checkout[];
  count: number;
};
