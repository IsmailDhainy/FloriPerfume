import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"textarea">, "type">;

const TextareaInput = forwardRef<HTMLTextAreaElement, Props>(
  ({ ...inputProps }, forwardedRef) => {
    return (
      <textarea
        className="border border-red-400"
        ref={forwardedRef}
        {...inputProps}
      />
    );
  },
);

TextareaInput.displayName = "TextAreaInput";

export default TextareaInput;
