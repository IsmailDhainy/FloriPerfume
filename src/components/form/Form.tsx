import { zodResolver } from "@hookform/resolvers/zod";
import type { ComponentProps, PropsWithChildren } from "react";
import type {
  FieldValues,
  Resolver,
  SubmitErrorHandler,
  UseFormHandleSubmit,
  UseFormProps,
} from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";

import { cn } from "$/utils/functions/misc.functions";

type FormProps<
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues = TFieldValues,
> = Omit<ComponentProps<"form">, "onSubmit"> & {
  className?: string;
  isLoading?: boolean;
  resolverSchema?: Parameters<typeof zodResolver>[0];
  options?: Omit<
    UseFormProps<TFieldValues, TContext>,
    "resolver" | "formControl"
  >;
  onSubmit: Parameters<
    UseFormHandleSubmit<TFieldValues, TTransformedValues>
  >[0];
  onSubmitError?: SubmitErrorHandler<TFieldValues>;
};
export default function Form<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues = TFieldValues,
>({
  className,
  resolverSchema,
  options,
  onSubmit,
  onSubmitError,
  children,
  isLoading,
  ...formProps
}: PropsWithChildren<FormProps<TFieldValues, TContext, TTransformedValues>>) {
  const methods = useForm<TFieldValues, TContext, TTransformedValues>({
    ...options,
    resolver: resolverSchema
      ? (zodResolver(resolverSchema) as unknown as Resolver<
          TFieldValues,
          TContext,
          TTransformedValues
        >)
      : undefined,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        className={cn(className, isLoading && "pointer-events-none opacity-50")}
        onSubmit={handleSubmit(onSubmit, onSubmitError)}
        {...formProps}
      >
        {children}
      </form>
    </FormProvider>
  );
}
