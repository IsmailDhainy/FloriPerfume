import * as z from "zod";

import { UserRole } from "$/enums/auth";

export const userssFilterSchema = z.object({
  search: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
});

export type UsersTableFiltersType = z.infer<typeof userssFilterSchema>;
