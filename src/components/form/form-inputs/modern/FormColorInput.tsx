import { useFormContext } from "react-hook-form";

import { cn } from "$/utils/functions/misc.functions";

import { BaseInputProps } from "../Factory";
import { ErrorMessage } from "./ErrorMessage";

const FormModernColorInput: React.FC<BaseInputProps> = ({
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
        <p className="text-tertiary-gray mb-1 text-xs">{description}</p>
      )}
      <div className="h-fit w-fit overflow-hidden rounded-full">
        <input
          id={name}
          type="color"
          className={cn(
            "focus:ring-tertiary-blue h-[42px] w-11 scale-150 focus:border-transparent focus:ring-2 focus:outline-none",
            error ? "border-red-500" : "border-tertiary-gray",
          )}
          {...register(name, registerOptions)}
        />
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

export default FormModernColorInput;
