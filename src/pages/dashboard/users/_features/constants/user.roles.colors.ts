import { UserRole } from "$/enums/auth";

export const ROLES_COLORS_MAPPER: Record<UserRole, string> = {
  SUPER_ADMIN: "bg-tertiary-gray/15 border-[2px] border-gray text-gray",
  ADMIN:
    "bg-tertiary-blue/15 border-[2px] border-tertiary-blue text-tertiary-blue",
  CLIENT: "bg-green-400/15 border-[2px] border-green-400 text-green-400",
};
