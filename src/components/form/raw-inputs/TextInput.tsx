import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "$/utils/functions/misc.functions";

type Props = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  icon?: React.ReactNode;
  inputClassName?: string;
};

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ icon, inputClassName, className, ...inputProps }, forwardedRef) => {
    return (
      <div className={cn("relative flex gap-2", className)}>
        {icon}
        <input
          ref={forwardedRef}
          type="text"
          {...inputProps}
          className={cn(
            ":focus:outline-none :focus:border-none w-full border-none bg-transparent placeholder-gray-300 outline-none",
            inputClassName,
          )}
        />
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
