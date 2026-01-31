import { SVGProps } from "react";

interface ExtendedSVGProps extends SVGProps<SVGSVGElement> {
  showLine?: boolean;
}

// const EyeIcon = ({ className: _, showLine, ...props }: ExtendedSVGProps) => {
const EyeIcon = ({ showLine, ...props }: ExtendedSVGProps) => {
  return (
    <div className="relative w-fit">
      <svg
        width="13"
        height="8"
        viewBox="0 0 13 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M6.5 0.125488C4.01621 0.125488 1.76378 1.48439 0.101718 3.69161C-0.0339061 3.87245 -0.0339061 4.12508 0.101718 4.30591C1.76378 6.51579 4.01621 7.8747 6.5 7.8747C8.98379 7.8747 11.2362 6.51579 12.8983 4.30857C13.0339 4.12774 13.0339 3.8751 12.8983 3.69427C11.2362 1.48439 8.98379 0.125488 6.5 0.125488ZM6.67817 6.72854C5.02941 6.83225 3.66784 5.47335 3.77156 3.82192C3.85665 2.46036 4.96026 1.35675 6.32183 1.27165C7.97059 1.16793 9.33216 2.52684 9.22844 4.17827C9.14069 5.53717 8.03708 6.64078 6.67817 6.72854ZM6.59573 5.46803C5.70753 5.52387 4.97356 4.79256 5.03206 3.90436C5.07727 3.17039 5.67296 2.57737 6.40692 2.5295C7.29513 2.47365 8.0291 3.20496 7.97059 4.09317C7.92273 4.82979 7.32704 5.42282 6.59573 5.46803Z"
          fill="#FFF"
        />
      </svg>

      <div
        title="showLine"
        className={`absolute top-1/2 left-1/2 h-0.5 w-4 origin-center -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full !bg-white transition-all ${
          showLine ? "scale-x-100" : "scale-x-0"
        }`}
      ></div>
    </div>
  );
};

export default EyeIcon;
