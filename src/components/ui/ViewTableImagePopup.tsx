import { useState } from "react";

export default function ImagePopup({
  imageUrl,
  alt,
  thumbnailClassName = "",
  popupImageClassName = "",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <>
      <img
        src={imageUrl}
        alt={alt}
        className={`h-10 w-10 cursor-pointer rounded-full object-cover ${thumbnailClassName}`}
        onClick={openPopup}
      />

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closePopup}
          tabIndex={0}
        >
          <div
            className="relative max-h-screen max-w-4xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-0 right-0 m-2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70"
              onClick={closePopup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <img
              src={imageUrl}
              alt={alt}
              className={`max-h-screen max-w-full rounded object-contain shadow-lg ${popupImageClassName}`}
            />
          </div>
        </div>
      )}
    </>
  );
}
