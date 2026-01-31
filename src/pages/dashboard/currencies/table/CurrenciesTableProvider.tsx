import { getAllCurrencies } from "$/api/currencies/currencies.api";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import {
  CurrencyTableResponseType,
  CurrencyTableType,
} from "$/types/native/currency.types";

import CurrenciesTable from "./CurrenciesTable";

const CurrencyTableProvider = () => {
  return (
    <EnhancedTableProvider<CurrencyTableResponseType, CurrencyTableType>
      dataSelector={(response) => response}
      totalCountSelector={(response) => response.length}
      queryOptions={{
        queryFn: ({ pagination, sorting }) =>
          getAllCurrencies(pagination, sorting),
        queryKey: ["getAllCurrencies"],
        refetchOnMount: true,
      }}
    >
      <CurrenciesTable />
    </EnhancedTableProvider>
  );
};

export default CurrencyTableProvider;
