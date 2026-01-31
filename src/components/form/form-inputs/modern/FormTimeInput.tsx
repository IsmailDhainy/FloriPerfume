import { useFormContext } from "react-hook-form";

import { cn } from "$/utils/functions/misc.functions";

import { BaseInputProps } from "../Factory";
import { ErrorMessage } from "./ErrorMessage";

// Form Time Input
const FormModernTimeInput: React.FC<BaseInputProps> = ({
  name,
  label,
  description,
  required,
  registerOptions,
  className,
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
        <p className="mb-1 text-xs text-gray-500">{description}</p>
      )}
      <input
        id={name}
        type="time"
        className={cn(
          "focus:ring-tertiary-blue rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none",
          error ? "border-red-500" : "border-gray-300",
        )}
        {...register(name, registerOptions)}
      />
      <ErrorMessage error={error} />
    </div>
  );
};
export default FormModernTimeInput;
