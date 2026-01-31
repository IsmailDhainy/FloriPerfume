/* eslint-disable react-refresh/only-export-components */
import { useNavigate } from "react-router-dom";

import { AddIcon } from "$/assets/icons/AddFormIcon";
import { EnhancedTable } from "$/components/tables/enhanced-table";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { TableColumn } from "$/components/ui/table/Table";
import DateTableComponent from "$/components/ui/table/table-components/DateTableComponent";
import PATHS from "$/routes/constants";
import { CategoryTableType } from "$/types/native/category.types";

export const CategoriesTableHeaders: TableColumn<CategoryTableType>[] = [
  {
    selector: "id",
    title: "ID",
    meta: {
      className: "min-w-[70px]",
    },
    header: () => <div className="flex">Id</div>,
  },
  {
    selector: "name",
    title: "Name",
    meta: {
      className: "min-w-[200px]",
    },
    header: () => <div className="flex">Name</div>,
  },
  {
    selector: "description",
    title: "Description",
    meta: {
      className: "min-w-[200px]",
    },
    header: () => <div className="flex">Description</div>,
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

const CategoriesTable = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flexbox className="mb-4 !items-end gap-2.5 bg-white">
        <Button
          variant="primary"
          className="w-fit px-10"
          onClick={() => navigate(PATHS.CREATE_CATEGORY_FORM)}
        >
          <AddIcon /> Add Category
        </Button>
      </Flexbox>
      <Flexbox fullWidth className="gap-2.5 rounded-2xl bg-white shadow-2xl">
        <EnhancedTable<CategoryTableType>
          tableClassName="rounded-lg border-none"
          paginatable
          noDataComponent="No Data Found"
          headerClassName="bg-primary-white-smoke text-black font-bold rounded-none"
          columns={CategoriesTableHeaders}
          onRowClick={(row) =>
            navigate(PATHS.CATEGORY_DETAILS.replace(":id", row.id))
          }
        />
      </Flexbox>
    </>
  );
};

export default CategoriesTable;
