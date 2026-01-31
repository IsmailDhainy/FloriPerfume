import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn, valueOrNothing } from "$/utils/functions/misc.functions";

type Props = {
  totalNumberOfPages: number;
  currentPage: number;
  pageLimit: number;
  isPendingData: boolean;
  onNextClick: () => void;
  onPreviousClick: () => void;
  onSetPageNumber: (pageNb: number) => void;
  onSetPageLimit: (limit: number) => void;
};

const generatePageNumbers = (
  currentPage: number,
  totalNumberOfPages: number,
) => {
  if (totalNumberOfPages < 8) {
    return Array.from({ length: totalNumberOfPages }, (_, i) => i + 1);
  }

  if (currentPage < 6) {
    const items = Array.from({ length: currentPage }, (_, i) => i + 1);
    items.push(currentPage + 1, -1, totalNumberOfPages - 1, totalNumberOfPages);
    return items;
  }

  if (currentPage >= totalNumberOfPages - 4) {
    return [
      1,
      2,
      -1,
      totalNumberOfPages - 4,
      totalNumberOfPages - 3,
      totalNumberOfPages - 2,
      totalNumberOfPages - 1,
      totalNumberOfPages,
    ];
  }

  return [
    1,
    2,
    -1,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    -1,
    totalNumberOfPages - 1,
    totalNumberOfPages,
  ];
};

const basePaginationButtonClassName =
  "grid aspect-square flex !w-6 !h-6 text-xs cursor-pointer place-items-center !rounded-[12px] !font-bold hover:!bg-tertiary-blue hover:!text-white focus:!text-white focus:!bg-tertiary-blue !bg-white  !text-tertiary-blue border !border-tertiary-blue";

export default function Pagination({
  totalNumberOfPages,
  currentPage,
  onNextClick,
  onPreviousClick,
  onSetPageNumber,
  // onSetPageLimit,
  // pageLimit,
  isPendingData,
}: Props) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalNumberOfPages;

  return (
    <div className="flex !h-10 items-center justify-center !gap-12 !px-4 md:justify-end">
      <div className="flex items-center justify-end !gap-1">
        {/* prev arrow */}
        <button
          type="button"
          className={cn(
            basePaginationButtonClassName,
            "border border-gray-300 bg-white",
            "disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100",
          )}
          disabled={currentPage === 1 || isPendingData}
          onClick={valueOrNothing(!isFirstPage, onPreviousClick)}
        >
          <div>
            {" "}
            <ChevronLeft
              size={20}
              className={cn(
                "text-tertiary-blue",
                (currentPage === 1 || isPendingData) && "text-tertiary-gray",
              )}
            />
          </div>
        </button>

        {/* number */}
        {generatePageNumbers(currentPage, totalNumberOfPages).map(
          (pageNumber) => {
            const isCurrentPage = currentPage === pageNumber;
            const ellipse = pageNumber === -1;

            return (
              <button
                key={pageNumber}
                type="button"
                disabled={isPendingData}
                onClick={valueOrNothing(!isCurrentPage, () =>
                  onSetPageNumber(pageNumber),
                )}
                className={cn(
                  basePaginationButtonClassName,
                  isCurrentPage &&
                    "!bg-tertiary-blue cursor-default !text-white",
                  "disabled:!bg-disable disabled:cursor-not-allowed disabled:opacity-30",
                )}
              >
                {ellipse ? "..." : pageNumber}
              </button>
            );
          },
        )}

        {/* next arrow */}
        <button
          type="button"
          className={cn(
            basePaginationButtonClassName,
            "!bg-gray-300",
            "disabled:!bg-disable disabled:cursor-not-allowed disabled:opacity-30",
          )}
          disabled={currentPage === totalNumberOfPages || isPendingData}
          onClick={isLastPage ? undefined : onNextClick}
        >
          <div>
            {" "}
            <ChevronRight
              size={20}
              className={cn(
                "text-tertiary-blue",
                (currentPage === 1 || isPendingData) && "text-tertiary-gray",
              )}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
