import { useFormContext } from "react-hook-form";

import { cn } from "$/utils/functions/misc.functions";

import { BaseInputProps } from "../Factory";
import { ErrorMessage } from "./ErrorMessage";

const FormModernRangeInput: React.FC<
  BaseInputProps & { min?: number; max?: number }
> = ({
  name,
  label,
  description,
  required,
  registerOptions,
  className,
  min = 0,
  max = 100,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name) || min;
  const error = errors[name];

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && (
        <p className="mb-1 text-xs text-gray-500">{description}</p>
      )}
      <div className="flex items-center space-x-3">
        <input
          id={name}
          type="range"
          min={min}
          max={max}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
          {...register(name, registerOptions)}
        />
        <span className="text-sm font-medium text-gray-700">{value}</span>
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};
export default FormModernRangeInput;
