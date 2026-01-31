import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  icon?: React.ReactNode;
  inputClassName?: string;
  checkbox?: boolean;
};

const ChoiceInput = forwardRef<HTMLInputElement, Props>(
  (
    { icon, inputClassName, className, checkbox = false, ...inputProps },
    forwardedRef,
  ) => {
    return (
      <div
        className={`custom-radio relative flex items-center gap-2 ${className}`}
      >
        <input
          ref={forwardedRef}
          type={checkbox ? "checkbox" : "radio"}
          {...inputProps}
          className={inputClassName}
        />
        {icon && <span className="absolute left-0">{icon}</span>}
      </div>
    );
  },
);

ChoiceInput.displayName = "ChoiceInput";

export default ChoiceInput;
