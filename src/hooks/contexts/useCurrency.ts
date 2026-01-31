import { useContext } from "react";

import CurrencyContext from "../../contexts/currency/currency.context";

export default function useCurrency() {
  return useContext(CurrencyContext);
}
