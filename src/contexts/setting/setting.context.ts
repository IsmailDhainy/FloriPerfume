import { createContext } from "react";

import { Settings } from "../../types/native/settings.types";

type SettingsContextType = {
  settings: Settings | null;
  isPending: boolean;
  status: "pending" | "error" | "success";
};

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  isPending: true,
  status: "pending",
});

export default SettingsContext;
