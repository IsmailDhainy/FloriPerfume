import { UserRole } from "../../enums/auth";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  role: UserRole | null;
  isActive?: boolean;
  location?: UserLocation;
  orders?: number;
  ordersCount?: number;
};

export type EditUser = {
  firstName: string;
  lastName: string;
  phone?: string;
  role?: UserRole | null;
  isActive?: boolean;
};

export type UserTableType = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
  orders?: number;
  ordersCount?: number;
};

export type UserTableResponseType = {
  count: number;
  data: UserTableType[];
};
export type UserLocation = {
  city: string;
  street: string;
  building: string;
  notes?: string;
};

export type UserPassword = {
  userId: number;
  password: string;
  newPassword: string;
};
