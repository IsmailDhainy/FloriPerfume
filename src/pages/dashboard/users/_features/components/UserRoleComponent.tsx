import { UserRole } from "$/enums/auth";
import { cn } from "$/utils/functions/misc.functions";

import { ROLES_COLORS_MAPPER } from "../constants/user.roles.colors";
import { ROLES_LABELS_MAPPER } from "../constants/user.roles.labels";

type Props = {
  role?: UserRole;
};
const UserRoleComponent = ({ role }: Props) => {
  if (!role) return null;
  return (
    <div
      className={cn(
        "flex w-fit min-w-40 justify-center rounded-md p-1.5 px-4 text-center",
        ROLES_COLORS_MAPPER[role],
      )}
    >
      {ROLES_LABELS_MAPPER[role]}
    </div>
  );
};

export default UserRoleComponent;
