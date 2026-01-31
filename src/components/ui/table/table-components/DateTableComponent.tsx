import { formatDate } from "$/utils/functions/date.functions";

type Props = {
  value?: string | number | Date | null;
  fallbackValue?: string;
};
const DateTableComponent = ({ value, fallbackValue }: Props) => {
  const formattedValue = formatDate(value);
  if (!formattedValue) return <p>{fallbackValue ?? "-"}</p>;
  return <p>{formattedValue}</p>;
};

export default DateTableComponent;
