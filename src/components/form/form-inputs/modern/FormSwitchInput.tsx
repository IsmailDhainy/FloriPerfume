import { useFormContext } from "react-hook-form";

import { cn } from "$/utils/functions/misc.functions";

import { BaseInputProps } from "../Factory";
import { ErrorMessage } from "./ErrorMessage";

interface FormModernSwitchInputProps extends BaseInputProps {
  isFormElement?: boolean;
  onChange?: (value: boolean) => void;
}

const FormModernSwitchInput: React.FC<FormModernSwitchInputProps> = ({
  name,
  label,
  description,
  required,
  registerOptions,
  className,
  isFormElement = true,
  onChange,
}) => {
  const formContext = useFormContext();
  const register = formContext?.register;
  const watch = formContext?.watch;
  const setValue = formContext?.setValue;
  const errors = formContext?.formState?.errors;

  const value = isFormElement ? watch(name) || false : undefined;
  const error = isFormElement ? errors[name] : undefined;

  const toggleSwitch = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFormElement) {
      setValue(name, !value, { shouldValidate: true });
    } else if (onChange) {
      onChange(!value);
    }
  };

  return (
    <div className={cn("flex w-full items-start justify-between", className)}>
      <div className="flex-1">
        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleSwitch}
            className={cn(
              "relative inline-flex h-[10px] w-[20px] items-center rounded-full transition-colors",
              value ? "!bg-tertiary-blue" : "!bg-gray-300",
            )}
          >
            <span
              className={cn(
                "absolute left-[10px] h-[15px] w-[15px] rounded-full bg-white transition-transform",
                value ? "translate-x-[25px]" : "translate-x-0",
              )}
            />
          </button>

          <label
            htmlFor={name}
            className="ml-[10px] cursor-pointer text-sm font-medium !text-gray-700"
            onClick={toggleSwitch}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        </div>

        {description && (
          <p className="mt-[10px] text-xs !text-gray-500">{description}</p>
        )}
      </div>

      {isFormElement && (
        <input
          id={name}
          type="checkbox"
          className="hidden"
          checked={value}
          {...register(name, registerOptions)}
        />
      )}

      {isFormElement && <ErrorMessage error={error} />}
    </div>
  );
};

export default FormModernSwitchInput;
