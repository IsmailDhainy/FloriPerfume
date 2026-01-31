import { createContext } from "react";

import { Currency } from "../../types/native/currency.types";

type CurrencyContextType = {
  currency: Currency | null;
  isPending: boolean;
  status: "pending" | "error" | "success";
  setCurrencyData: (currency: Currency) => void;
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: null,
  isPending: true,
  status: "pending",
  setCurrencyData: () => {},
});

export default CurrencyContext;
