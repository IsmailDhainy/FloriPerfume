import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiEye, FiUploadCloud, FiX } from "react-icons/fi";

import { FileWithPreview } from "$/types/native/file.types";
import { cn } from "$/utils/functions/misc.functions";

import { BaseInputProps } from "../Factory";
import { ErrorMessage } from "./ErrorMessage";

const FormModernFileInput: React.FC<BaseInputProps & { accept?: string }> = ({
  name,
  label,
  description,
  required,
  registerOptions,
  className,
  multiple,
  accept,
  labelClassName,
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
  } = useFormContext();
  const [isDragging, setIsDragging] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [showPreview, setShowPreview] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const files = watch(name) as FileList | undefined;

  useEffect(() => {
    if (files) {
      const fileArray = Array.from(files);
      setPreviewFiles(fileArray);
    }
  }, [files]);

  const handleFiles = useCallback(
    (files: FileList) => {
      const fileArray = Array.from(files);
      setPreviewFiles((prev) =>
        multiple ? [...prev, ...fileArray] : fileArray.slice(0, 1),
      );
      setValue(name, files, { shouldValidate: true });
      clearErrors(name);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [multiple, name, setValue],
  );

  useEffect(() => {
    const dropArea = dropRef.current;
    if (!dropArea) return;

    const preventDefaults = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const highlight = () => setIsDragging(true);
    const unhighlight = () => setIsDragging(false);

    const handleDrop = (e: DragEvent) => {
      preventDefaults(e);
      setIsDragging(false);
      if (e.dataTransfer?.files) {
        handleFiles(e.dataTransfer.files);
      }
    };

    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea.addEventListener(eventName, highlight);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, unhighlight);
    });

    dropArea.addEventListener("drop", handleDrop);

    return () => {
      ["dragenter", "dragover"].forEach((eventName) => {
        dropArea.removeEventListener(eventName, highlight);
      });
      ["dragleave", "drop"].forEach((eventName) => {
        dropArea.removeEventListener(eventName, unhighlight);
      });
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, [handleFiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...previewFiles];
    newFiles.splice(index, 1);
    setPreviewFiles(newFiles);

    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => dataTransfer.items.add(file));
    setValue(name, dataTransfer.files, { shouldValidate: true });
  };

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <label
        htmlFor={name}
        className={`mb-1 text-sm font-medium text-gray-700 ${labelClassName}`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && (
        <p className="mb-2 text-xs text-gray-500">{description}</p>
      )}

      <input
        id={name}
        type="file"
        multiple={multiple}
        accept={accept}
        className="hidden"
        {...register(name, registerOptions)}
        onChange={handleChange}
        ref={inputRef}
      />

      <div
        ref={dropRef}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-all",
          isDragging
            ? "!border-tertiary-blue !bg-tertiary-blue"
            : errors[name]
              ? "!border-red-500"
              : "hover:!border-tertiary-blue !border-gray-300",
        )}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <FiUploadCloud
            className={cn(
              "h-8 w-8",
              isDragging ? "!text-tertiary-blue" : "!text-tertiary-gray",
            )}
          />
          <p className="text-sm !text-gray-600">
            Drag & drop files here or click to browse
          </p>
          <p className="text-xs !text-gray-400">
            {accept
              ? `Supported formats: ${accept}`
              : "All file types accepted"}
          </p>
        </div>
      </div>

      {previewFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm !text-gray-500">Selected files:</p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {previewFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="group relative overflow-hidden rounded-md border border-gray-200"
              >
                {file.type.startsWith("image/") ? (
                  <img
                    // src={
                    //   ((file as any).previewUrl as string) ||
                    //   URL.createObjectURL(file)
                    // }
                    src={
                      ((file as FileWithPreview).previewUrl as string) ||
                      URL.createObjectURL(file)
                    }
                    alt={file.name}
                    className="h-16 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-full items-center justify-center !bg-gray-100">
                    <span className="truncate px-1 text-xs !text-gray-500">
                      {file.name}
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  className="absolute top-1 right-1 cursor-pointer rounded-full !bg-white p-1 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <FiX className="h-3 w-3 text-red-500" />
                </button>
                <button
                  type="button"
                  className="absolute top-1 left-1 cursor-pointer rounded-full !bg-white p-1 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPreview(file);
                  }}
                >
                  <FiEye className="!text-tertiary-blue h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showPreview && (
        <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center !bg-black p-4">
          <div className="max-h-screen max-w-4xl overflow-auto rounded-lg !bg-white">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-medium">{showPreview.name}</h3>
              <button
                onClick={() => setShowPreview(null)}
                className="!text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              {showPreview.type.startsWith("image/") ? (
                <img
                  // src={
                  //   ((showPreview as any).previewUrl as string) ||
                  //   URL.createObjectURL(showPreview)
                  // }
                  src={
                    ((showPreview as FileWithPreview).previewUrl as string) ||
                    URL.createObjectURL(showPreview)
                  }
                  alt={showPreview.name}
                  className="mx-auto max-h-[70vh] max-w-full"
                />
              ) : (
                <div className="p-8 text-center">
                  <p className="!text-gray-500">
                    No preview available for this file type
                  </p>
                  <p className="mt-2 text-sm">{showPreview.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ErrorMessage error={errors[name]} />
    </div>
  );
};

export default FormModernFileInput;
