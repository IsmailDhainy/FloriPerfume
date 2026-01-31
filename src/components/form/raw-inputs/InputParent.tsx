import { ComponentProps, PropsWithChildren } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import Flexbox from "$/components/ui/Flexbox";
import { cn } from "$/utils/functions/misc.functions";

import TextInput from "./TextInput";

type Props<T extends FieldValues> = ComponentProps<typeof TextInput> & {
  name: Path<T>;
  inputClassName?: string;
  registerOptions?: RegisterOptions<T, Path<T>>;
  icon?: React.ReactNode;
  label: string;
  hideLabel?: boolean;
  className?: string;
};
export default function InputWithLabel<T extends FieldValues>({
  label,
  name,
  hideLabel,
  className,
  children,
}: PropsWithChildren<Props<T>>) {
  const {
    formState: { errors },
  } = useFormContext<T>();

  const hasError = !!errors[name];

  return (
    <Flexbox
      className={cn("gap-1", className, hasError && "[&>*]:!border-red-500")}
    >
      {!hideLabel && <p className="text-sm font-medium text-white">{label}</p>}
      {children}
    </Flexbox>
  );
}
