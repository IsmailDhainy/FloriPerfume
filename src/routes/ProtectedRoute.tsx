import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { UserRole } from "../enums/auth";
import useAuth from "../hooks/contexts/useAuth";
import PATHS, { roleDefaultRootRoutes } from "./constants";

type Props = {
  allowed?: UserRole[] | null;
  unauthorizedPath?: string;
  returnUnauthorizedPage?: boolean;
  ensuredToken?: boolean;
};
const ProtectedRoute = ({
  children,
  unauthorizedPath,
  allowed,
  returnUnauthorizedPage,
}: PropsWithChildren<Props>) => {
  const { user, role } = useAuth();

  if (!user) {
    if (returnUnauthorizedPage) {
      return <p>Unauthorized</p>;
    }
    return <Navigate to={unauthorizedPath ?? PATHS.HOME} />;
  } else {
    if ((role && allowed?.includes(role)) || allowed?.length === 0) {
      return children;
    } else {
      return (
        <Navigate
          to={
            unauthorizedPath ||
            (role ? roleDefaultRootRoutes[role] : PATHS.CLIENTLOGIN)
          }
        />
      );
    }
  }
};

export default ProtectedRoute;
