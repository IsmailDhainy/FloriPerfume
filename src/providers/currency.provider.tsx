import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";

import Loader from "$/components/shared/Loader";

import { getDefaultOne } from "../api/currencies/currencies.api";
import CurrencyContext from "../contexts/currency/currency.context";
import { Currency } from "../types/native/currency.types";

const CurrencyProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();

  const {
    data: currency,
    isFetching,
    status,
  } = useQuery({
    queryKey: ["currency"],
    queryFn: getDefaultOne,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleSetCurrency = (data: Currency) => {
    queryClient.setQueryData(["currency"], data);
  };
  if (isFetching) return <Loader />;

  return (
    <CurrencyContext.Provider
      value={{
        currency: currency ?? null,
        isPending: isFetching,
        status,
        setCurrencyData: handleSetCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
