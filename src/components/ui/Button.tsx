import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type PropsWithChildren,
  forwardRef,
  useEffect,
  useState,
} from "react";

import { cn } from "../../utils/functions/misc.functions";
import FireWorks from "./FireWorks";
import BtnSpinner from "./Loaders/BtnSpinner";

type Props = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "ref"
> & {
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  isTableButton?: boolean;
  // submit?: boolean;
  withAnimation?: boolean;
  variant?: "primary" | "outlined" | "faded" | "text";
};

const primaryVariantClassName =
  "!bg-tertiary-blue text-white border-2 border-tertiary-blue hover:!bg-white hover:!text-tertiary-blue";
const outlinedVariantClassName =
  "!bg-white border-2 border-tertiary-gray !text-tertiary-gray hover:!bg-tertiary-gray hover:!text-white";
const fadedVariantClassName =
  "border-2 !border-primary-orange !bg-primary-orange !text-white hover:!bg-white hover:!text-primary-orange";
const textVariantClassName =
  "text-black items-start justify-start px-2 py-0 hover:bg-tertiary-blue disabled:hover:bg-white disabled:pointer-events-none rounded-md";
const errorVariantClassName = "bg-red-600 text-white";

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  (
    {
      className,
      children,
      isLoading,
      withAnimation,
      // submit = false,
      isSuccess,
      isError,
      isTableButton = false,
      disabled,
      variant,
      type = "button",
      ...buttonProps
    },
    ref,
  ) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAnimatingError, setIsAnimatingError] = useState(false);

    useEffect(() => {
      if (!isLoading && isSuccess) {
        setIsAnimating(true);
        const timer = setTimeout(() => {
          setIsAnimating(false);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }, [isLoading, isSuccess]);

    useEffect(() => {
      if (!isLoading && isError) {
        setIsAnimatingError(true);
        const timer = setTimeout(() => {
          setIsAnimatingError(false);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }, [isLoading, isError]);

    return (
      <button
        ref={ref}
        type={type ?? "button"}
        {...buttonProps}
        className={cn(
          `flew-row flex w-full cursor-pointer items-center justify-center gap-2 transition-all duration-200 active:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 ${
            isLoading ? "cursor-wait" : "disabled:cursor-not-allowed"
          }`,
          isTableButton && "disabled:-z-10",
          "space-x-2 !rounded-xl px-4 py-2 text-base whitespace-nowrap",
          variant === "primary" && primaryVariantClassName,
          variant === "outlined" && outlinedVariantClassName,
          variant === "faded" && fadedVariantClassName,
          variant === "text" && textVariantClassName,
          className,
          withAnimation && isAnimatingError && errorVariantClassName,
          withAnimation && isAnimatingError && "glitch-animation",
        )}
        disabled={disabled || isLoading}
      >
        {withAnimation ? (
          <>
            {(isLoading && !isSuccess) || (isLoading && !isError) ? (
              <BtnSpinner />
            ) : isAnimating ? (
              <FireWorks />
            ) : (
              children
            )}
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);
Button.displayName = "Button";

export default Button;
