export const UserRole = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
