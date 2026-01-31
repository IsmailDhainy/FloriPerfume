import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import SideNav from "$/components/shared/navbar/SideNav";

const DashboardLayout = () => {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div
      ref={scrollableContainerRef}
      className="grid h-screen w-full grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-hidden"
    >
      <SideNav />

      <Outlet />
    </div>
  );
};

export default DashboardLayout;
