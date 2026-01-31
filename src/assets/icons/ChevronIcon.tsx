import { IconProps } from "$/types/native/utils.types";

const ChevronIcon = ({ className }: IconProps) => {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      className={className}
    >
      <path d="M11.3711 5.5575L7.93609 9L11.3711 12.4425L10.3136 13.5L5.81359 9L10.3136 4.5L11.3711 5.5575Z" />
    </svg>
  );
};

export default ChevronIcon;
