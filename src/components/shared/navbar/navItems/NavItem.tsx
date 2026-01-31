import { JSX, ReactElement, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { UserRole } from "$/enums/auth";
import useAuth from "$/hooks/contexts/useAuth";
import { PathsValues } from "$/routes/constants";

import { cn } from "../../../../utils/functions/misc.functions";

export type IconProps = {
  className?: string;
};

type SubItemProps = {
  title: string;
  Icon: ({ className }: IconProps) => JSX.Element;
  to: PathsValues;
  roles: UserRole[];
};

type NavItemProps = {
  title: string;
  handleCloseNav?: () => void;
  activeCheck: boolean;
  Icon: ReactElement<IconProps>;
  to: PathsValues;
  subItems?: SubItemProps[] | null;
};

function NavItem({
  title,
  activeCheck,
  Icon,
  to,
  handleCloseNav,
  subItems,
}: NavItemProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isSelectedFromDropdown, setIsSelectedFromDropdown] = useState(false);

  const location = useLocation();

  useLayoutEffect(() => {
    if (subItems) {
      subItems.forEach((subItem) => {
        if (subItem.to === window.location.pathname) {
          setOpenDropdown(true);
          setIsSelectedFromDropdown(true);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        onClick={() => {
          handleCloseNav?.();
          if (subItems) {
            setOpenDropdown(!openDropdown);
          } else {
            navigate(to);
          }
        }}
        className={cn(
          "text-tertiary-beige flex cursor-pointer items-center gap-2.5 rounded-lg px-4 py-2 text-sm leading-6 transition-all duration-200 ease-in-out hover:!text-white",
          (activeCheck || isSelectedFromDropdown) &&
            "bg-tertiary-blue text-white [&>p]:text-white",
          !activeCheck &&
            !isSelectedFromDropdown &&
            "hover:bg-opacity-20 hover:bg-tertiary-blue",
        )}
        title={title}
      >
        {Icon}
        <p className="flex items-center gap-3">{title} </p>
      </div>
      <div
        className={cn(
          "max-h-0 overflow-hidden pl-4 transition-all duration-300 ease-in-out",
          openDropdown && "max-h-screen",
        )}
      >
        {subItems?.map(
          (subItem, index) =>
            subItem.roles.includes(user?.role as UserRole) && (
              <div
                key={index}
                onClick={() => navigate(subItem.to)}
                className={cn(
                  "text-grey hover:bg-opacity-20 hover:bg-tertiary-blue flex cursor-pointer items-center gap-2.5 rounded-lg px-4 py-2 transition-all duration-200 ease-in-out",
                  subItem.to === location.pathname
                    ? "[&>p]:text-primary [&>svg]:fill-primary"
                    : "[&>svg]:fill-grey",
                  subItem.to !== location.pathname &&
                    "hover:bg-opacity-20 hover:bg-tertiary-blue",
                )}
              >
                {subItem.Icon({ className: "min-w-5 min-h-5" })}
                <p
                  title={subItem.title}
                  className="flex items-center gap-3 truncate text-[15px]"
                >
                  {subItem.title}{" "}
                </p>
              </div>
            ),
        )}
      </div>
    </>
  );
}

export default NavItem;
