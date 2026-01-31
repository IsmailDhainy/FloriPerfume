import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "$/utils/functions/misc.functions";

import { BaseInputProps } from "../Factory";
import { ErrorMessage } from "./ErrorMessage";

// Form Radio Input
const FormRadiosCheckBoxesInput: React.FC<
  BaseInputProps & {
    options: { id: number; value: string; label: string }[];
    multiple?: boolean;
    inputType?: "radio" | "checkbox";
  }
> = ({
  name,
  label,
  description,
  required,
  className,
  options,
  multiple = false,
  inputType = "radio",
}) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const currentValue = watch(name);

  // Initialize from current form value if any
  useEffect(() => {
    if (currentValue) {
      if (multiple && Array.isArray(currentValue)) {
        setSelectedValues(currentValue);
      } else if (!multiple && typeof currentValue === "string") {
        setSelectedValues([currentValue]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (optionValue: string) => {
    let newValues: string[];

    if (multiple) {
      if (selectedValues.includes(optionValue)) {
        newValues = selectedValues.filter((val) => val !== optionValue);
      } else {
        newValues = [...selectedValues, optionValue];
      }
    } else {
      newValues = [optionValue];
    }

    setSelectedValues(newValues);

    // Update form value based on multiple prop
    if (multiple) {
      setValue(name, newValues, { shouldValidate: true, shouldDirty: true });
    } else {
      setValue(name, newValues[0], { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleClick = (optionValue: string, e: React.MouseEvent) => {
    if (multiple && selectedValues.includes(optionValue)) {
      e.preventDefault();

      const newValues = selectedValues.filter((val) => val !== optionValue);
      setSelectedValues(newValues);

      setValue(name, newValues, { shouldValidate: true, shouldDirty: true });
    }
  };

  const error = errors[name];

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <label className="mb-1 text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && (
        <p className="mb-1 text-xs text-gray-500">{description}</p>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center">
            <input
              id={`${name}-${option.id}`}
              type={inputType}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleChange(option.value)}
              value={option.value}
              className="text-tertiary-blue border-tertiary-gray focus:ring-tertiary-blue h-4 w-4"
            />
            <label
              htmlFor={`${name}-${option.id}`}
              className="ml-2 cursor-pointer text-sm font-medium text-gray-700"
              onClick={(e) => handleClick(option.value, e)}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {multiple && inputType === "radio" && selectedValues.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedValues.map((value) => {
            const option = options.find((opt) => opt.value === value);
            return option ? (
              <div
                key={value}
                className="bg-tertiary-blue text-tertiary-blue flex items-center rounded-full px-2 py-1 text-xs"
              >
                {option.label}
                <button
                  type="button"
                  className="text-tertiary-blue hover:text-tertiary-blue ml-1 focus:outline-none"
                  onClick={() => {
                    const newValues = selectedValues.filter(
                      (val) => val !== value,
                    );
                    setSelectedValues(newValues);
                    setValue(name, newValues, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                >
                  ×
                </button>
              </div>
            ) : null;
          })}
        </div>
      )}
      <ErrorMessage error={error} />
    </div>
  );
};

export default FormRadiosCheckBoxesInput;
