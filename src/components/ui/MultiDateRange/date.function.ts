export type DateInput = Date | string | number;

export const calendarEntries = (year: number, month: number) => {
  const weeks: { start: number; end: number }[] = [];
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const daysLength = endDate.getDate();

  let start = 1;
  let end;
  if (startDate.getDay() === 1) {
    end = 7;
  } else if (startDate.getDay() === 0) {
    start = new Date(year, month, 0).getDate() - 6 + 1;
    end = 1;
  } else {
    start = new Date(year, month, 0).getDate() + 1 - startDate.getDay() + 1;
    end = 7 - startDate.getDay() + 1;
    weeks.push({
      start: start,
      end: end,
    });
    start = end + 1;
    end = end + 7;
  }

  while (start <= daysLength) {
    weeks.push({
      start: start,
      end: end,
    });
    start = end + 1;
    end = end + 7;
    end = start === 1 && end === 8 ? 1 : end;
    if (end > daysLength && start <= daysLength) {
      end = end - daysLength;
      weeks.push({
        start: start,
        end: end,
      });
      break;
    }
  }

  return weeks.flatMap(({ start, end }, index) => {
    const sub = +(start > end && index === 0);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(year, month - sub, start + index);
      return {
        date: date.getDate(),
        month: date.getMonth(),
      };
    });
  });
};

export const compareDates = (date1: Date, date2: Date) => {
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);

  newDate1.setHours(0, 0, 0, 0);
  newDate2.setHours(0, 0, 0, 0);

  if (newDate1.getTime() > newDate2.getTime()) return 2;
  else if (newDate1.getTime() < newDate2.getTime()) return -1;
  else {
    return 1;
  }
};

export const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const dateNames = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
// different array because the first day of the week is Sunday
export const dayOfTheWeekDates = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

export function formatDayToFrenchWeekDay(date: DateInput) {
  const dateToFormat = new Date(date);

  return dayOfTheWeekDates[dateToFormat.getDay()];
}

export function formatDateToFrench(date: DateInput) {
  const dateToFormat = new Date(date);

  // example" 2 Julliet 2024

  const month = monthNames[dateToFormat.getMonth()];
  const day = dateToFormat.getDate();
  const year = dateToFormat.getFullYear();

  return `${day} ${month} ${year}`;
}

export function calculateDaysLeft(
  sinceDate: string,
  totalDays: number,
): string {
  try {
    const startDate = new Date(sinceDate);
    if (isNaN(startDate.getTime())) {
      return "";
    }

    const today = new Date();
    const timeElapsed = today.getTime() - startDate.getTime();
    const daysElapsed = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));

    const daysLeft = totalDays - daysElapsed;

    if (daysLeft > 1) {
      return `${daysLeft} jours`;
    } else if (daysLeft === 1) {
      return "Aujourd'hui";
    } else {
      return `Expiré`;
    }
  } catch (error) {
    return `Error: ${(error as Error).message}`;
  }
}
