import { useFormContext } from "react-hook-form";

import { cn } from "$/utils/functions/misc.functions";

import { BaseInputProps } from "../Factory";
import { ErrorMessage } from "./ErrorMessage";

const FormModernNumberInput: React.FC<
  BaseInputProps & { min?: number; max?: number }
> = ({
  name,
  label,
  placeholder,
  description,
  required,
  registerOptions,
  className,
  min,
  max,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && (
        <p className="text-tertiary-gray mb-1 text-xs">{description}</p>
      )}
      <input
        id={name}
        type="number"
        placeholder={placeholder}
        min={min}
        max={max}
        className={cn(
          "focus:ring-tertiary-blue rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none",
          error ? "border-red-500" : "border-tertiary-gray",
        )}
        {...register(name, registerOptions)}
      />
      <ErrorMessage error={error} />
    </div>
  );
};

export default FormModernNumberInput;
