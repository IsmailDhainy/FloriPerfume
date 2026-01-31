import { useFormContext } from "react-hook-form";

import { cn } from "$/utils/functions/misc.functions";

import { getDeepFormErrorName } from "..";
import { BaseInputProps } from "../Factory";
import { ErrorMessage } from "./ErrorMessage";

const FormModernTextInput: React.FC<BaseInputProps> = ({
  name,
  label,
  placeholder,
  description,
  required,
  registerOptions,
  className,
  errorMessage,
  isReadOnly = false,
  labelClassName,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error =
    errors[name] ||
    getDeepFormErrorName(0, name, errors) ||
    getDeepFormErrorName(1, name, errors) ||
    errorMessage;

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <label
        htmlFor={name}
        className={`mb-1 text-sm font-medium text-gray-700 ${labelClassName}`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && (
        <p className="text-tertiary-gray mb-1 text-xs">{description}</p>
      )}
      <input
        id={name}
        type="text"
        placeholder={placeholder}
        readOnly={isReadOnly}
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

export default FormModernTextInput;
