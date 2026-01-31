import { useContext } from "react";

import AuthContext from "../../contexts/auth/auth.context";

export default function useAuth() {
  return useContext(AuthContext);
}
