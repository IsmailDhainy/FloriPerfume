import { ComponentProps, Key } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import { inputClassname } from "$/utils/constants/ui/general-input-classname.constant";
import { cn } from "$/utils/functions/misc.functions";

import InputWithLabel from "../raw-inputs/InputParent";
import TextareaInput from "../raw-inputs/TextareaInput";

type Props<T extends FieldValues> = ComponentProps<typeof TextareaInput> & {
  name: Path<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  label?: string;
  wrapperClassName?: string;
  hideLabel?: boolean;
  inputClassName?: string;
  icon?: React.ReactNode;
  inputKey?: Key | null;
};

const FormTextareaInput = <T extends FieldValues>({
  name,
  registerOptions,
  className,
  wrapperClassName,
  hideLabel = true,
  label,
  inputKey: key,
  ...inputProps
}: Props<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const hasError = !!errors[name];

  return (
    <InputWithLabel
      key={key}
      name={name}
      label={label ?? ""}
      hideLabel={hideLabel}
      className={cn("w-full min-w-80 flex-grow", wrapperClassName)}
    >
      <TextareaInput
        {...inputProps}
        className={cn(
          hasError && "!focus:border-red-500 !border-red-500 !text-red-500",
          "h-full",
          inputClassname,
          className,
        )}
        {...register(name, registerOptions)}
      />
      {hasError && (
        <span className="text-xs font-medium text-red-500">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </InputWithLabel>
  );
};

export default FormTextareaInput;
