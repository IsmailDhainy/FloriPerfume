import { type ComponentProps, type PropsWithChildren, forwardRef } from "react";

import { cn } from "$/utils/functions/misc.functions";

import BtnSpinner from "../Loaders/BtnSpinner";

type Props = ComponentProps<"button"> & {
  isLoading?: boolean;
};

const TableButton = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  ({ className, isLoading, disabled, children, ...buttonProps }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-busy={isLoading}
        className={cn(
          "bg-tertiary-blue flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm transition-all duration-200 hover:opacity-75 hover:shadow-sm active:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 aria-busy:cursor-wait",
          className,
        )}
        disabled={disabled || isLoading}
        {...buttonProps}
      >
        {children} {isLoading && <BtnSpinner />}
      </button>
    );
  },
);

TableButton.displayName = "TableButton";

export default TableButton;
