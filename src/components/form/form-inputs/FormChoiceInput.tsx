import { ComponentProps, useEffect, useState } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import { cn } from "$/utils/functions/misc.functions";

import ChoiceInput from "../raw-inputs/ChoiceInput";

type Props<T extends FieldValues> = ComponentProps<typeof ChoiceInput> & {
  name: Path<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  multiple?: boolean;
  options: { value: string; label: string }[];
  inputClassName?: string;
  // icon?: React.ReactNode;
};

export default function FormChoiceInput<T extends FieldValues>({
  name,
  multiple = false,
  registerOptions,
  options,
  className,
  inputClassName,
  // icon,
  ...radioProps
}: Props<T>) {
  const {
    register,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<T>();
  const [defaultValue, setDefaultValue] = useState<string[] | string>(
    multiple
      ? (getValues(name) as PathValue<T, Path<T>> | undefined) || []
      : getValues(name) || "",
  );

  useEffect(() => {
    if (defaultValue && !getValues(name)) {
      setValue(name, defaultValue as PathValue<T, Path<T>>);
    }
  }, [defaultValue, name, setValue, getValues]);

  const hasError = !!errors[name];

  const handleChange = (value: string) => {
    if (multiple) {
      const currentValues = (getValues(name) as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      setDefaultValue(newValues);
      setValue(name, newValues as PathValue<T, Path<T>>);
    } else {
      setDefaultValue(value);
      setValue(name, value as PathValue<T, Path<T>>);
    }
    clearErrors(name);
  };

  return (
    <>
      <div className={cn("flex", className)}>
        {options &&
          options.map((option) => (
            <label
              key={option.value}
              className={cn(
                "small-semibold flex cursor-pointer items-center space-x-1",
                hasError && "text-red-500",
              )}
            >
              <ChoiceInput
                checkbox={multiple}
                value={option.value}
                {...radioProps}
                className={cn(inputClassName, hasError && "border-red-500")}
                {...(multiple ? {} : register(name, registerOptions))}
                checked={
                  multiple
                    ? (getValues(name) as string[]).includes(option.value) ||
                      false
                    : getValues(name) === option.value
                }
                onChange={() => handleChange(option.value)}
              />
              <span className="extra-small">{option.label}</span>
            </label>
          ))}
      </div>
      {hasError && (
        <span className="text-xs font-medium text-red-500">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </>
  );
}
