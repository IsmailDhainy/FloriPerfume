import { JSX } from "react";

import { BurgerIcon } from "$/assets/icons/BurgerIcon";
import { EditActionIcon } from "$/assets/icons/EditActionIcon";
import { FolderIcon } from "$/assets/icons/FolderIcon";
import { PilotProfileIcon } from "$/assets/icons/PilotProfileIcon";
import { SearchIcon } from "$/assets/icons/SearchIcon";
import { SettingsIcon } from "$/assets/icons/Settings";
import { StatisticsIcon } from "$/assets/icons/StatisticsIcon";
import { UsersIcon } from "$/assets/icons/UsersIcon";
import { UserRole } from "$/enums/auth";
import PATHS, { PathsValues } from "$/routes/constants";
import { IconProps } from "$/types/native/utils.types";

type SubItemProps = {
  title: string;
  Icon: (data: IconProps) => JSX.Element | JSX.Element;
  subItems?: SubItemProps[] | null;
  to: PathsValues;
  nestedRoutes?: PathsValues[];
  roles: UserRole[];
};

const superAdminRole = [UserRole.SUPER_ADMIN];
const superAdminAndAdminRole = [UserRole.ADMIN, UserRole.SUPER_ADMIN];

export const navItems: SubItemProps[] = [
  {
    title: "Clients",
    Icon: UsersIcon,
    to: PATHS.CLIENTS,
    roles: superAdminAndAdminRole,
    nestedRoutes: [PATHS.CLIENTS],
  },
  {
    title: "Orders",
    Icon: SearchIcon,
    to: PATHS.ORDERS,
    roles: superAdminAndAdminRole,
    nestedRoutes: [PATHS.ORDERS, PATHS.ORDERDETAIL],
  },
  {
    title: "Contacts",
    Icon: FolderIcon,
    to: PATHS.CONTACT,
    roles: superAdminRole,
  },

  {
    title: "Categories",
    Icon: EditActionIcon,
    to: PATHS.CATEGORIES,
    nestedRoutes: [PATHS.CATEGORY_DETAILS, PATHS.CREATE_CATEGORY_FORM],
    roles: superAdminAndAdminRole,
  },
  {
    title: "Brands",
    Icon: EditActionIcon,
    to: PATHS.BRANDS,
    nestedRoutes: [PATHS.BRAND_DETAILS, PATHS.CREATE_BRAND],
    roles: superAdminAndAdminRole,
  },
  {
    title: "Products",
    Icon: EditActionIcon,
    to: PATHS.PRODUCTS,
    nestedRoutes: [PATHS.CREATE_PRODUCT, PATHS.PRODUCTDETAIL, PATHS.PRODUCTS],
    roles: superAdminAndAdminRole,
  },
  {
    title: "Currencies",
    Icon: StatisticsIcon,
    to: PATHS.CURRENCIES,
    nestedRoutes: [
      PATHS.CURRENCY_DETAILS,
      PATHS.CREATE_CURRENCY,
      PATHS.CURRENCIES,
    ],
    roles: superAdminRole,
  },
  {
    title: "Sliders",
    Icon: BurgerIcon,
    to: PATHS.SLIDERS,
    nestedRoutes: [PATHS.SLIDER_DETAILS, PATHS.CREATE_SLIDER],
    roles: superAdminAndAdminRole,
  },
  {
    title: "Settings",
    Icon: SettingsIcon,
    to: PATHS.EDIT_SETTINGS,
    roles: superAdminRole,
  },
  {
    title: "Users",
    Icon: PilotProfileIcon,
    to: PATHS.USERS,
    roles: superAdminRole,
    nestedRoutes: [PATHS.USERS, PATHS.CREATE_USER_FORM, PATHS.EdIT_USER_FORM],
  },
];
