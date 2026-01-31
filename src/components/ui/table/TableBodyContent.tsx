import {
  ColumnMeta,
  type Row,
  type Table,
  flexRender,
} from "@tanstack/react-table";
import { Fragment } from "react/jsx-runtime";

import { cn, valueOrNothing } from "$/utils/functions/misc.functions";

import TableSkeletonLoader from "../Loaders/TableSkeletonLoader";

type Props<T> = {
  data: T[];
  table: Table<T>;
  isPendingData: boolean;
  isErroredData: boolean;
  tableColumns: number;
  noDataComponent: React.ReactNode;
  errorComponent: React.ReactNode;
  selectable?: boolean;
  rowClassName?: (row: Row<T>) => string;
  onRowClick?: (
    row: Row<T>,
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  ) => void;
  onContextMenu: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
};

export default function TableBodyContent<T>({
  table,
  errorComponent,
  noDataComponent,
  data,
  tableColumns,
  isPendingData,
  isErroredData,
  onRowClick,
  rowClassName,
  selectable,
  onContextMenu,
}: Props<T>) {
  if (isPendingData) {
    return <TableSkeletonLoader columns={tableColumns} />;
  }

  if (!data.length) {
    return (
      <tr className="h-32">
        <th colSpan={tableColumns}>
          {noDataComponent ? noDataComponent : "Pas de dossier"}
        </th>
      </tr>
    );
  }

  if (isErroredData) {
    return (
      <tr>
        <th colSpan={tableColumns}>
          {errorComponent ? errorComponent : "Error occured"}
        </th>
      </tr>
    );
  }
  return table.getRowModel()?.rows.map((row, index) => {
    return (
      <Fragment key={`row-${index}-${row.id}`}>
        {index === 0 && <tr className="h-[3px]" />}
        <tr
          onContextMenu={onContextMenu}
          className={cn(
            "relative mx-4 h-16 cursor-default duration-200 hover:bg-gray-50",
            row.getIsSelected() && "!bg-gray-100",
            valueOrNothing(!!onRowClick, "cursor-pointer"),
            rowClassName?.(row),
          )}
          onClick={(e) => {
            onRowClick?.(row, e);
          }}
        >
          {row.getVisibleCells().map((cell, index) => {
            const meta:
              | (ColumnMeta<T, unknown> & {
                  className?: number;
                })
              | undefined = cell.column.columnDef.meta;
            return (
              <td
                key={`${row.id}_${cell.column.columnDef.id}_${index}`}
                className={cn(
                  "text-sm font-semibold break-words",
                  index !== 0 && "px-2",
                  index === 0 && "px-5",
                  index === 1 && selectable && "px-5",
                  meta?.className,
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
        <tr className="mx-auto h-1 border-t-[1px] !border-gray-300" />
      </Fragment>
    );
  });
}
