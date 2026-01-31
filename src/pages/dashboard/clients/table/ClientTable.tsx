/* eslint-disable react-refresh/only-export-components */
import { useNavigate } from "react-router-dom";

import { EnhancedTable } from "$/components/tables/enhanced-table";
import Flexbox from "$/components/ui/Flexbox";
import { TableColumn } from "$/components/ui/table/Table";
import PATHS from "$/routes/constants";
import { UserTableType } from "$/types/native/user.types";

export const ClientTableHeaders: TableColumn<UserTableType>[] = [
  {
    selector: "id",
    title: "ID",
    meta: {
      className: "min-w-[70px]",
    },
    header: () => <div className="flex">Id</div>,
  },
  {
    selector: "firstName",
    title: "First Name",
    meta: {
      className: "min-w-[200px]",
    },
    header: () => <div className="flex">First Name</div>,
  },
  {
    selector: "lastName",
    title: "Last Name",
    meta: {
      className: "min-w-[200px]",
    },
    header: () => <div className="flex">Last Name</div>,
  },
  {
    selector: "phone",
    title: "Phone",
    meta: {
      className: "min-w-[200px]",
    },
    header: () => <div className="flex">Phone</div>,
  },
  {
    selector: "ordersCount",
    title: "Orders Count",
    meta: {
      className: "min-w-[200px]",
    },
    header: () => <div className="flex">Orders Count</div>,
  },
];

const ContactTable = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flexbox className="mb-4 h-[40px] !items-end gap-2.5 bg-white"></Flexbox>
      <Flexbox fullWidth className="gap-2.5 rounded-2xl bg-white shadow-2xl">
        <EnhancedTable<UserTableType>
          tableClassName="rounded-lg border-none"
          paginatable
          noDataComponent="No Data Found"
          headerClassName="bg-primary-white-smoke text-black font-bold rounded-none"
          columns={ClientTableHeaders}
          onRowClick={(row) =>
            navigate(PATHS.CLIENTS_ORDERS.replace(":id", row.id))
          }
        />
      </Flexbox>
    </>
  );
};

export default ContactTable;
