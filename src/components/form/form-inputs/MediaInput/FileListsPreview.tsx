import { useEffect, useRef, useState } from "react";
import { FieldValues, WatchObserver, useFormContext } from "react-hook-form";

// import { getMultiUploadUrls } from "$/api/media/get-multi-upload-urls";
// import { uploadFile } from "$/api/media/upload-files";
import PdfIcon from "$/icons/PdfIcon";
import TrashIcon from "$/icons/TrashIcon";
import { cn } from "$/utils/functions/misc.functions";

import ImagePContainer from "./ImagePContainer";

type FileListPreviewProps = {
  files?: File[];
  defaultUrls?: string[];
  handleSetRemoveFile?: (file: File | undefined) => void;
  handleRemoveExternalImage?: (url: string) => void;
  name?: string;
  disabled?: boolean;
  shouldUploadFiles?: boolean;
  primaryMappedOptionClassname?: string;
  secondaryMappedOptionClassname?: string;
  innerPrimaryClassname?: string;
};

const FileListPreview = ({
  files = [],
  handleSetRemoveFile,
  handleRemoveExternalImage,
  defaultUrls = [],
  name,
  disabled,
  shouldUploadFiles = false,
  primaryMappedOptionClassname,
  secondaryMappedOptionClassname,
  innerPrimaryClassname,
}: FileListPreviewProps) => {
  const formContext = useFormContext();
  const [combinedImages, setCombinedImages] = useState<(File | string)[]>([]);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [uploadProgress] = useState<
    Record<
      string,
      { progress: number; isDone: boolean; loaded: number; total: number }
    >
  >({});

  // const updateProgress = (
  //   progress: number,
  //   fileIdentifier: string,
  //   loaded: number,
  //   total: number,
  // ) => {
  //   setUploadProgress((prev) => ({
  //     ...prev,
  //     [fileIdentifier]: {
  //       progress,
  //       loaded,
  //       total,
  //       isDone: progress === 100,
  //     },
  //   }));
  // };

  const watch = formContext.watch(
    name as unknown as WatchObserver<FieldValues>,
  );
  const initialCombinedImagesRef = useRef<(File | string)[]>([]);

  const areArraysEqual = (arr1: (File | string)[], arr2: (File | string)[]) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((item, index) =>
      item instanceof File && arr2[index] instanceof File
        ? item.name === (arr2[index] as File).name
        : item === arr2[index],
    );
  };

  // const uploadFilesForCategory = async (
  //   files: File[] | undefined,
  //   category: string,
  // ) => {
  //   if (!files?.length) return [];

  //   const { data: uploadUrls } = await getMultiUploadUrls(files, category);

  //   for (let i = 0; i < files.length; i++) {
  //     const fileIdentifier = files[i].name; // Or use a unique property
  //     await uploadFile({
  //       file: files[i],
  //       response: uploadUrls[i],
  //       onProgress: (fileProgress: number, loaded: number, total: number) => {
  //         updateProgress(fileProgress, fileIdentifier, loaded, total);
  //       },
  //     });
  //   }

  //   return uploadUrls.map((url) => url.path);
  // };

  useEffect(() => {
    const initialCombinedImages = [...files, ...defaultUrls];

    if (
      !areArraysEqual(initialCombinedImagesRef.current, initialCombinedImages)
    ) {
      initialCombinedImagesRef.current = initialCombinedImages;
      setCombinedImages(initialCombinedImages);
    }
  }, [files, defaultUrls]);

  const expandImage = (url: string) => {
    setExpandedImage(url);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  const handleRemoveFile = (file: File) => {
    handleSetRemoveFile?.(file);
    if (formContext && file && name) {
      formContext.setValue(
        name,
        formContext.getValues(name).filter((f: File) => f !== file),
      );
    }
  };

  const isImageFile = (file: File | string) => {
    if (typeof file === "string") {
      return (
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg") ||
        file.endsWith(".png") ||
        file.endsWith(".gif")
      );
    }
    return file.type.startsWith("image/");
  };

  const isPdfFile = (file: File | string) => {
    if (typeof file === "string") {
      return file.endsWith(".pdf");
    }
    return file.type === "application/pdf";
  };

  useEffect(() => {
    if (shouldUploadFiles && name) {
      // const formFiles = formContext.watch(name);
      // const filesToUpload =
      //   formFiles &&
      //   formFiles?.length &&
      //   (formFiles.filter(
      //     (item: File | string) =>
      //       item instanceof File && item.name.includes("pdf"),
      //   ) as File[]);
      // if (filesToUpload?.length > 0) {
      //   uploadFilesForCategory(filesToUpload, name).then((uploadedUrls) => {
      //     if (uploadedUrls.length > 0) {
      //       const oldtrings = formFiles.filter(
      //         (item: File | string) =>
      //           typeof item === "string" || !item.name.includes("pdf"),
      //       ) as string[];
      //       const combinedStrings = [...oldtrings, ...uploadedUrls];
      //       formContext.setValue(name, combinedStrings);
      //     }
      //   });
      // }
    }
    // TOCHECK: uploadFilesForCategory IF IT IS CAUSING INFINITE REREENDERS
  }, [watch, name, shouldUploadFiles, formContext]);

  useEffect(() => {
    if (watch && name) {
      setCombinedImages(watch as unknown as (File | string)[]);
    }
  }, [watch, name]);

  return (
    <div className="mt-2 flex w-full flex-col gap-2">
      <div className="flex max-h-60 w-full flex-wrap gap-2 overflow-y-auto">
        {combinedImages &&
          combinedImages.length > 0 &&
          combinedImages.map((item, index) => {
            return (
              <div
                key={index}
                className={cn(
                  "relative w-fit shrink-0 rounded-xl border",
                  primaryMappedOptionClassname,
                )}
              >
                {isImageFile(item) ? (
                  <ImagePContainer
                    expandImage={expandImage}
                    handleRemoveFile={handleRemoveFile}
                    index={index}
                    item={item}
                    disabled={disabled}
                  />
                ) : isPdfFile(item) ? (
                  <div
                    className={cn(
                      "flex h-full flex-col gap-1",
                      secondaryMappedOptionClassname,
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-12 border-gray-shadow-light bg-whity-normal flex h-full items-center gap-2 border-1 p-2",
                        innerPrimaryClassname,
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (item instanceof File)
                            window.open(URL.createObjectURL(item));
                          else
                            window.open(
                              !item.includes(
                                import.meta.env.VITE_IMAGES_BASE_URL,
                              )
                                ? `${import.meta.env.VITE_IMAGES_BASE_URL}/${item}`
                                : item,
                            );
                        }}
                      >
                        <PdfIcon className="h-6 w-6" fill="#C1093E" />
                      </button>
                      <p className="extra-small-semibold text-gray-normal">
                        {item instanceof File
                          ? item.name.length > 20
                            ? `${item.name.substring(0, 20)}...${item.name.substring(item.name.length - 6)}`
                            : item.name
                          : `${item.split("/").pop()}`}
                      </p>
                      {!disabled && (
                        <button
                          className="ml-auto flex h-fit"
                          type="button"
                          onClick={() => {
                            if (item instanceof File) handleRemoveFile(item);
                            else {
                              handleRemoveExternalImage?.(item);
                              if (formContext && name) {
                                formContext.setValue(
                                  name,
                                  formContext
                                    .getValues(name)
                                    .filter((f: string) => f !== item),
                                );
                              }
                            }
                          }}
                        >
                          <TrashIcon
                            className="h-4 w-4 shrink-0"
                            fill="#C1093E"
                          />
                        </button>
                      )}
                    </div>
                    {shouldUploadFiles &&
                      item instanceof File &&
                      uploadProgress[(item as File).name] &&
                      !uploadProgress[(item as File).name].isDone && (
                        <div className="mx-auto flex w-full flex-col gap-2 p-2">
                          <p className="text-gray-normal mt-1 flex items-center gap-2 text-sm">
                            <p className="text-xs">
                              Téléchargement en cours...
                              {` ${uploadProgress[(item as File).name] ? uploadProgress[(item as File).name].progress : 0}%`}
                            </p>
                            <div
                              className="border-tertiary-blue h-3 w-3 animate-spin rounded-full border-2 border-solid border-t-transparent"
                              role="status"
                            ></div>
                            <span className="text-xs text-gray-300">
                              {uploadProgress[(item as File).name].loaded &&
                                uploadProgress[(item as File).name].total && (
                                  <>
                                    {`${Math.round(
                                      uploadProgress[(item as File).name]
                                        .loaded / 1024,
                                    )} Ko sur ${Math.round(
                                      uploadProgress[(item as File).name]
                                        .total / 1024,
                                    )} Ko`}
                                  </>
                                )}
                            </span>
                          </p>
                          <div className="mt-2 h-2 w-full rounded-full bg-gray-300">
                            <div
                              className="bg-tertiary-blue h-2 rounded-full"
                              style={{
                                width: `${uploadProgress[(item as File).name].progress || 0}%`,
                                transition: "width 0.5s ease-in-out",
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                  </div>
                ) : typeof item === "string" && item.includes("https") ? (
                  <ImagePContainer
                    expandImage={expandImage}
                    handleRemoveFile={handleRemoveFile}
                    index={index}
                    item={item}
                    disabled={disabled}
                  />
                ) : (
                  <p className="text-gray-normal mx-auto flex h-full w-[60%] items-center justify-center text-center text-sm">
                    Type de fichier non pris en charge
                  </p>
                )}
              </div>
            );
          })}
      </div>
      {expandedImage && (
        <div
          className="bg-opacity-80 fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-black"
          onClick={closeExpandedImage}
        >
          <img
            src={expandedImage}
            alt="Expanded"
            className="relativez-[101] h-full max-h-[80vh] w-full max-w-[50vw] object-contain transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default FileListPreview;
