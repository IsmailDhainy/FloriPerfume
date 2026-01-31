import { IconProps } from "$/types/native/utils.types";

export const EyeIcon = ({
  className,
  width,
}: IconProps & { width?: string }) => (
  <svg
    className={className}
    width={width || "20"}
    height={width || "20"}
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 24 24"
  >
    <path d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-2.83-.83a4 4 0 1 1 5.66 5.66 4 4 0 0 1-5.66-5.66Z" />
    <path d="M3.08 12A9.64 9.64 0 0 0 12 18a9.64 9.64 0 0 0 8.92-6A9.64 9.64 0 0 0 12 6a9.64 9.64 0 0 0-8.92 6Zm-2.01-.36A11.67 11.67 0 0 1 12 4c5.12 0 9.2 3.2 10.93 7.64.1.23.1.49 0 .72A11.67 11.67 0 0 1 12 20c-5.12 0-9.2-3.2-10.93-7.64a1 1 0 0 1 0-.72Z" />
  </svg>
);
