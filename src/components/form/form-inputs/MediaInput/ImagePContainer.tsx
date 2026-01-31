import { useEffect, useState } from "react";

import TrashIcon from "$/icons/TrashIcon";

type Props = {
  item: string | File;
  index: number;
  expandImage: (url: string) => void;
  disabled?: boolean;
  handleRemoveFile: (file: File) => void;
};
const ImagePContainer = ({
  item,
  index,
  expandImage,
  disabled,
  handleRemoveFile,
}: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (item instanceof File) {
      const img = new Image();
      const objectURL = URL.createObjectURL(item);

      img.onload = function () {
        const maxHeight = 500;

        let width = img.width;
        let height = img.height;

        if (height > maxHeight) {
          const ratio = maxHeight / height;
          height = maxHeight;
          width = width * ratio;
        }

        const canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          function (blob) {
            if (!blob) return;

            const newObjectURL = URL.createObjectURL(blob);

            setPreview(newObjectURL);
          },
          "image/jpeg",
          0.8,
        );

        URL.revokeObjectURL(objectURL);
      };

      img.src = objectURL;

      return () => URL.revokeObjectURL(objectURL);
    }

    setPreview(item);
  }, [item]);

  return (
    <div className="rounded-12 border-gray-shadow-light bg-whity-normal flex h-full items-center gap-2 border-1 p-2">
      {preview ? (
        <img
          src={preview}
          alt={`Preview ${index}`}
          className="h-[30px] w-[30px] cursor-pointer rounded-full object-cover"
          onClick={() => expandImage(preview)}
          loading="lazy"
        />
      ) : (
        <div className="border-tertiary-blue relative h-[30px] w-[30px] animate-pulse overflow-hidden rounded-full border-[2px] bg-gray-200">
          <div className="animate-spin-fast border-tertiary-blue absolute inset-1 rounded-full border-2 border-r-2 border-r-transparent"></div>
        </div>
      )}
      <p className="extra-small-semibold text-gray-normal">
        {item instanceof File
          ? item.name.substring(0, 20)
          : item.substring(item.lastIndexOf("/") + 1).substring(0, 20)}
      </p>
      {!disabled && (
        <button
          className="ml-auto flex h-fit p-1"
          type="button"
          onClick={() => handleRemoveFile(item as File)}
        >
          <TrashIcon className="h-4 w-4 shrink-0" fill="#C1093E" />
        </button>
      )}
    </div>
  );
};

export default ImagePContainer;
