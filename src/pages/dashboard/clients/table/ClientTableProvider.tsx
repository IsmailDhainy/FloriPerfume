import { getAllClients } from "$/api/users/users.api";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import {
  UserTableResponseType,
  UserTableType,
} from "$/types/native/user.types";

import ContactTable from "./ClientTable";

const ContactTableProvider = () => {
  return (
    <EnhancedTableProvider<UserTableResponseType, UserTableType>
      dataSelector={(response) => response.data}
      totalCountSelector={(response) => response.count}
      queryOptions={{
        queryFn: ({ pagination, sorting }) =>
          getAllClients(pagination, sorting),
        queryKey: ["getAllClients"],
        refetchOnMount: true,
      }}
    >
      <ContactTable />
    </EnhancedTableProvider>
  );
};

export default ContactTableProvider;
