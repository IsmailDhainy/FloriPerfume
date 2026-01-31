import { UserRole } from "$/enums/auth";

export const ROLES_LABELS_MAPPER: Record<UserRole, string> = {
  ADMIN: "Admin",
  SUPER_ADMIN: "Super Admin",
  CLIENT: "Client",
};
