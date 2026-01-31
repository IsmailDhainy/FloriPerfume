import * as z from "zod";

export const categoriesFilterSchema = z.object({
  search: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type CategoriesTableFiltersType = z.infer<typeof categoriesFilterSchema>;
