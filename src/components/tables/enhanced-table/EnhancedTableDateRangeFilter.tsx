import { MultiDatePicker } from "$/components/ui/MultiDateRange/MultiDateRange";

import { useEnhancedTable } from "./EnhancedTableProvider";

export default function TableDateRangeFilter<
  TFilters extends { dateRange: Date[] },
>() {
  const { filters, handleSetFilters } = useEnhancedTable<
    unknown,
    unknown,
    TFilters
  >();

  const onChange = (startDate: Date, endDate: Date | undefined) => {
    if (endDate) handleSetFilters("dateRange", [startDate, endDate]);
    else handleSetFilters("dateRange", [startDate]);
  };

  return (
    <MultiDatePicker
      firstDate={filters.dateRange?.at(0)}
      lastDate={filters.dateRange?.at(1)}
      onDate={onChange}
    />
  );
}
