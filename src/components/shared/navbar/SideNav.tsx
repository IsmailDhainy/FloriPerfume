import { PropsWithChildren, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { UserRole } from "$/enums/auth";
import useAuth from "$/hooks/contexts/useAuth";
import { useOutsideClick } from "$/hooks/useOutsideClick";

import { BurgerIcon } from "../../../assets/icons/BurgerIcon";
import { LogoutIcon } from "../../../assets/icons/LogoutIcon";
import { cn } from "../../../utils/functions/misc.functions";
import { navItems } from "./navItems.constants";
import NavItem from "./navItems/NavItem";

function SideNav({ children }: PropsWithChildren) {
  const location = useLocation();
  const { clearUser, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const burgerIconRef = useRef<HTMLButtonElement>(null);
  const isTabletAndBelow = window.innerWidth <= 768;
  const handleLogout = () => {
    clearUser();
  };

  useOutsideClick(
    () => {
      setIsSidebarOpen(false);
    },
    sidebarRef,
    burgerIconRef,
  );
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={cn(
        "relative row-start-1 row-end-3 grid h-full",
        isTabletAndBelow
          ? "grid-cols-[auto_1fr] grid-rows-[auto_1fr]"
          : "grid-cols-[240px_1fr]",
      )}
    >
      {isTabletAndBelow && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-[61]"
          ref={burgerIconRef}
        >
          <BurgerIcon isOpen={isSidebarOpen} />
        </button>
      )}

      {isTabletAndBelow && (
        <div className="col-start-2 col-end-3 flex items-center justify-center p-4">
          <img
            src="/images/FloriPerfumeLogo.svg"
            alt="logo"
            className="mobile:w-1/2 mobile:min-w-[162px] w-[30%]"
          />
        </div>
      )}

      <div
        ref={sidebarRef}
        className={cn(
          "col-span-1 flex min-w-[240px] flex-col justify-between border-r-2 !border-gray-200 !px-5 !py-7 transition-transform duration-300",
          isTabletAndBelow && "absolute top-0 left-0 z-[60] h-full bg-white",
          isTabletAndBelow && !isSidebarOpen && "-translate-x-full",
        )}
      >
        <div className="flex flex-col items-center">
          <img
            src="/images/FloriPerfumeLogo.svg"
            alt="logo"
            className={cn("w-[40%]", isTabletAndBelow && "w-1/2")}
          />
          <div className="!mt-12 flex max-h-[75vh] w-full flex-col !space-y-1 overflow-auto">
            {navItems.map(
              ({ title, Icon, to, subItems, nestedRoutes, roles }, index) =>
                roles.includes(user?.role as UserRole) && (
                  <NavItem
                    key={index}
                    title={title}
                    Icon={<Icon className="h-5 w-5" />}
                    subItems={subItems}
                    activeCheck={
                      location.pathname === to ||
                      nestedRoutes?.some(
                        (nestedRoute) =>
                          nestedRoute !== "/dashboard" &&
                          location.pathname.startsWith(nestedRoute as string) &&
                          (location.pathname === nestedRoute ||
                            location.pathname.startsWith(nestedRoute + "/")),
                      ) ||
                      (to !== "/dashboard" &&
                        location.pathname.startsWith(to as string) &&
                        (location.pathname === to ||
                          location.pathname.startsWith(to + "/")))
                    }
                    handleCloseNav={() => setIsSidebarOpen(false)}
                    to={to}
                  />
                ),
            )}
          </div>
        </div>
        <div className="flex w-full flex-col gap-3">
          <button
            onClick={handleLogout}
            className="group border-tertiary-blue !text-tertiary-blue hover:!bg-tertiary-blue flex items-center justify-center gap-2 !rounded-lg border-2 !bg-white py-2 transition-colors hover:!text-white"
          >
            <LogoutIcon className="transition-colors group-hover:text-white" />
            Logout
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}

export default SideNav;
