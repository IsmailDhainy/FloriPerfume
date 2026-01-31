import { createContext } from "react";

import { UserRole } from "../../enums/auth";
import { User } from "../../types/native/user.types";

type AuthContextType = {
  user: User | null;
  role: UserRole | null;
  isPending: boolean;
  isPendingLogout: boolean;
  status: "pending" | "error" | "success";
  invalidateUser: () => void;
  setUserData: (user: User) => void;
  clearUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isPending: true,
  isPendingLogout: false,
  status: "pending",
  setUserData: () => {},
  invalidateUser: () => {},
  clearUser: () => {},
});

export default AuthContext;
