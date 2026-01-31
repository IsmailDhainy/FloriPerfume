import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "../../../utils/functions/misc.functions";
import Button from "../Button";
import Flexbox from "../Flexbox";
import {
  calendarEntries,
  compareDates,
  dateNames,
  monthNames,
} from "./date.function";

type MapCalendarProps = {
  onDate?: (
    startDate: Date,
    endDate: Date | undefined,
    finalSubmit?: boolean,
  ) => void;
  firstDate?: Date;
  lastDate?: Date;
  disabledDaysAfterYesterday?: number;
  onCancel?: () => void;
  singleDate?: boolean;
  automaticApply?: boolean;
  preventFutureDate?: boolean;
  defaultValue?:
    | {
        startDate: Date;
        endDate?: Date;
      }
    | Date
    | string;
};
/**
 * Number of days after yesterday that should be disabled
 * @param disabledDaysAfterYesterday
 */

export const MultiDatePicker = ({
  onDate,
  firstDate,
  lastDate,
  disabledDaysAfterYesterday = 0,
  defaultValue,
  onCancel,
  singleDate = false,
  automaticApply = false,
  preventFutureDate = false,
}: MapCalendarProps) => {
  const MIN_YEAR = 1900;

  const validateYear = (year: number) => Math.max(MIN_YEAR, year);
  const [date, setDate] = useState<Date>(
    singleDate ? (defaultValue as Date) || new Date() : new Date(), // Default to current date
  );
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();
  const entries = calendarEntries(year, month);
  const [yearInputMode, setYearInputMode] = useState(false);
  const [inputValue, setInputValue] = useState(year.toString());
  const [monthInputMode, setMonthInputMode] = useState(false);

  const [startDate, setStartDate] = useState<Date | undefined>(firstDate);
  const [endDate, setEndDate] = useState<Date | undefined>(lastDate);
  const [hoverDate, setHoverDate] = useState<Date>();

  const today = new Date();

  const isFutureDate = (entryDate: { date: number; month: number }) => {
    const checkDate = new Date(year, entryDate.month, entryDate.date);
    return preventFutureDate && checkDate > today;
  };

  today.setHours(0, 0, 0, 0);
  const isBeforeToday = (entryDate: { date: number; month: number }) => {
    if (disabledDaysAfterYesterday === -1) return false;
    const extraDisabledDaysTime =
      disabledDaysAfterYesterday * 24 * 60 * 60 * 1000;
    const checkDate = new Date(year, entryDate.month, entryDate.date);
    return checkDate.getTime() < today.getTime() + extraDisabledDaysTime;
  };
  const isDateInRange = (checkDate: Date) => {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const hover = hoverDate ? new Date(hoverDate) : undefined;
    const check = new Date(checkDate).getTime();

    if (start) {
      start.setDate(start.getDate() - 1);
    }

    const startTimestamp = start?.getTime();
    const endTimestamp = end?.getTime();
    const hoverTimestamp = hover?.getTime();

    if (startTimestamp && !endTimestamp && hoverTimestamp) {
      return (
        check >= Math.min(startTimestamp, hoverTimestamp) &&
        check <= Math.max(startTimestamp, hoverTimestamp)
      );
    }

    return (
      startTimestamp &&
      endTimestamp &&
      check >= Math.min(startTimestamp, endTimestamp) &&
      check <= Math.max(startTimestamp, endTimestamp)
    );
  };

  const handleDateClick = (entryDate: { date: number; month: number }) => {
    const newDate = new Date(Date.UTC(year, entryDate.month, entryDate.date));
    if (singleDate) {
      setStartDate(newDate);
      if (automaticApply) onDate?.(newDate, undefined);
      return;
    }

    if (!startDate || (startDate && endDate)) {
      setStartDate(newDate);
      setHoverDate(newDate);
      setEndDate(undefined);
      if (automaticApply) onDate?.(newDate, undefined);
    } else if (startDate && !endDate) {
      // if the start date is after the end date, swap them
      if (compareDates(newDate, startDate) === -1) {
        setEndDate(startDate);
        setStartDate(newDate);
        if (automaticApply) onDate?.(newDate, startDate);
      } else {
        setEndDate(newDate);
        if (automaticApply) onDate?.(startDate, newDate);
      }
    }
  };

  const handleDateHover = (entryDate: { month: number; date: number }) => {
    if (startDate && !endDate) {
      const newHoverDate = new Date(year, entryDate.month, entryDate.date);
      setHoverDate(newHoverDate);
    }
  };

  const handleCancel = () => {
    setStartDate(undefined);
    setEndDate(undefined);

    onCancel?.();
  };

  const handleApply = () => {
    if (startDate && endDate) {
      onDate?.(startDate, endDate, true);
    } else if (startDate) {
      onDate?.(startDate, undefined, true);
    }
  };

  useEffect(() => {
    const disabledDate = new Date();
    if (disabledDaysAfterYesterday === -1) return;
    disabledDate.setDate(
      disabledDate.getDate() + disabledDaysAfterYesterday - 1,
    );

    if (startDate && compareDates(startDate, disabledDate) === -1) {
      setStartDate(disabledDate);
    }
  }, [disabledDaysAfterYesterday, startDate]);

  useEffect(() => {
    if (defaultValue) {
      if (singleDate) {
        const validDate = new Date((defaultValue as Date) || new Date());
        validDate.setFullYear(validateYear(validDate.getFullYear()));
        setDate(validDate);
        setStartDate(validDate);
      } else {
        const dValue = defaultValue as { startDate: Date; endDate: Date };
        const validStartDate = new Date(dValue.startDate || new Date());
        validStartDate.setFullYear(validateYear(validStartDate.getFullYear()));
        setDate(validStartDate);
        setStartDate(validStartDate);

        if (dValue.endDate) {
          const validEndDate = new Date(dValue.endDate);
          validEndDate.setFullYear(validateYear(validEndDate.getFullYear()));
          setEndDate(validEndDate);
        } else {
          setEndDate(undefined);
          setHoverDate(undefined);
        }
      }
    } else {
      const now = new Date();
      setDate(now);
      setStartDate(singleDate ? now : undefined);
      setEndDate(undefined);
    }
  }, [defaultValue, singleDate]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleYearBlur = () => {
    if (inputValue.length === 4) {
      const newYear = validateYear(parseInt(inputValue, 10));
      setDate(new Date(newYear, month, day));
      setInputValue(newYear.toString());
    }
    setYearInputMode(false);
  };

  const handleYearKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.length === 4) {
      handleYearBlur();
    }
  };

  const handleMonthSelect = (selectedMonth: number) => {
    setDate(new Date(year, selectedMonth, day));
    setMonthInputMode(false);
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(
      month <= 0 ? year - 1 : year,
      month <= 0 ? 11 : month - 1,
      day,
    );

    if (newDate.getFullYear() >= MIN_YEAR) {
      setDate(newDate);
    } else {
      // If going to previous month would result in a year < 1500,
      // set to January 1500
      setDate(new Date(MIN_YEAR, 0, day));
    }
  };

  const handleYearClick = () => {
    setYearInputMode(true);
  };
  const handleMonthClick = () => {
    setMonthInputMode(true);
  };

  useEffect(() => {
    setInputValue(year.toString());
  }, [year]);

  return (
    <Flexbox
      fullWidth
      className="13inch:max-w-60 13inch:p-3 relative max-w-80 rounded-2xl p-4 text-center select-none"
    >
      <Flexbox fullWidth align="center" justify="center">
        {/* Previous Month Button */}
        <Flexbox
          onClick={handlePreviousMonth}
          className={cn(
            "absolute left-0 cursor-pointer px-2 py-1",
            year <= MIN_YEAR && month === 0 && "cursor-not-allowed opacity-20",
          )}
        >
          <ChevronLeftIcon size={20} />
        </Flexbox>
        {/* Month and Year Selectors */}
        <Flexbox
          fullWidth
          row
          align="center"
          justify="center"
          className="gap-1"
        >
          <p className="cursor-pointer font-bold" onClick={handleMonthClick}>
            {monthNames[month]}
          </p>
          {monthInputMode && (
            <div className="relative">
              <ul className="slim-scrollbar absolute top-0 left-0 z-[200] max-h-40 overflow-y-auto rounded-md border bg-white shadow-md">
                {monthNames.map((monthName, index) => (
                  <li
                    key={index}
                    onClick={() => handleMonthSelect(index)}
                    className="hover:bg-tertiary-blue cursor-pointer px-2 py-1"
                  >
                    {monthName}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {yearInputMode ? (
            <input
              type="text"
              value={inputValue}
              onChange={handleYearChange}
              onBlur={handleYearBlur}
              onKeyDown={handleYearKeyPress}
              className="border-tertiary-blue w-16 border-b text-center font-bold focus:outline-none"
              autoFocus
              maxLength={4}
            />
          ) : (
            <p className="cursor-pointer font-bold" onClick={handleYearClick}>
              {year}
            </p>
          )}
        </Flexbox>
        {/* Next Month Button */}
        <Flexbox
          className="absolute right-0 cursor-pointer px-2 py-1"
          onClick={() => {
            setDate(
              new Date(
                month >= 11 ? year + 1 : year,
                month >= 11 ? 0 : month + 1,
                day,
              ),
            );
          }}
        >
          <ChevronLeftIcon size={20} className="rotate-180" />
        </Flexbox>
      </Flexbox>

      {/* Calendar Header */}
      <Flexbox
        fullWidth
        row
        className="grid-cols-7 items-center justify-center gap-1"
      >
        {dateNames.map((dateName) => (
          <p className="my-3 w-10 text-center text-xs" key={dateName}>
            {dateName.slice(0, 3)}.
          </p>
        ))}
      </Flexbox>

      {/* Calendar Body */}
      <Flexbox row className="grid-cols-7 grid-rows-5 flex-wrap justify-center">
        {entries.map((entry) => {
          const entryDate = new Date(year, entry.month, entry.date);
          const isPastDate = isBeforeToday({
            date: entry.date + 1,
            month: entry.month,
          });

          const isOtherMonths = entry.month !== month;
          const isActive =
            (startDate && compareDates(entryDate, startDate) == 1) ||
            (endDate && compareDates(entryDate, endDate) == 1);
          const isInRange = isDateInRange(entryDate);

          const isStartDate =
            startDate && compareDates(entryDate, startDate) === 1;

          const isEndDate = endDate && compareDates(entryDate, endDate) === 1;

          return (
            <button
              key={`${entry.month}-${entry.date}`}
              type="button"
              className={cn(
                "hover:bg-tertiary-blue 13inch:h-7 13inch:w-7 13inch:p-1 mt-1 h-10 w-10 cursor-pointer border-2 border-none p-2 text-center font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50",
                isPastDate && "text-gray-400",
                isInRange && !singleDate && "bg-tertiary-blue",
                (isStartDate || isEndDate) &&
                  "before:border-tertiary-blue before:bg-tertiary-blue relative border-2 text-white before:absolute before:inset-0 before:aspect-square before:h-full before:w-full before:scale-110 before:rounded-full before:border-2",
                isStartDate && "rounded-l-full",
                isEndDate && "rounded-r-full",
                isOtherMonths && "font-normal text-gray-400",
                singleDate && "rounded-full",
              )}
              disabled={isPastDate || isFutureDate(entry)}
              onClick={() => handleDateClick(entry)}
              onMouseEnter={() => handleDateHover(entry)}
            >
              <p
                color={isActive || isInRange ? "white" : "black"}
                className="13inch:text-font10 relative z-10 text-sm"
              >
                {entry.date}
              </p>
            </button>
          );
        })}
      </Flexbox>
      {!singleDate && (
        <Flexbox
          row
          fullWidth
          justify="end"
          className="13inch:mt-2 13inch:pt-0 mt-4 gap-3 border-t-2 pt-4"
        >
          <Button
            variant="outlined"
            className="flex items-center justify-center rounded-lg p-2 text-sm shadow-xl"
            onClick={handleCancel}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            type={!singleDate ? "submit" : "button"}
            className="flex items-center justify-center rounded-lg p-2 text-sm"
            disabled={!startDate}
            onClick={handleApply}
          >
            Appliquer
          </Button>
        </Flexbox>
      )}
    </Flexbox>
  );
};
