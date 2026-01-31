/* eslint-disable react-refresh/only-export-components */
import { useNavigate } from "react-router-dom";

import { EnhancedTable } from "$/components/tables/enhanced-table";
import Flexbox from "$/components/ui/Flexbox";
import { TableColumn } from "$/components/ui/table/Table";
import DateTableComponent from "$/components/ui/table/table-components/DateTableComponent";
import PATHS from "$/routes/constants";
import { CheckoutTableType } from "$/types/native/checkout.types";

export const OrdersTableHeaders: TableColumn<CheckoutTableType>[] = [
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
    selector: "status",
    title: "Status",
    meta: {
      className: "min-w-[200px]",
    },
    header: () => <div className="flex">Status</div>,
  },
  {
    selector: "paymentStatus",
    title: "Payment Status",
    meta: {
      className: "min-w-[200px]",
    },
    header: () => <div className="flex">Payment Status</div>,
  },
  {
    selector: "createdAt",
    title: "Created At",
    meta: {
      className: "min-w-[200px]",
    },
    cell: (cell) => <DateTableComponent value={cell.getValue()} />,
    header: () => <div className="flex">Created At</div>,
  },
];

const OrdersTable = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flexbox className="mb-4 h-[40px] !items-end gap-2.5 bg-white"></Flexbox>
      <Flexbox fullWidth className="gap-2.5 rounded-2xl bg-white shadow-2xl">
        <EnhancedTable<CheckoutTableType>
          tableClassName="rounded-lg border-none"
          paginatable
          noDataComponent="No Data Found"
          headerClassName="bg-primary-white-smoke text-black font-bold rounded-none"
          columns={OrdersTableHeaders}
          onRowClick={(row) =>
            navigate(PATHS.ORDER_DETAILS.replace(":id", row.id))
          }
        />
      </Flexbox>
    </>
  );
};

export default OrdersTable;
