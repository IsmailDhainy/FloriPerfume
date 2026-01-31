import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiCheck, FiChevronDown, FiX } from "react-icons/fi";

import { useOutsideClick } from "$/hooks/useOutsideClick";
import { SelectOption } from "$/types/native";
import { cn } from "$/utils/functions/misc.functions";

import { BaseInputProps } from "../Factory";
import { ErrorMessage } from "./ErrorMessage";

type OptionValueType = number | string;
const FormModernSelectInput: React.FC<
  BaseInputProps & {
    options: SelectOption[];
    triggerClassName?: string;
  }
> = ({
  name,
  label,
  description,
  required,
  registerOptions,
  className,
  options,
  multiple = false,
  errorMessage,
  placeholder = "Select an option",
  triggerClassName,
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<
    OptionValueType[] | OptionValueType
  >(multiple ? [] : 0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const values = watch(name) || (multiple ? [] : "");
  const error = errors[name];

  // Sync with form state
  // useEffect(() => {
  //   if (multiple) {
  //     setSelectedValues(values || []);
  //   } else {
  //     setSelectedValues(values ? [values] : []);
  //   }
  // }, [values, multiple]);

  useEffect(() => {
    const watchedValue = watch(name);
    if (multiple) {
      setSelectedValues(watchedValue || []);
    } else {
      setSelectedValues(watchedValue ? [watchedValue] : []);
    }
  }, [watch, name, multiple]);

  useOutsideClick(() => {
    setIsOpen(false);
  }, dropdownRef);

  const toggleOption = (value: OptionValueType) => {
    let newSelected: OptionValueType[];
    if (multiple) {
      newSelected = Array.isArray(selectedValues)
        ? selectedValues.includes(value)
          ? (selectedValues as OptionValueType[]).filter((v) => v !== value)
          : [...selectedValues, value]
        : [];
    } else {
      newSelected = [value];
      setIsOpen(false);
    }

    setSelectedValues(newSelected);
    setValue(name, multiple ? newSelected : value, { shouldValidate: true });
  };

  const removeOption = (value: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = !multiple
      ? 0
      : (selectedValues as number[]).filter((v) => v !== value);
    setSelectedValues(newSelected);
    setValue(name, newSelected, { shouldValidate: true });
  };

  const { ref, ...rest } = register(name, registerOptions);

  const selectedLabels = (
    (multiple ? selectedValues : [selectedValues]) as number[]
  ).map((value) => options.find((opt) => opt.value == value)?.label || value);

  const findSelectedOption = options.find((opt) => {
    return opt.value == selectedValues[0];
  })?.label;
  return (
    <div className={cn("flex w-full flex-col", className)}>
      <label htmlFor={name} className="mb-1 text-sm font-medium !text-gray-700">
        {label} {required && <span className="!text-red-500">*</span>}
      </label>
      {description && (
        <p className="mb-2 text-xs !text-gray-500">{description}</p>
      )}

      {/* Hidden select element for form registration */}
      <select
        id={name}
        multiple={multiple}
        className="hidden"
        {...rest}
        ref={ref}
        value={`${selectedValues}`}
        onChange={() => {}}
      >
        {!multiple && <option value=""></option>}
        {options.map((option, index) => (
          <option key={`${option.value}-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom select dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className={cn(
            "focus:ring-tertiary-blue flex w-full items-center justify-between rounded-[10px] border bg-transparent px-3 py-2 text-left focus:border-transparent focus:ring-2 focus:outline-none",
            error || errorMessage ? "border-red-500" : "border-gray-300",
            isOpen && "ring-tertiary-blue border-transparent ring-2",
            triggerClassName,
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-1">
            {!selectedValues || (selectedValues as number[]).length === 0 ? (
              <span className="text-gray-400">{placeholder}</span>
            ) : multiple ? (
              selectedLabels.map((label, index) => (
                <span
                  key={index}
                  className="bg-tertiary-blue !text-tertiary-blue inline-flex items-center rounded px-2 py-1 text-xs"
                >
                  {label}
                  <FiX
                    className="hover:text-tertiary-blue ml-1 h-3 w-3 cursor-pointer"
                    onClick={(e) => removeOption(selectedValues[index], e)}
                  />
                </span>
              ))
            ) : (
              <span className="text-[#494949]">{findSelectedOption}</span>
            )}
          </div>
          <FiChevronDown
            className={cn(
              "h-4 w-4 text-gray-400 transition-transform",
              isOpen ? "rotate-180 transform" : "",
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
            {options.map((option) => {
              const isSelected = Array.isArray(selectedValues)
                ? selectedValues.includes(option.value)
                : selectedValues === option.value;
              return (
                <div
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-center px-3 py-2 hover:bg-gray-50",
                    isSelected && "!bg-tertiary-blue",
                  )}
                  onClick={() => toggleOption(option.value)}
                >
                  {multiple && (
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded border",
                        isSelected
                          ? "border-tertiary-blue bg-tertiary-blue"
                          : "border-tertiary-gray",
                      )}
                    >
                      {isSelected && <FiCheck className="h-3 w-3 text-white" />}
                    </div>
                  )}
                  <span className="text-sm text-gray-700">{option.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ErrorMessage error={error} />
    </div>
  );
};

export default FormModernSelectInput;
