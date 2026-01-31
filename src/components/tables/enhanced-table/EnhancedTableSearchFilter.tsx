import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import useMemoizedDebounce from "$/hooks/useMemoizedDebounce";
import { cn } from "$/utils/functions/misc.functions";

import { useEnhancedTable } from "./EnhancedTableProvider";

type EnhancedTableSearchFilterProps = {
  placeHolder?: string;
  className?: string;
};

export default function EnhancedTableSearchFilter<
  TFilters extends { search: string },
>({ placeHolder = "Search ...", className }: EnhancedTableSearchFilterProps) {
  const [searchText, setSearchText] = useState("");
  const { handleSetFilters } = useEnhancedTable<unknown, unknown, TFilters>();

  const debouncedSearchText = useMemoizedDebounce(searchText);

  useEffect(() => {
    handleSetFilters("search", debouncedSearchText);
  }, [debouncedSearchText, handleSetFilters]);

  return (
    <div
      className={cn(
        "border-neutral-light text-neutral-medium focus-within:border-primary relative flex h-11 w-full shrink-0 items-center gap-2 rounded-lg border p-3 !pr-0 text-sm sm:w-[290px]",
        className,
      )}
    >
      <SearchIcon size={17} />
      <input
        type="text"
        placeholder={placeHolder}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full pr-4 text-sm outline-none placeholder:text-sm focus:outline-none"
      />
    </div>
  );
}
