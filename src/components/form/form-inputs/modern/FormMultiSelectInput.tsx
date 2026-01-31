import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiCheck } from "react-icons/fi";

import { cn } from "$/utils/functions/misc.functions";

import { BaseInputProps } from "../Factory";
import { ErrorMessage } from "./ErrorMessage";

const FormModernMultiSelectInput: React.FC<
  BaseInputProps & {
    options: { id: number; value: string; label: string }[];
  }
> = ({
  name,
  label,
  description,
  required,
  registerOptions,
  className,
  options,
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  // const values = watch(name) || [];
  const error = errors[name];

  // Sync with form state
  // useEffect(() => {
  //   if (values) {
  //     setSelectedValues(values);
  //   }
  // }, [values]);

  useEffect(() => {
    const watchedValue = watch(name) || [];
    setSelectedValues(watchedValue);
  }, [watch, name]);

  const toggleOption = (value: string) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newSelected);
    setValue(name, newSelected, { shouldValidate: true });
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    option: {
      id: number;
      value: string;
      label: string;
    },
  ) => {
    e.preventDefault();
    if (e.key === "Enter" || e.key === " ") {
      toggleOption(option.value);
    }
    if (e.key === "Escape") {
      e.currentTarget.blur();
    }
    if (e.key === "Tab") {
      e.currentTarget.blur();
    }
    if (e.key === "ArrowDown") {
      (e.currentTarget.nextElementSibling as HTMLElement)?.focus();
    }
    if (e.key === "ArrowUp") {
      (e.currentTarget.previousElementSibling as HTMLElement)?.focus();
    }
  };

  // Register the field with react-hook-form
  const { ref, ...rest } = register(name, registerOptions);

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && (
        <p className="mb-2 text-xs text-gray-500">{description}</p>
      )}

      {/* Hidden select element for form registration */}
      <select
        id={name}
        multiple
        className="hidden"
        {...rest}
        ref={ref}
        value={selectedValues}
        onChange={() => {}}
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div
        className={cn(
          "max-h-36 space-y-2 overflow-auto rounded-md border p-2",
          error ? "border-red-500" : "border-gray-300",
        )}
      >
        {options.map((option) => (
          <div
            key={option.id}
            tabIndex={0}
            className="flex cursor-pointer items-center rounded p-2 transition-colors hover:bg-gray-50"
            onKeyDown={(e) => handleOnKeyDown(e, option)}
            onFocus={(e) => {
              e.currentTarget.classList.add("bg-gray-100");
            }}
            onBlur={(e) => {
              e.currentTarget.classList.remove("bg-gray-100");
            }}
            onClick={() => toggleOption(option.value)}
          >
            <div
              className={cn(
                "mr-2 flex h-5 w-5 items-center justify-center rounded border",
                selectedValues.includes(option.value)
                  ? "border-tertiary-blue bg-tertiary-blue"
                  : "border-gray-300",
              )}
            >
              {selectedValues.includes(option.value) && (
                <FiCheck className="h-3.5 w-3.5 shrink-0 text-white" />
              )}
            </div>
            <span className="text-sm text-gray-700">{option.label}</span>
          </div>
        ))}
      </div>

      <ErrorMessage error={error} />
    </div>
  );
};

export default FormModernMultiSelectInput;
