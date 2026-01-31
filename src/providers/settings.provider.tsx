import { useQuery } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";

import Loader from "$/components/shared/Loader";

import { getOne } from "../api/settings/settings.api";
import SettingsContext from "../contexts/setting/setting.context";

const SettingsProvider = ({ children }: PropsWithChildren) => {
  const {
    data: settings,
    isFetching,
    status,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getOne,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isFetching) return <Loader />;

  return (
    <SettingsContext.Provider
      value={{
        settings: settings ?? null,
        isPending: isFetching,
        status,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
