import { useContext } from "react";

import SettingsContext from "../../contexts/setting/setting.context";

export default function useSettings() {
  return useContext(SettingsContext);
}
