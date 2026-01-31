import { useState } from "react";
import { useFormContext } from "react-hook-form";

import Flexbox from "$/components/ui/Flexbox";
import { FileSize } from "$/types/native/utils.types";
import { cn } from "$/utils/functions/misc.functions";

import FileListPreview from "./FileListsPreview";
import ExtendedFileInput from "./ImageUpload/ExtendedFileInput";
import { mediaInputContainerClassName } from "./constants/index.constants";

type MediaBoxProps = {
  files?: File[];
  defaultUrls?: string[];
  handleRemoveFile?: (file: File | undefined) => void;
  handleRemoveExternalImage?: (url: string) => void;
  handleFilesChange?: (files: File[]) => void;
  inputPlaceHolder?: string;
  name: string;
  hideBoxTitle?: boolean;
  resetStyles?: boolean;
  boxTitle?: string;
  boxSubtitle?: string;
  className?: string;
  inputParentClassName?: string;
  inputTextClassName?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  iconWrapperClassName?: string;
  multiple?: boolean;
  disabled?: boolean;
  isFormElement?: boolean;
  hideSubTitle?: boolean;
  fileInputClassName?: string;
  shouldUploadFiles?: boolean;
  maxSize?: FileSize;
  primaryMappedOptionClassname?: string;
  secondaryMappedOptionClassname?: string;
  innerPrimaryClassname?: string;
};

const MediaBox = ({
  className,
  boxTitle = "Photos",
  hideBoxTitle,
  boxSubtitle = "Télécharger les photos",
  hideSubTitle,
  files,
  resetStyles,
  inputPlaceHolder,
  handleFilesChange,
  name,
  handleRemoveFile,
  defaultUrls,
  handleRemoveExternalImage,
  icon,
  iconClassName,
  iconWrapperClassName,
  inputTextClassName,
  multiple,
  inputParentClassName,
  fileInputClassName,
  disabled,
  isFormElement = false,
  shouldUploadFiles,
  maxSize,
  innerPrimaryClassname,
  primaryMappedOptionClassname,
  secondaryMappedOptionClassname,
}: MediaBoxProps) => {
  const formContext = useFormContext();
  const [localFiles, setLocalFiles] = useState<File[]>(files || []);

  const currentFiles = files || localFiles;

  const handleLocalFilesChange = (newFiles: File[]) => {
    if (handleFilesChange) {
      handleFilesChange(newFiles);
    } else {
      setLocalFiles(newFiles);
    }
  };

  const handleLocalRemoveFile = (file: File | undefined) => {
    if (handleRemoveFile) {
      handleRemoveFile(file);
    } else {
      setLocalFiles((prevFiles) =>
        prevFiles.filter((f) => f.name !== file?.name),
      );
    }
  };

  return (
    <Flexbox
      className={cn(
        "w-72 grow",
        !resetStyles && mediaInputContainerClassName,
        className,
        disabled && "cursor-not-allowed text-gray-400",
      )}
    >
      {!hideBoxTitle && <p className="text-bold">{boxTitle}</p>}
      {!hideSubTitle && <p className="label-semibold mt-3">{boxSubtitle}</p>}
      {isFormElement ? (
        <ExtendedFileInput
          disabled={disabled}
          inputPlaceHolder={inputPlaceHolder}
          inputTextClassName={cn(
            "label-semibold text-center",
            inputTextClassName,
          )}
          iconWrapperClassName={cn(
            "min-w-11 min-h-11 flex items-center justify-center",
            iconWrapperClassName,
          )}
          inputParentClassName={cn(
            "min-h-[146px]",
            inputParentClassName,
            disabled && "cursor-not-allowed opacity-50",
          )}
          iconClassName={iconClassName}
          icon={icon}
          className={cn("mt-2", fileInputClassName)}
          label="test"
          maxSize={maxSize}
          hideLabel
          multiple={multiple}
          onFiles={(newFiles) => {
            handleLocalFilesChange(Array.from(newFiles));
          }}
          {...formContext.register(name)}
        />
      ) : (
        <ExtendedFileInput
          disabled={disabled}
          inputPlaceHolder={inputPlaceHolder}
          inputTextClassName={cn(
            "label-semibold text-center",
            inputTextClassName,
          )}
          iconWrapperClassName={cn(
            "min-w-11 min-h-11 flex items-center justify-center",
            iconWrapperClassName,
          )}
          inputParentClassName={cn("min-h-[146px]", inputParentClassName)}
          iconClassName={iconClassName}
          icon={icon}
          className={cn("mt-2", fileInputClassName)}
          label="test"
          hideLabel
          multiple={multiple}
          onFiles={(newFiles) => {
            handleLocalFilesChange(Array.from(newFiles));
          }}
          name={name}
        />
      )}
      <FileListPreview
        handleSetRemoveFile={handleLocalRemoveFile}
        files={currentFiles}
        disabled={disabled}
        defaultUrls={defaultUrls}
        name={name}
        handleRemoveExternalImage={handleRemoveExternalImage}
        shouldUploadFiles={shouldUploadFiles}
        innerPrimaryClassname={innerPrimaryClassname}
        primaryMappedOptionClassname={primaryMappedOptionClassname}
        secondaryMappedOptionClassname={secondaryMappedOptionClassname}
      />
    </Flexbox>
  );
};

export default MediaBox;
