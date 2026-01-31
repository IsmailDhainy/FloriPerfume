import { useEffect, useRef, useState } from "react";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";

import { MultiDatePicker } from "$/components/ui/MultiDateRange/MultiDateRange";
import { useOutsideClick } from "$/hooks/useOutsideClick";
import CalendarIcon from "$/icons/CalendarIcon";
import { formatDateString } from "$/utils/functions/date.functions";
import { cn, getDeepFormError } from "$/utils/functions/misc.functions";

type Props<T extends FieldValues> = {
  handleSetDateRange?: (
    startDate: Date,
    endDate: Date | undefined,
    finalSubmit?: boolean,
  ) => void;
  placeHolderClassName?: string;
  placeholder?: string;
  className?: string;
  automaticApply?: boolean;
  singleDate?: boolean;
  iconClassName?: string;
  calendarClassName?: string;
  isFormElement?: boolean;
  preventFutureDate?: boolean;
  name: Path<T>;
  icon?: React.ReactNode;
  handleSetClear?: () => void;
  disableFormClearance?: boolean;
  hidePlaceholder?: boolean;
  defaultOuterValue?: Date | { startDate: Date; endDate: Date };
};

const FormDateInput = <T extends FieldValues>({
  handleSetDateRange,
  placeholder = "Sélectionner une date",
  hidePlaceholder,
  className,
  automaticApply = true,
  iconClassName,
  singleDate,
  defaultOuterValue,
  calendarClassName,
  isFormElement = false,
  preventFutureDate,
  handleSetClear,
  disableFormClearance,
  name,
  icon,
  placeHolderClassName,
}: Props<T>) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [appliedStartDate, setAppliedStartDate] = useState<Date>();
  const [appliedEndDate, setAppliedEndDate] = useState<Date>();
  const formContext = useFormContext<T>();
  const defaultValue = isFormElement && formContext.watch(name);

  const handleDateChange = (
    startDate: Date,
    endDate: Date | undefined,
    finalSubmit?: boolean,
  ) => {
    handleSetDateRange?.(startDate, endDate, finalSubmit);
    setStartDate(startDate);
    setEndDate(endDate);
    if (isFormElement && name) {
      formContext.setValue(
        name,
        singleDate
          ? (startDate as PathValue<T, Path<T>>)
          : ({ startDate, endDate } as PathValue<T, Path<T>>),
      );
      formContext.clearErrors(name);
    }
    if (finalSubmit) {
      setAppliedStartDate(startDate);
      setAppliedEndDate(endDate);
      setOpen(false);
    }
  };

  const error = getDeepFormError(
    isFormElement ? formContext.formState.errors : {},
    name.split("."),
  );

  useEffect(() => {
    // TORECHECK: DEPENDENCIES
    if (isFormElement && name) {
      formContext.setValue(
        name,
        (defaultValue as PathValue<T, Path<T>>) ??
          ("" as PathValue<T, Path<T>>),
      );
    }

    if (defaultValue) {
      if (singleDate) {
        setStartDate(new Date(defaultValue));
      } else {
        setStartDate(defaultValue.startDate);
        setEndDate(defaultValue.endDate);
      }
    }
    if (defaultOuterValue) {
      if (singleDate) {
        setStartDate(defaultOuterValue as Date);
      } else {
        const objectDate = defaultOuterValue as {
          startDate: Date;
          endDate: Date;
        };
        setStartDate(objectDate.startDate);
        setEndDate(objectDate.endDate);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClear = () => {
    setOpen(false);
    setStartDate(undefined);
    setEndDate(undefined);
    handleSetClear?.();
    setAppliedStartDate(undefined);
    setAppliedEndDate(undefined);
    formContext.setValue(name, "" as PathValue<T, Path<T>>);
  };

  const handleOutsideFn = () => {
    setOpen(false);
    if (appliedStartDate) {
      setStartDate(appliedStartDate);
      setEndDate(appliedEndDate);
      if (isFormElement) {
        formContext.setValue(
          name,
          singleDate
            ? (appliedStartDate as PathValue<T, Path<T>>)
            : ({
                startDate: appliedStartDate,
                endDate: appliedEndDate,
              } as PathValue<T, Path<T>>),
        );
      }
    } else if (startDate) {
      if (isFormElement) {
        formContext.setValue(
          name,
          singleDate
            ? (startDate as PathValue<T, Path<T>>)
            : ({
                startDate: startDate,
                endDate: endDate,
              } as PathValue<T, Path<T>>),
        );
      }
    } else {
      if (!disableFormClearance && isFormElement) {
        formContext.setValue(name, "" as PathValue<T, Path<T>>);
        setStartDate(undefined);
        setEndDate(undefined);
      }
    }
  };
  useOutsideClick(handleOutsideFn, datePickerRef);

  useEffect(() => {
    if (!open) {
      handleOutsideFn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  return (
    <>
      <div
        ref={datePickerRef}
        className={cn(
          "secondary-body-caption border-lightGray-input border-gray-border relative flex h-12 w-full cursor-pointer items-center gap-2 border-1 bg-transparent p-2.5 px-4 py-[11px] text-black active:opacity-100",
          className,
          error && "!border-red-500 !text-red-500 [&>svg>g>path]:!fill-red-500",
          !startDate && !endDate ? placeHolderClassName : "",
        )}
        onClick={() => setOpen(!open)}
      >
        {icon ?? (
          <CalendarIcon width={17} fill="black" className={iconClassName} />
        )}
        {singleDate ? (
          <p className={cn("leading-3")}>
            {singleDate
              ? startDate
                ? formatDateString(startDate.toString())
                : !hidePlaceholder && placeholder
              : null}
          </p>
        ) : (
          <div className="flex w-full flex-col">
            {!startDate && !endDate ? (
              !hidePlaceholder && placeholder
            ) : (
              <>
                {startDate && (
                  <p className="text-[11px]">
                    {formatDateString(startDate.toString())}
                  </p>
                )}
                {endDate && (
                  <p className="text-[11px]">
                    {formatDateString(endDate.toString())}
                  </p>
                )}
              </>
            )}
          </div>
        )}
        <div
          className={cn(
            "shadow-date absolute top-full right-0 z-[101] mt-3 rounded-2xl bg-white",
            !open && "hidden",
            calendarClassName,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <MultiDatePicker
            defaultValue={
              defaultOuterValue
                ? defaultOuterValue
                : ((defaultValue as {
                    startDate: Date;
                    endDate?: Date;
                  }) ?? null)
            }
            onCancel={() => handleClear()}
            automaticApply={automaticApply}
            disabledDaysAfterYesterday={-1}
            preventFutureDate={preventFutureDate}
            onDate={handleDateChange}
            singleDate={singleDate}
            firstDate={defaultValue ? defaultValue.startDate : null}
            lastDate={defaultValue ? defaultValue.endDate : null}
          />
        </div>
      </div>
      {!!error && (
        <span className="text-xs font-medium text-red-500">
          {error.message?.toString()}
        </span>
      )}
    </>
  );
};

FormDateInput.displayName = "FormDateInput";
export default FormDateInput;
