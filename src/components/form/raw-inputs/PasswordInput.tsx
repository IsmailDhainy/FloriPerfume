import { forwardRef, useState } from "react";

import EyeIcon from "$/icons/EyeIcon";
import { BaseInput } from "$/types/native/utils.types";
import { cn } from "$/utils/functions/misc.functions";

type Props = BaseInput;

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ label, name, icon, placeholder, hideLabel, ...inputProps }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword((show) => !show);
    };

    const type = showPassword ? "text" : "password";

    return (
      <div className="flex w-full flex-col gap-3">
        {!!name && !hideLabel && (
          <label htmlFor={name} className="text-sm font-bold !text-gray-700">
            {label}
          </label>
        )}
        <div className={cn("relative flex")}>
          {icon}
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={cn(
              "focus:!ring-tertiary-blue w-[100%] !rounded-md border !border-gray-300 !px-3 !py-2 focus:!border-transparent focus:!ring-2 focus:!outline-none",
            )}
            ref={ref}
            {...inputProps}
          />
          <button
            title="Toggle password visibility"
            type="button"
            onClick={togglePassword}
            className="!bg-tertiary-blue absolute !top-1/2 !right-5 h-[50%] -translate-y-1/2 transform peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
          >
            <EyeIcon showLine={!showPassword} />
          </button>
        </div>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
