import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import {
  EditUser,
  User,
  UserLocation,
  UserTableResponseType,
  UserTableType,
} from "$/types/native/user.types";
import { Pagination } from "$/types/native/utils.types";
import { UsersTableFiltersType } from "$/types/zod/user/users-table-filters.types";

import { restApiClient } from "../restApiClient";

export const getAllUsers = async (
  filters?: UsersTableFiltersType,
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<UserTableResponseType>,
) => {
  return restApiClient.post<
    UserTableResponseType,
    {
      sorting?: EnhancedTableSorting<UserTableResponseType>;
      pagination?: Pagination;
      filters?: UsersTableFiltersType;
    }
  >("/users/all", {
    data: { filters, pagination, sorting },
  });
};

export const getAllClients = async (
  // filters?: UsersTableFiltersType,
  pagination?: Pagination,
  sorting?: EnhancedTableSorting<UserTableResponseType>,
) => {
  return restApiClient.post<
    UserTableResponseType,
    {
      sorting?: EnhancedTableSorting<UserTableResponseType>;
      pagination?: Pagination;
    }
  >("/users/clients", {
    data: { pagination, sorting },
  });
};

export const addUser = async (data: UserTableType) => {
  return restApiClient.post<UserTableType, UserTableType>("/auth/register", {
    data,
  });
};

export const getOneUser = async (id: number) => {
  const data = await restApiClient.get<EditUser>(`/users/${id}`);

  return data;
};

export const editUser = async (id: string, data: EditUser) => {
  return restApiClient.put<EditUser, EditUser>(`/users/${id}`, {
    data,
  });
};

export const editClientLocation = async (id: string, data: UserLocation) => {
  return restApiClient.put<User, { location: UserLocation }>(
    `/users/location/${id}`,
    {
      data: { location: data },
    },
  );
};

export const editClientInformation = async (id: string, data: EditUser) => {
  return restApiClient.put<boolean, EditUser>(`/users/client/${id}`, {
    data,
  });
};
