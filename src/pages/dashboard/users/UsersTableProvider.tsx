import { getAllUsers } from "$/api/users/users.api";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import {
  UserTableResponseType,
  UserTableType,
} from "$/types/native/user.types";
import { UsersTableFiltersType } from "$/types/zod/user/users-table-filters.types";

import UsersTable from "./UsersTable";

const UsersTableProvider = () => {
  return (
    <EnhancedTableProvider<
      UserTableResponseType,
      UserTableType,
      UsersTableFiltersType
    >
      dataSelector={(response) => response.data}
      totalCountSelector={(response) => response.count}
      queryOptions={{
        queryFn: ({ filters, pagination, sorting }) =>
          getAllUsers(filters, pagination, sorting),
        queryKey: ["getAllUsers"],
        refetchOnMount: true,
      }}
    >
      <UsersTable />
    </EnhancedTableProvider>
  );
};

export default UsersTableProvider;
