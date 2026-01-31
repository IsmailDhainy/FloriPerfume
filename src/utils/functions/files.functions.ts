import objectHash from "object-hash";
import { z } from "zod";

import {
  FileSize,
  FileValidatorOptions,
  HandleFormFileListParams,
  SizeUnit,
} from "$/types/native/utils.types";

export function isValidFileType(file: File, allowedFiles: string[]) {
  if (allowedFiles.length > 0) {
    const starTypes = allowedFiles
      .filter((type) => type.includes("*"))
      .map((type) => type.split("/")[0]);

    if (
      !starTypes.includes(file.type.split("/")[0]) &&
      !allowedFiles.includes(file.type)
    )
      return false;
  }

  return true;
}

function formatFileSize(fileSize: number, unit: SizeUnit) {
  switch (unit) {
    case "kb":
      return fileSize / 1024;
    case "mb":
      return fileSize / (1024 * 1024);
    case "gb":
      return fileSize / (1024 * 1024 * 1024);
  }
}

export function isFileExceedingMaxSize(file: File, maxSize: FileSize) {
  const maxSizeValue = Number(maxSize.slice(0, -2));
  const maxSizeUnit = maxSize.slice(-2) as SizeUnit;
  const fileSize = formatFileSize(file.size, maxSizeUnit);

  return fileSize > maxSizeValue;
}

export function isFileBelowMinSize(file: File, minSize: FileSize) {
  const minSizeValue = Number(minSize.slice(0, -2));
  const minSizeUnit = minSize.slice(-2) as SizeUnit;
  const fileSize = formatFileSize(file.size, minSizeUnit);

  return fileSize < minSizeValue;
}

export function zodFilesValidator(options?: FileValidatorOptions) {
  return z
    .custom<FileList | File[] | undefined | null>()
    .superRefine((fileList, ctx) => {
      if (!fileList || (fileList.length === 0 && options?.required)) {
        if (options?.required) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "At least one file is required",
          });
        }

        return z.NEVER;
      }

      const filesArray =
        fileList instanceof FileList ? Array.from(fileList) : fileList;

      if (
        options?.minCount !== undefined &&
        filesArray.length < options.minCount
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `At least ${options.minCount} file(s) is/are required`,
        });
      }

      if (
        options?.maxCount !== undefined &&
        filesArray.length > options.maxCount
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Maximum ${options.maxCount} file(s) are allowed`,
        });
      }

      filesArray.forEach((file, i) => {
        const issuePath = [...ctx.path, i];

        if (file === null || !(file instanceof File)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid file",
            fatal: true,
            path: issuePath,
          });

          return z.NEVER;
        }

        if (!isValidFileType(file, options?.allowedFiles || [])) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File type ${file.type} is not allowed`,
            path: issuePath,
          });
        }

        if (
          options?.minSize !== undefined &&
          isFileBelowMinSize(file, options.minSize)
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File size must be at least ${options.minSize}MB`,
            path: issuePath,
          });
        }

        if (
          options?.maxSize !== undefined &&
          isFileExceedingMaxSize(file, options.maxSize)
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File size must not exceed ${options.maxSize}MB`,
            path: issuePath,
          });
        }
      });
    });
}

export function hashFile(file: File) {
  const fileData = {
    name: file.name,
    size: file.size,
    type: file.type,
  };

  return objectHash(fileData, { algorithm: "md5" });
}

export function handleFormFileList(params: HandleFormFileListParams) {
  const {
    fileList,
    oldFileList,
    oldImagesPaths = [],
    ignoreOldFiles,
    onDuplicateFiles,
  } = params;

  const dataTransfer = new DataTransfer();
  const filesHashes = new Set<string>();
  const duplicateFiles: File[] = [];

  let oldFilesArray: File[] = [];
  let hasDuplicates = false;

  if (!ignoreOldFiles) {
    if (oldFileList.length > 0) {
      oldFilesArray = Array.from(oldFileList).filter(
        (item) => item instanceof File,
      ) as File[];
      for (const file of oldFilesArray) {
        const fileHash = hashFile(file);
        filesHashes.add(fileHash);
      }
    }

    for (const file of oldImagesPaths) {
      filesHashes.add(file);
    }
  }

  for (const file of Array.from(fileList)) {
    if (!ignoreOldFiles) {
      const fileHash = hashFile(file);
      const isDuplicate = filesHashes.has(fileHash);

      if (isDuplicate) {
        hasDuplicates = true;
        duplicateFiles.push(file);
        continue;
      }

      filesHashes.add(fileHash);
    }

    dataTransfer.items.add(file);
  }

  if (!ignoreOldFiles) {
    for (const file of oldFilesArray) {
      dataTransfer.items.add(file);
    }
  }

  if (hasDuplicates) {
    onDuplicateFiles?.(duplicateFiles);
  }

  return {
    files: dataTransfer.files,
    paths: oldImagesPaths.filter((path) => !filesHashes.has(path)),
  };
}
