import { type ClassValue, clsx } from "clsx";
import { FieldErrors, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { KeyValueObject } from "$/types/native/utils.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDeepFormError<T extends FieldValues>(
  error: FieldErrors<T>,
  errorPath: string[],
) {
  let currentError: FieldErrors<T> | undefined = error as
    | FieldErrors<T>
    | undefined;
  for (const key of errorPath) {
    if (!currentError) {
      return undefined;
    }
    currentError = currentError[key] as FieldErrors<T>;
  }

  return currentError as FieldErrors<T>[keyof FieldErrors<T>];
}

export function isPrimitive(
  value: unknown,
): value is number | string | boolean {
  return value !== Object(value);
}

export function isKeyValObject(value: unknown): value is KeyValueObject {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function valueOrNothing<T>(condition: boolean, value: T) {
  return condition ? value : undefined;
}
