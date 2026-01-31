import { useFormContext } from "react-hook-form";

import { cn } from "$/utils/functions/misc.functions";

import { getDeepFormErrorName } from "..";
import { BaseInputProps } from "../Factory";
import { ErrorMessage } from "./ErrorMessage";

// Form Textarea Input
const FormModernTextareaInput: React.FC<
  BaseInputProps & {
    inputClassName?: string;
  }
> = ({
  name,
  label,
  placeholder,
  description,
  required,
  registerOptions,
  className,
  inputClassName,
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
    getDeepFormErrorName(1, name, errors);

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <label
        htmlFor={name}
        className={`mb-1 text-sm font-medium text-gray-700 ${labelClassName}`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && (
        <p className="mb-1 text-xs text-gray-500">{description}</p>
      )}
      <textarea
        readOnly={isReadOnly}
        id={name}
        placeholder={placeholder}
        className={cn(
          "focus:ring-tertiary-blue min-h-[100px] rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none",
          className,
          inputClassName,
          error ? "border-red-500" : "border-gray-300",
        )}
        {...register(name, registerOptions)}
      />
      <ErrorMessage error={error} />
    </div>
  );
};
export default FormModernTextareaInput;
