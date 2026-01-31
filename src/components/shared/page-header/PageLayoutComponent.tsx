import { PropsWithChildren } from "react";

import { cn } from "$/utils/functions/misc.functions";

type Props = {
  pageTitle?: string;
  classname?: string;
};
const PageLayoutComponent = ({
  children,
  classname,
  pageTitle,
}: PropsWithChildren<Props>) => {
  return (
    <>
      <div
        className={cn(
          "col-start-2 col-end-3 row-start-1 row-end-2 flex h-full w-full flex-col overflow-hidden",
          classname,
        )}
      >
        <div className="sticky top-0 z-20 mb-4 flex gap-2 bg-white p-4 shadow-md">
          <h1 className="!text-xl !font-bold">{pageTitle}</h1>
        </div>
      </div>
      <div className="row-start-2 overflow-auto px-4 pb-4">{children}</div>
    </>
  );
};

export default PageLayoutComponent;
