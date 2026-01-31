import { ComponentProps, Key, useState } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import { inputClassname } from "$/utils/constants/ui/general-input-classname.constant";
import { cn, getDeepFormError } from "$/utils/functions/misc.functions";

import InputWithLabel from "../raw-inputs/InputParent";
import TextInput from "../raw-inputs/TextInput";

export type FormTextInputProps<T extends FieldValues> = ComponentProps<
  typeof TextInput
> & {
  name: Path<T>;
  label?: string;
  wrapperClassName?: string;
  hideLabel?: boolean;
  inputClassName?: string;
  registerOptions?: RegisterOptions<T, Path<T>>;
  icon?: React.ReactNode;
  inputKey?: Key | null;
  isUppercased?: boolean;
};

export default function FormTextInput<T extends FieldValues>({
  name,
  label,
  wrapperClassName,
  hideLabel,
  registerOptions,
  className,
  inputClassName,
  icon,
  inputKey: key,
  isUppercased,
  ...inputProps
}: FormTextInputProps<T>) {
  const {
    register,
    formState: { errors },
    clearErrors,
    watch,
  } = useFormContext<T>();
  const [upperCaseValue, setUpperCaseValue] = useState<string>(
    watch(name) || "",
  );
  const error = getDeepFormError(errors, name.split("."));

  const { onChange, ...restRegister } = register(name, registerOptions);

  return (
    <InputWithLabel
      key={key}
      name={name}
      label={label ?? ""}
      hideLabel={hideLabel}
      className={cn(
        "tabletScreen:min-w-full w-full flex-grow",
        wrapperClassName,
      )}
    >
      <TextInput
        icon={icon}
        key={key}
        {...inputProps}
        inputClassName={inputClassName}
        className={cn(
          !!error &&
            "border-[1px] border-red-500 text-red-500 focus:border-red-500",
          inputClassname,
          className,
        )}
        {...restRegister}
        {...(isUppercased && { value: upperCaseValue })}
        onChange={(e) => {
          clearErrors(name);
          if (isUppercased) {
            setUpperCaseValue(e.target.value.toUpperCase());
            onChange({ target: { name, value: e.target.value.toUpperCase() } });
            return;
          }
          onChange(e);
        }}
      />
      {!!error && (
        <span className="text-xs font-medium text-red-500">
          {error.message?.toString()}
        </span>
      )}
    </InputWithLabel>
  );
}
