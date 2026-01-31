import { RegisterOptions } from "react-hook-form";

// Base input props interface
export interface BaseInputProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  multiple?: boolean;
  registerOptions?: RegisterOptions;
  className?: string;
  errorMessage?: boolean;
  isReadOnly?: boolean;
  labelClassName?: string;
}
