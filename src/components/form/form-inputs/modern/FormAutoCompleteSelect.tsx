import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiCheck, FiChevronDown, FiX } from "react-icons/fi";

import { useOutsideClick } from "$/hooks/useOutsideClick";
import { SelectOption } from "$/types/native";
import { cn } from "$/utils/functions/misc.functions";

import { BaseInputProps } from "../Factory";
import { ErrorMessage } from "./ErrorMessage";

type OptionValueType = number | string;

const FormModernAutocompleteInput = React.forwardRef<
  HTMLInputElement,
  BaseInputProps & {
    disabled?: boolean;
    options: SelectOption[];
    autoSubmit?: boolean;
  }
>(
  (
    {
      name,
      label,
      description,
      required,
      registerOptions,
      className,
      options: initialOptions,
      multiple = false,
      errorMessage,
      autoSubmit = false,
      disabled,
    },
    forwardedRef,
  ) => {
    const {
      register,
      setValue,
      watch,
      formState: { errors },
      // get the form's submit handler
    } = useFormContext();

    // Helper to submit the form if autoSubmit is true
    const maybeSubmitForm = () => {
      if (disabled) return;

      if (autoSubmit) {
        // Find the closest form and submit it
        const form = inputRef.current?.form;
        if (form) {
          if (form.requestSubmit) {
            form.requestSubmit();
          } else {
            form.submit();
          }
        }
      }
    };
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectedValues, setSelectedValues] = useState<
      OptionValueType[] | OptionValueType
    >(multiple ? [] : "");
    const [filteredOptions, setFilteredOptions] = useState(initialOptions);
    const [options, setOptions] = useState(initialOptions);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    // const values = watch(name) || (multiple ? [] : "");
    const error = errors[name];

    // Sync with form state
    // useEffect(() => {
    //   if (multiple) {
    //     setSelectedValues(values || []);
    //   } else {
    //     setSelectedValues(values || "");
    //   }
    // }, [values, multiple]);

    useEffect(() => {
      const watchedValue = watch(name);
      if (multiple) {
        setSelectedValues(watchedValue || []);
      } else {
        setSelectedValues(watchedValue || "");
      }
    }, [watch, name, multiple]);

    useOutsideClick(() => {
      handleBlur();
    }, dropdownRef);

    useEffect(() => {
      if (inputValue.trim() !== "") {
        const filtered = options.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase()),
        );
        setFilteredOptions(filtered);
      } else {
        setFilteredOptions(options);
      }
    }, [inputValue, options]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      if (!multiple) {
        setSelectedValues(value);
      }
      if (!isOpen && value.trim() !== "") {
        setIsOpen(true);
      }
    };

    const handleBlur = () => {
      setIsOpen(false);

      let didSelectOrCreate = false;

      if (inputValue.trim() !== "") {
        const matchingOption = options.find(
          (opt) => opt.label.toLowerCase() === inputValue.toLowerCase(),
        );

        if (matchingOption) {
          if (multiple) {
            const newSelected = Array.isArray(selectedValues)
              ? selectedValues.includes(matchingOption.value)
                ? selectedValues
                : [...selectedValues, matchingOption.value]
              : [matchingOption.value];
            setSelectedValues(newSelected);
            setValue(name, newSelected, { shouldValidate: true });
          } else {
            setSelectedValues(matchingOption.value);
            setValue(name, matchingOption.value, { shouldValidate: true });
          }
          didSelectOrCreate = true;
        } else {
          const newOption = {
            label: inputValue,
            value: inputValue,
          };

          setOptions((prev) => [...prev, newOption]);

          if (multiple) {
            const newSelected = Array.isArray(selectedValues)
              ? selectedValues.includes(inputValue)
                ? selectedValues
                : [...selectedValues, inputValue]
              : [inputValue];
            setSelectedValues(newSelected);
            setValue(name, newSelected, { shouldValidate: true });
          } else {
            setSelectedValues(inputValue);
            setValue(name, inputValue, { shouldValidate: true });
          }
          didSelectOrCreate = true;
        }
      }

      setInputValue("");
      if (didSelectOrCreate) {
        maybeSubmitForm();
      }
    };

    const toggleOption = (option: SelectOption) => {
      if (disabled) return;
      if (multiple) {
        const newSelected = Array.isArray(selectedValues)
          ? selectedValues.includes(option.value)
            ? selectedValues.filter((v) => v !== option.value)
            : [...selectedValues, option.value]
          : [option.value];

        setSelectedValues(newSelected);
        setValue(name, newSelected, { shouldValidate: true });
      } else {
        setSelectedValues(option.value);
        setValue(name, option.value, { shouldValidate: true });
        setIsOpen(false);
      }

      setInputValue("");
      maybeSubmitForm();
    };

    const removeOption = (value: OptionValueType, e: React.MouseEvent) => {
      e.stopPropagation();

      // Remove custom option if it's not in initial options
      if (
        typeof value === "string" &&
        !initialOptions.some((opt) => opt.value === value)
      ) {
        setOptions(options.filter((opt) => opt.value !== value));
      }

      const newSelected = !multiple
        ? ""
        : (selectedValues as OptionValueType[]).filter((v) => v !== value);

      setSelectedValues(newSelected);
      setValue(name, newSelected, { shouldValidate: true });
    };

    const { ref, ...rest } = register(name, registerOptions);

    const getSelectedLabels = () => {
      if (multiple) {
        return (selectedValues as OptionValueType[]).map(
          (value) => options.find((opt) => opt.value === value)?.label || value,
        );
      } else {
        const option = options.find((opt) => opt.value === selectedValues);
        return option ? [option.label] : selectedValues ? [selectedValues] : [];
      }
    };

    const selectedLabels = getSelectedLabels();

    return (
      <div className={cn("flex w-full flex-col", className)}>
        <label
          htmlFor={name}
          className="mb-1 text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {description && (
          <p className="mb-2 text-xs text-gray-500">{description}</p>
        )}

        {/* Hidden input element for form registration */}
        <input
          id={name}
          type="hidden"
          {...rest}
          ref={(instance) => {
            ref(instance);
            if (typeof forwardedRef === "function") {
              forwardedRef(instance);
            } else if (forwardedRef) {
              (
                forwardedRef as React.MutableRefObject<HTMLInputElement | null>
              ).current = instance;
            }
          }}
          value={
            Array.isArray(selectedValues)
              ? selectedValues.join(",")
              : selectedValues
          }
        />

        {/* Custom autocomplete dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className={cn(
              "focus-within:ring-tertiary-blue flex w-full items-center rounded-md border px-3 py-2 focus-within:border-transparent focus-within:ring-2",
              error || errorMessage ? "border-red-500" : "border-gray-300",
              isOpen && "ring-tertiary-blue border-transparent ring-2",
            )}
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex flex-1 flex-wrap gap-1">
              {multiple &&
                selectedLabels.map((label, index) => (
                  <span
                    key={index}
                    className="text-tertiary-blue bg-tertiary-blue inline-flex items-center rounded px-2 py-1 text-xs"
                  >
                    {label}
                    <FiX
                      className="hover:text-tertiary-blue ml-1 h-3 w-3 cursor-pointer"
                      onClick={(e) =>
                        removeOption(
                          Array.isArray(selectedValues)
                            ? selectedValues[index]
                            : "",
                          e,
                        )
                      }
                    />
                  </span>
                ))}

              <input
                ref={inputRef}
                type="text"
                className={cn(
                  "flex-1 bg-transparent outline-none placeholder:text-gray-400",
                  multiple && selectedLabels.length > 0 ? "w-auto" : "w-full",
                )}
                placeholder={
                  selectedLabels.length === 0 ? "Type or select an option" : ""
                }
                value={
                  !multiple
                    ? ((selectedLabels[0] as string) ?? inputValue)
                    : inputValue
                }
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
              />
            </div>

            <FiChevronDown
              className={cn(
                "h-4 w-4 cursor-pointer text-gray-400 transition-transform",
                isOpen ? "rotate-180 transform" : "",
              )}
              onClick={() => {
                setIsOpen(!isOpen);
                if (!isOpen) {
                  inputRef.current?.focus();
                }
              }}
            />
          </div>

          {isOpen && (
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = multiple
                    ? Array.isArray(selectedValues) &&
                      selectedValues.includes(option.value)
                    : selectedValues === option.value;

                  return (
                    <button
                      key={option.value}
                      className={cn(
                        "flex cursor-pointer items-center px-3 py-2 hover:bg-gray-50",
                        isSelected && "bg-tertiary-blue",
                        disabled && "cursor-not-allowed opacity-50",
                      )}
                      type={autoSubmit ? "submit" : "button"}
                      onClick={() => toggleOption(option)}
                    >
                      {multiple && (
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded border",
                            isSelected
                              ? "border-tertiary-blue bg-tertiary-blue"
                              : "border-gray-300",
                          )}
                        >
                          {isSelected && (
                            <FiCheck className="h-3 w-3 text-white" />
                          )}
                        </div>
                      )}
                      <span className="text-sm text-gray-700">
                        {option.label}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No options found. Type to create a new option.
                </div>
              )}
            </div>
          )}
        </div>

        <ErrorMessage error={error} />
      </div>
    );
  },
);

export default FormModernAutocompleteInput;
