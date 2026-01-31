import type { FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import { FormInput } from "$/types/native/utils.types";
import { getDeepFormError } from "$/utils/functions/misc.functions";

import ColorInput from "../raw-inputs/ColorInput";

type Props<T extends FieldValues> = FormInput<T> & {
  placeholder?: string;
  className?: string;
  hideLabel?: boolean;
  readonly?: boolean;
};

export default function FormColorInput<T extends FieldValues>({
  name,
  label,
  hideLabel,
  placeholder,
  className,
  readonly,
  ...registerOptions
}: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = getDeepFormError(errors, name.split("."));

  return (
    <ColorInput
      {...register(name, registerOptions)}
      label={label}
      hideLabel={hideLabel}
      error={error?.message?.toString()}
      placeholder={placeholder}
      readOnly={readonly}
      className={className}
    />
  );
}
