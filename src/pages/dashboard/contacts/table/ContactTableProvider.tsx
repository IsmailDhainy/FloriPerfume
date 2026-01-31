import { getAllContactsDashboard } from "$/api/contacts/contacts.api";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import {
  ContactTableResponseTypeDashboard,
  ContactTableType,
} from "$/types/native/contact.types";

import ContactTable from "./ContactTable";

const ContactTableProvider = () => {
  return (
    <EnhancedTableProvider<ContactTableResponseTypeDashboard, ContactTableType>
      dataSelector={(response) => response.data}
      totalCountSelector={(response) => response.count}
      queryOptions={{
        queryFn: ({ pagination, sorting }) =>
          getAllContactsDashboard(pagination, sorting),
        queryKey: ["getAllContact"],
        refetchOnMount: true,
      }}
    >
      <ContactTable />
    </EnhancedTableProvider>
  );
};

export default ContactTableProvider;
