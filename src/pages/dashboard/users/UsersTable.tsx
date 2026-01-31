/* eslint-disable react-refresh/only-export-components */
import { useNavigate } from "react-router-dom";

import { AddIcon } from "$/assets/icons/AddFormIcon";
import { EnhancedTable } from "$/components/tables/enhanced-table";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { TableColumn } from "$/components/ui/table/Table";
import DateTableComponent from "$/components/ui/table/table-components/DateTableComponent";
import PATHS from "$/routes/constants";
import { UserTableType } from "$/types/native/user.types";

import UserRoleComponent from "./_features/components/UserRoleComponent";

export const usersTableHeaders: TableColumn<UserTableType>[] = [
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
    header: () => <div className="flex">FirstName</div>,
  },
  {
    selector: "lastName",
    title: "Last Name",
    meta: {
      className: "min-w-[200px]",
    },
    header: () => <div className="flex">LastName</div>,
  },
  {
    selector: "email",
    title: "Email",
    meta: {
      className: "min-w-[200px]",
    },
    header: () => <div className="flex">Email</div>,
  },
  {
    selector: "role",
    title: "Role",
    meta: {
      className: "min-w-[200px]",
    },
    cell: (cell) => {
      return <UserRoleComponent role={cell.getValue()} />;
    },
    header: () => <div className="flex">Role</div>,
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

const UsersTable = () => {
  const navigate = useNavigate();

  return (
    <>
      <Flexbox className="mb-4 !items-end gap-2.5 bg-white">
        <Button
          variant="primary"
          className="w-fit px-10"
          onClick={() => navigate(PATHS.CREATE_USER_FORM)}
        >
          <AddIcon /> Add User
        </Button>
      </Flexbox>
      <Flexbox fullWidth className="gap-2.5 rounded-2xl bg-white shadow-2xl">
        <EnhancedTable<UserTableType>
          tableClassName="rounded-lg border-none"
          paginatable
          noDataComponent="No Data Found"
          headerClassName="bg-primary-white-smoke text-black font-bold rounded-none"
          columns={usersTableHeaders}
          onRowClick={(row) =>
            navigate(PATHS.EdIT_USER_FORM.replace(":id", row.id))
          }
        />
      </Flexbox>
    </>
  );
};

export default UsersTable;
