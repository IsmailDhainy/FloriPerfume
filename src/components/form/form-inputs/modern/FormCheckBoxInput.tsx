import { useFormContext } from "react-hook-form";

import { cn } from "$/utils/functions/misc.functions";

import { BaseInputProps } from "../Factory";
import { ErrorMessage } from "./ErrorMessage";

// Form Checkbox Input
const FormModernCheckboxInput: React.FC<
  BaseInputProps & {
    onChange?: (value?: boolean) => void;
  }
> = ({
  name,
  label,
  description,
  required,
  registerOptions,
  className,
  onChange,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={cn("flex w-full items-start", className)}>
      <div className="flex h-5 items-center">
        <input
          id={name}
          type="checkbox"
          className={cn(
            `text-tertiary-blue focus:ring-tertiary-blue border-tertiary-gray h-4 w-4 rounded`,
            error && "border-red-500",
          )}
          {...register(name, registerOptions)}
          onChange={(e) => {
            if (onChange) {
              setValue(name, e.target.checked);
              onChange(e.target.checked);
            }
          }}
          {...(error && { "aria-invalid": true })}
          {...(error && { "aria-errormessage": `${name}-error` })}
          {...(error && { "aria-describedby": `${name}-error` })}
          {...(error && { "aria-required": required })}
          {...(error && { "aria-labelledby": `${name}-label` })}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={name} className="font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {description && <p className="text-xs text-gray-500">{description}</p>}
        <ErrorMessage error={error} />
      </div>
    </div>
  );
};
export default FormModernCheckboxInput;
