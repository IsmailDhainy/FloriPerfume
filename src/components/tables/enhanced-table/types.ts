import type { QueryKey, UseQueryResult } from "@tanstack/react-query";
import type { OnChangeFn, RowSelectionState } from "@tanstack/react-table";

import {
  KeyValueObject,
  Pagination,
  SortOrder,
} from "$/types/native/utils.types";

export type EnhancedTableContextType<
  TData,
  TSelectedData,
  TFilter extends KeyValueObject,
> = {
  queryResult: UseQueryResult<TData, unknown>;
  queryKey: QueryKey;
  sorting?: EnhancedTableSorting<TSelectedData>;
  filters: TFilter;
  selectedRows: Record<number, boolean>;
  dataSelector: (data: TData) => TSelectedData[];
  prioritizedRowId: string | number | null;
  prioritizeRow: (rowId: string | number) => void;
  clearPrioritizedRow: () => void;
  resetFilters: () => void;
  handleSetFilters: <K extends keyof TFilter>(
    key: K,
    filter: TFilter[K],
  ) => void;
  handleSetSorting: (sorting: EnhancedTableSorting<TSelectedData>) => void;
  clearSorting: () => void;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  getSelectedRows: () => TSelectedData[];
  paginationHandlers: {
    pageLimit: number;
    totalNumberOfPages: number;
    currentPage: number;
    onNextClick: () => void;
    onPreviousClick: () => void;
    onSetPageNumber: (pageNb: number) => void;
    onSetPageLimit: (limit: number) => void;
  };
};

export type EnhancedTableSorting<T> = {
  key: keyof T;
  order: SortOrder;
};

export type EnhancedTableQueryFnParams<TSelectedData, TFilters> = {
  filters?: TFilters;
  sorting?: EnhancedTableSorting<TSelectedData>;
  pagination?: Pagination;
  type?: string;
};

export type EnhancedTableQueryFn<TData, TFilters> = (
  data: EnhancedTableQueryFnParams<TData, TFilters>,
) => Promise<TData>;
