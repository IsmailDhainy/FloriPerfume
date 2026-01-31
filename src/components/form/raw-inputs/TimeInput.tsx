import { debounce } from "lodash";
import { ChevronsUpDown } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { useOutsideClick } from "$/hooks/useOutsideClick";
import { cn } from "$/utils/functions/misc.functions";

type Time = {
  hours: string;
  minutes: string;
};

type Props = {
  minuteStep?: number;
  disabled?: boolean;
  onChange?: (time: string) => void;
  defaultValue?: Date | string;
};

const TimeInput = ({ disabled, onChange, defaultValue, minuteStep }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);

  const [time, setTime] = useState<Time>({ hours: "", minutes: "" });
  const [showPopup, setShowPopup] = useState(false);

  const hoursArray = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  const minutesArray = Array.from({ length: 60 / (minuteStep || 1) }, (_, i) =>
    (i * (minuteStep || 1)).toString().padStart(2, "0"),
  );

  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editing && defaultValue) {
      let hours = "";
      let minutes = "";

      if (defaultValue instanceof Date) {
        hours = defaultValue.getHours().toString().padStart(2, "0");
        minutes = defaultValue.getMinutes().toString().padStart(2, "0");
      } else if (typeof defaultValue === "string") {
        [hours, minutes] = defaultValue.split(":");
      }

      setTime({ hours, minutes });
    }
  }, [defaultValue, editing]);

  const togglePopup = () => setShowPopup((prev) => !prev);

  const handleBeforeChangeDebounced = debounce(
    (hour: string, minute: string) => {
      const validHour =
        hour.length > 1 ? hour : !hour.length ? "00" : `0${hour}`;
      const validMinute =
        minute.length > 1 ? minute : !minute.length ? "00" : `0${minute}`;

      onChange?.(`${validHour}:${validMinute}`);
    },
    300,
  );

  const handleTimeChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: "hours" | "minutes",
  ) => {
    setEditing(true);

    const value = e.target.value.replace(/\D/g, "");

    if (field === "hours") {
      if (value.length <= 2 && (value === "" || Number(value) <= 23)) {
        setTime((prev) => {
          const updatedTime = { ...prev, hours: value };
          handleBeforeChangeDebounced(updatedTime.hours, updatedTime.minutes);
          return updatedTime;
        });
      }
    } else if (field === "minutes") {
      if (value.length <= 2 && (value === "" || Number(value) <= 59)) {
        setTime((prev) => {
          const updatedTime = { ...prev, minutes: value };
          handleBeforeChangeDebounced(updatedTime.hours, updatedTime.minutes);
          return updatedTime;
        });
      }
    }
  };

  const handleBlur = (field: "hours" | "minutes") => {
    setTime((prev) => {
      let value = field === "hours" ? prev.hours : prev.minutes;

      const isValid =
        field === "hours"
          ? Number(value) >= 0 && Number(value) <= 23
          : Number(value) >= 0 && Number(value) <= 59;

      if (value.length === 1) {
        value = `0${value}`;
      }

      const updatedTime = isValid
        ? { ...prev, [field]: value }
        : { ...prev, [field]: field === "hours" ? "00" : "00" };
      handleBeforeChangeDebounced(updatedTime.hours, updatedTime.minutes);
      return updatedTime;
    });
  };

  const selectTimeFromPopup = (value: string, field: "hours" | "minutes") => {
    setTime((prev) => {
      const updatedTime = { ...prev, [field]: value };
      handleBeforeChangeDebounced(updatedTime.hours, updatedTime.minutes);
      return updatedTime;
    });
    setShowPopup(false);
  };

  const calculateScrollTop = (
    index: number,
    type: "hours" | "minutes",
    ref: React.RefObject<HTMLDivElement | null> | null,
  ): number => {
    const items = ref?.current?.children as HTMLCollectionOf<HTMLElement>;
    if (index < 0 || !items || !items[index]) return 0;

    const itemOffsetTop = items[index].offsetTop;
    const isLastItem =
      (type === "hours" && index === 23) ||
      (type === "minutes" && index === 59);
    const isNearBottom =
      (type === "hours" && index >= 21) || (type === "minutes" && index >= 57);

    let scrollTop = itemOffsetTop - (isNearBottom ? 40 : 4);

    if (isLastItem && ref?.current) {
      scrollTop = ref.current.scrollHeight;
    }

    return scrollTop;
  };

  useEffect(() => {
    if (showPopup) {
      const hoursIndex = hoursArray.indexOf(time.hours || "00");
      const minutesIndex = minutesArray.indexOf(time.minutes || "00");

      if (hoursIndex >= 0) {
        const hoursScrollTop = calculateScrollTop(
          hoursIndex,
          "hours",
          hoursRef,
        );
        hoursRef.current?.scrollTo({ top: hoursScrollTop });
      }

      if (minutesIndex >= 0) {
        const minutesScrollTop = calculateScrollTop(
          minutesIndex,
          "minutes",
          minutesRef,
        );
        minutesRef.current?.scrollTo({ top: minutesScrollTop });
      }
    }
  }, [showPopup, time.hours, time.minutes, hoursArray, minutesArray]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "hours" | "minutes",
  ) => {
    let newValue = Number(time[field]);

    if (e.key === "ArrowUp") {
      newValue++;
      if (field === "hours" && newValue > 23) newValue = 0;
      if (field === "minutes" && newValue > 59) newValue = 0;
    } else if (e.key === "ArrowDown") {
      newValue--;
      if (field === "hours" && newValue < 0) newValue = 23;
      if (field === "minutes" && newValue < 0) newValue = 59;
    } else {
      return;
    }

    e.preventDefault();

    setTime((prev) => {
      const updatedTime = {
        ...prev,
        [field]: newValue.toString().padStart(2, "0"),
      };
      handleBeforeChangeDebounced(updatedTime.hours, updatedTime.minutes);
      return updatedTime;
    });
  };
  useOutsideClick(() => {
    setShowPopup(false);
  }, ref);

  return (
    <div
      className={cn(
        "relative inline-block",
        disabled && "pointer-events-none opacity-50",
      )}
      ref={ref}
    >
      <div className="input-container border-gray-shadow-light tabletScreen:p-1 flex items-center rounded-xl border-1 bg-white p-2.5">
        <input
          disabled={disabled}
          type="text"
          name="hour"
          value={time.hours || "--"}
          placeholder="--"
          onChange={(e) => handleTimeChange(e, "hours")}
          onBlur={() => handleBlur("hours")}
          onKeyDown={(e) => handleKeyDown(e, "hours")}
          className="time_input_box secondary-body-tag text-custom-14 tabletScreen:text-[10px] m-0 w-5 border-none bg-transparent p-0 text-center shadow-none outline-none"
        />
        <span className="secondary-body-tag text-custom-12 tabletScreen:text-[10px]">
          {" "}
          :{" "}
        </span>
        <input
          disabled={disabled}
          type="text"
          name="minute"
          value={time.minutes || "--"}
          placeholder="--"
          onChange={(e) => handleTimeChange(e, "minutes")}
          onBlur={() => handleBlur("minutes")}
          onKeyDown={(e) => handleKeyDown(e, "minutes")}
          className="time_input_box secondary-body-tag text-custom-14 tabletScreen:text-[10px] m-0 w-5 border-none bg-transparent p-0 text-center shadow-none outline-none"
        />
        <button type="button" onClick={togglePopup} className="ml-2">
          <ChevronsUpDown />
        </button>
      </div>

      {showPopup && (
        <div className="absolute z-10 mt-2 flex w-max gap-1 rounded-lg border border-gray-400 bg-white p-1 shadow-lg">
          <div
            className="no-scrollbar h-40 max-h-[200px] w-12 cursor-pointer overflow-y-auto text-center"
            ref={hoursRef}
          >
            {hoursArray.map((hour) => {
              return (
                <div
                  key={hour}
                  className={`cursor-pointer rounded-sm p-2 ${
                    time.hours === hour
                      ? "bg-tertiary-blue text-white"
                      : "hover:bg-tertiary-blue"
                  } `}
                  onClick={() => selectTimeFromPopup(hour, "hours")}
                >
                  {hour}
                </div>
              );
            })}
          </div>
          <div
            className="scrollable-column no-scrollbar h-40 w-12 cursor-pointer overflow-y-auto text-center"
            ref={minutesRef}
          >
            {minutesArray.map((minute) => {
              return (
                <div
                  key={minute}
                  className={`cursor-pointer rounded-sm p-2 ${
                    time.minutes === minute
                      ? "bg-tertiary-blue text-white"
                      : "hover:bg-tertiary-blue"
                  } `}
                  onClick={() => selectTimeFromPopup(minute, "minutes")}
                >
                  {minute}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeInput;
