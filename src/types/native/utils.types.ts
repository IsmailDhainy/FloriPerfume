import type {
  CSSProperties,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";
import type {
  FieldPath,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type ReactInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type BaseInput<O extends keyof ReactInputProps = never> = Omit<
  ReactInputProps,
  O | "type"
> & {
  label: string;
  hideLabel?: boolean;
  icon?: React.ReactNode;
  error?: string;
};

export type IconProps = {
  size?: CSSProperties["width"];
  fill?: CSSProperties["fill"];
  stroke?: CSSProperties["stroke"];
  className?: string;
};

export type FormInput<T extends FieldValues, P extends Path<T> = Path<T>> = {
  name: P;
  label: string;
} & RegisterOptions<T, P>;

export type headSize = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export type Item = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type GridContainer = {
  children: React.ReactNode;
  className?: string;
  cols?: number;
  rows?: number;
  gap?: number;
  rowGap?: number;
  colGap?: number;
};

export type FlexboxProps = {
  className?: string;
  row?: boolean;
  reverse?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  fullFlex?: boolean;
  justify?: "start" | "center" | "end" | "between" | "around";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
};

export type CustomInputProps<TFieldValues extends FieldValues> = {
  flexProps?: FlexboxProps;
  register?: UseFormRegister<TFieldValues>;
  id: FieldPath<TFieldValues>;
  type: string;
  placeholder: string;
  className?: string;
};

export type Field = {
  name: string;
  placeholder?: string;
  type: string;
  id?: string;
};

export type SelectItemProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
  selectItemIndicatorClassname?: string;
};

export type SizeUnit = "kb" | "mb" | "gb";
export type FileSize = `${number}${SizeUnit}`;

export type FileValidatorOptions = {
  required?: boolean;
  minSize?: FileSize;
  maxSize?: FileSize;
  minCount?: number;
  maxCount?: number;
  allowedFiles?: string[];
};

export type HandleFormFileListParams = {
  fileList: FileList | File[];
  oldFileList: FileList | (File | string)[];
  oldImagesPaths?: string[];
  ignoreOldFiles?: boolean;
  onDuplicateFiles?: (files: File[]) => void;
};
export type UserAgentData = {
  brands: string[];
  mobile: boolean;
  platform: string;
};

export type KeyValueObject<KeyType extends PropertyKey = PropertyKey> = Record<
  KeyType,
  unknown
>;

export const SortOrder = {
  ASC: "asc",
  DESC: "desc",
} as const;
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

export type Pagination = {
  offset: number;
  limit: number;
};
