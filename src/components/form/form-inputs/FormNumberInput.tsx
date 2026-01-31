import { KeyboardEvent, useCallback, useMemo } from "react";
import type { FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import Flexbox from "$/components/ui/Flexbox";
import { FormInput } from "$/types/native/utils.types";
import { inputClassname } from "$/utils/constants/ui/general-input-classname.constant";
import { cn } from "$/utils/functions/misc.functions";

import InputWithLabel from "../raw-inputs/InputParent";
import TextInput from "../raw-inputs/TextInput";

type Props<T extends FieldValues> = FormInput<T> & {
  placeholder?: string;
  autoComplete?: boolean;
  className?: string;
  // priceCombination?: number | string;
  hideLabel?: boolean;
  wrapperClassName?: string;
  isPrice?: boolean;
  allowNegative?: boolean;
  isPaymentPrice?: boolean;
  frenchMode?: boolean;
};

const allowedKeyBoardKeys: string[] = [
  "Enter",
  "Backspace",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Tab",
  "Home",
  "End",
  "Control",
  "Shift",
  "CapsLock",
  "Escape",
  "Alt",
];

const FormNumberInput = <T extends FieldValues>({
  name,
  label,
  hideLabel,
  wrapperClassName,
  placeholder,
  min,
  max,
  isPrice,
  isPaymentPrice,
  className,
  maxLength,
  allowNegative = true,
  // priceCombination = 0,
  frenchMode = true,
  ...registerOptions
}: Props<T>) => {
  const {
    register,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext<T>();

  const handleMinMax = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const currentValue = Number((e.currentTarget as HTMLInputElement).value);
      if (!min && !max) return;
      const minV = Number(min);
      const maxV = Number(max);
      const maxLengthV = Number(maxLength ?? "15");
      const concatenatedNewValue = Number(currentValue.toString() + e.key);
      if (concatenatedNewValue < minV) {
        e.currentTarget.value = minV.toString().slice(0, maxLengthV);
        e.preventDefault();
      }
      if (concatenatedNewValue > maxV) {
        e.currentTarget.value = maxV.toString().slice(0, maxLengthV);
        e.preventDefault();
      }
      if (e.currentTarget.value.length < 1) {
        e.currentTarget.value = "0" + e.key;
        e.preventDefault();
      }
      if (
        e.currentTarget.value.length === 1 ||
        concatenatedNewValue < minV ||
        concatenatedNewValue > maxV
      )
        e.preventDefault();
    },
    [min, max, maxLength],
  );

  const allowedCharacters = useMemo(() => {
    let chars: string[] = [];
    if (!isPrice) chars.push(...["(", ")", ".", "+"]);
    if (isPaymentPrice) chars.push(...["."]);
    if (allowNegative) chars.push(...["-"]);
    if (!allowNegative) chars = [...[",", "."]];
    return chars;
  }, [isPrice, isPaymentPrice, allowNegative]);

  const onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const newCharacter = e.key;
      const maxLengthV = Number(maxLength ?? "15");

      if (e.ctrlKey || e.metaKey || allowedKeyBoardKeys.includes(e.key)) {
        return;
      }

      // Allow only allowed characters
      if (
        (!/^\d+$/.test(newCharacter) &&
          newCharacter !== (frenchMode ? "," : ".") &&
          !allowedCharacters.includes(newCharacter)) ||
        (e.currentTarget.value.replace(/\D/g, "").length >= maxLengthV &&
          /^\d+$/.test(newCharacter))
      ) {
        e.preventDefault();
      }
      handleMinMax(e);
    },
    [allowedCharacters, handleMinMax, frenchMode, maxLength],
  );

  const onInput: React.FormEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      clearErrors(name);
      let currentValue = (e.currentTarget as HTMLInputElement).value;

      if (frenchMode) {
        currentValue = currentValue.replace(/\./g, ",");
      }

      const regex = frenchMode ? /^-?\d*(,\d{0,15})?$/ : /^-?\d*(\.\d{0,15})?$/;
      if (!regex.test(currentValue)) {
        currentValue = currentValue
          .replace(/[^0-9,.-]/g, "")
          .replace(frenchMode ? /,+/g : /\.+/g, ",")
          .replace(/^([^,]*,).*$/, "$1");
      }

      e.currentTarget.value = currentValue;
    },
    [clearErrors, name, frenchMode],
  );

  const onPaste: React.ClipboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      clearErrors(name);
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text");

      let sanitizedValue = pastedData
        .replace(/[^\d.,-]/g, "")
        .replace(frenchMode ? /[.]/g : /[,]/g, frenchMode ? "," : ".");

      const regex = frenchMode ? /^-?\d*(,\d*)?$/ : /^-?\d*(\.\d*)?$/;
      if (!regex.test(sanitizedValue)) {
        sanitizedValue = sanitizedValue
          .split(frenchMode ? "," : ".")
          .slice(0, 2)
          .join(frenchMode ? "," : ".");
      }

      sanitizedValue = sanitizedValue.substring(0, 15);

      e.currentTarget.value = sanitizedValue;
    },
    [clearErrors, name, frenchMode],
  );

  const hasError = !!errors[name];

  return (
    <InputWithLabel
      name={name}
      label={label}
      className={cn(
        "tabletScreen:min-w-full w-full min-w-80 flex-grow",
        wrapperClassName,
      )}
      hideLabel={hideLabel}
    >
      <Flexbox className="w-full gap-1">
        <TextInput
          {...register(name, {
            ...registerOptions,
            maxLength: {
              value: 15,
              message: "Number cannot exceed 15 digits",
            },
            setValueAs: (value) =>
              frenchMode ? (value ? value.replace(/,/g, ".") : value) : value,
          })}
          placeholder={placeholder}
          defaultValue={
            frenchMode
              ? `${getValues(name)?.replace(/\./g, ",")}`
              : `${getValues(name)}`
          }
          onKeyDown={onKeyPress}
          onInput={onInput}
          onPaste={onPaste}
          className={cn(
            inputClassname,
            hasError &&
              "!focus:border-red-500 !border-[1px] !border-red-500 !text-red-500",
            className,
          )}
        />

        {hasError && (
          <span className="text-xs font-medium text-red-500">{`${errors[name]?.message}`}</span>
        )}
      </Flexbox>
    </InputWithLabel>
  );
};

export default FormNumberInput;
