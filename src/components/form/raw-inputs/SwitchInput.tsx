import { ComponentProps } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import { cn, getDeepFormError } from "$/utils/functions/misc.functions";

type Props<T extends FieldValues> = Omit<ComponentProps<"input">, "type"> & {
  name: Path<T>;
  // label?: string;
  // wrapperClassName?: string;
  // hideLabel?: boolean;
  registerOptions?: RegisterOptions<T, Path<T>>;
  formControlled?: boolean;
  switchLabel?: string;
};

export default function SwitchInput<T extends FieldValues>({
  name,
  // label,
  // wrapperClassName,
  // hideLabel,
  registerOptions,
  className,
  formControlled = true,
  switchLabel,
  ...inputProps
}: Props<T>) {
  const formContext = useFormContext<T>();

  const isInFormContext = formContext
    ? !!formContext.register && formControlled
    : false;

  const error = isInFormContext
    ? getDeepFormError(formContext.formState.errors, name.split("."))
    : null;

  return (
    <>
      <div className="flex items-center gap-2">
        <label className="switch">
          <input
            type="checkbox"
            className={cn(className)}
            {...(isInFormContext
              ? formContext.register(name, registerOptions)
              : inputProps)}
          />
          <span className="slider round"></span>
        </label>
        {switchLabel && (
          <span className={cn("min-w-10", className)}>{switchLabel}</span>
        )}
      </div>
      {!!error && (
        <span className="text-xs font-medium text-red-500">
          {error.message?.toString()}
        </span>
      )}
    </>
  );
}
