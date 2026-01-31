import { forwardRef, useCallback, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import { useOutsideClick } from "$/hooks/useOutsideClick";
import { FileSize } from "$/types/native/utils.types";
import { cn } from "$/utils/functions/misc.functions";

import FileInput from "./FileInput";

type Props = {
  label: string;
  name: string;
  hideLabel?: boolean;
  multiple?: boolean;
  allowedFiles?: string[];
  minSize?: FileSize;
  maxSize?: FileSize;
  excludeInvalidFiles?: boolean;
  preserveOldFiles?: boolean;
  className?: string;
  onFiles: (files: FileList) => void;
  onDuplicateFiles?: (files: File[]) => void;
  imagesPaths?: string[];
  withLabel?: boolean;
  inputParentClassName?: string;
  inputPlaceHolder?: string;
  iconClassName?: string;
  inputPlaceHolderClassName?: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  icon?: React.ReactNode;
  iconWrapperClassName?: string;
  disabled?: boolean;
  inputTextClassName?: string;
  fileTypeName?: string;
};

const ExtendedFileInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      withLabel = false,
      name,
      label,
      disabled,
      inputProps,
      inputPlaceHolderClassName,
      inputPlaceHolder,
      inputParentClassName,
      multiple,
      hideLabel,
      iconClassName,
      allowedFiles,
      minSize,
      maxSize = "5mb",
      excludeInvalidFiles = true,
      className,
      onFiles,
      icon,
      iconWrapperClassName,
    }: Props,
    forwardedRef,
  ) => {
    const formContext = useFormContext();
    const refDiv = useRef<HTMLDivElement | null>(null);
    const [isDraggingFile, setIsDraggingFile] = useState(false);
    const handleExitDrag = () => {
      setIsDraggingFile(false);
    };

    const handleFiles = useCallback(
      (fileList: FileList) => {
        onFiles(fileList);
      },
      [onFiles],
    );

    const handleOnFiles = (files: FileList) => {
      handleFiles(files);
      if (formContext) {
        const oldValues = formContext.getValues(name);
        const clearError = formContext.clearErrors;
        clearError(name);
        if (multiple) {
          if (oldValues?.length > 0) {
            formContext.setValue(name, [...Array.from(files), ...oldValues]);
          } else {
            formContext.setValue(name, Array.from(files));
          }
        } else {
          formContext.setValue(name, Array.from(files));
        }
      }
    };

    useOutsideClick(() => {
      setIsDraggingFile(false);
    }, refDiv);

    const errors = formContext ? formContext.formState.errors[name] : false;
    return (
      <div className={cn("flex w-full flex-col gap-2", className)} ref={refDiv}>
        <label className={cn(hideLabel && "sr-only")}>{label}</label>
        <div
          className={cn(
            "border-grey-preview relative !min-h-[276px] w-full cursor-pointer rounded-2xl",
            inputParentClassName,
            errors && "border-red-500",
          )}
        >
          <FileInput
            disabled={disabled}
            ref={forwardedRef}
            name={name}
            label={label}
            multiple={multiple}
            allowedFiles={allowedFiles}
            minSize={minSize}
            maxSize={maxSize}
            excludeInvalidFiles={excludeInvalidFiles}
            onDragEnter={() => setIsDraggingFile(true)}
            onDragLeave={handleExitDrag}
            onDrop={handleExitDrag}
            onFiles={handleOnFiles}
            allowDragAndDrop
            allowGlobalPaste
            className="peer absolute inset-0 opacity-0"
            {...inputProps}
          />
          <svg
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          >
            <rect
              x="2"
              y="2"
              width="99%"
              height="98%"
              rx="18"
              stroke="#cbd0dc"
              strokeWidth="4"
              strokeDasharray="12 12"
            />
          </svg>
          <div
            className={cn(
              "pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3 duration-150",
              isDraggingFile && "scale-0 opacity-0",
            )}
          >
            <div
              className={cn("bg-normal rounded-2xl p-0", iconWrapperClassName)}
            >
              {icon ?? <div className={iconClassName}>Default Upload Icon</div>}
            </div>
            {withLabel && (
              <p
                className={cn(
                  "text-normal w-full text-center",
                  inputPlaceHolderClassName,
                )}
              >
                {inputPlaceHolder ??
                  `Glisser-déposer ou sélectionner une photo à partir de votre
              ordinateur`}
              </p>
            )}

            <span className="text-tertiary-blue text-center font-light">
              Choisissez un fichier ou faites-le glisser ici
            </span>
            <span className="text-tertiary-gray text-center font-light">
              Formats JPEG, PNG, PDG et MP4, jusqu'à 50 Mo{" "}
            </span>
            <div className="border-tertiary-gray rounded-2xl border-2 px-4 py-2 font-semibold">
              Parcourir le fichier
            </div>
          </div>

          <div
            className={cn(
              "pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 duration-150",
              !isDraggingFile && "scale-0 opacity-0",
            )}
          >
            <p>Drop To Upload</p>
            <p>Drag icon</p>
            {/* <DragAndDropIcon width={100} height={100} /> */}
          </div>
        </div>
        {!!errors && (
          <span className="text-custom-12 mt-2 font-semibold text-red-500">
            {errors.message?.toString()}
          </span>
        )}
      </div>
    );
  },
);

ExtendedFileInput.displayName = "ExtendedFileInput";
export default ExtendedFileInput;
