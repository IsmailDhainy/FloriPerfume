import type { PropsWithChildren } from "react";

import { EnhancedTableDateRangeFilter } from ".";
import EnhancedTableSearchFilter from "./EnhancedTableSearchFilter";

type Props = {
  searchPlaceholder?: string;
  hasDatePicker?: boolean;
};

// TODO: add other fixed buttons + required props
export default function EnhancedTableActionBar({
  children,
  searchPlaceholder,
  hasDatePicker,
}: PropsWithChildren<Props>) {
  return (
    <div className="bg-snow flex w-full flex-col items-center justify-between gap-4 rounded px-4 py-2 md:items-start lg:flex-row lg:items-center">
      <EnhancedTableSearchFilter placeHolder={searchPlaceholder} />
      {/* wrapper for buttons */}
      <div className="flex flex-wrap gap-4">
        {children && children}

        {hasDatePicker && <EnhancedTableDateRangeFilter />}
      </div>
    </div>
  );
}
