import { IconProps } from "$/types/native/utils.types";

import { cn } from "../../utils/functions/misc.functions";

export const BurgerIcon = ({
  className,
  isOpen = false,
}: IconProps & { isOpen?: boolean }) => (
  <svg
    width="45"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M3 6H21"
      stroke="#B9B9B9"
      strokeWidth="3"
      strokeLinecap="round"
      className={cn(
        "origin-[12px_6px] transition-transform duration-300",
        isOpen && "translate-y-[6px] rotate-45",
      )}
    />
    <path
      d="M3 12H21"
      stroke="#B9B9B9"
      strokeWidth="3"
      strokeLinecap="round"
      className={cn("transition-opacity duration-300", isOpen && "opacity-0")}
    />
    <path
      d="M3 18H21"
      stroke="#B9B9B9"
      strokeWidth="3"
      strokeLinecap="round"
      className={cn(
        "origin-[12px_18px] transition-transform duration-300",
        isOpen && "translate-y-[-6px] -rotate-45",
      )}
    />
  </svg>
);
