import { getAllDashboardBrands } from "$/api/brands/brand.api";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import {
  BrandTableResponseTypeDashboard,
  BrandTableType,
} from "$/types/native/brand.types";

import CategoriesTable from "./BrandsTable";

const BrandTableProvider = () => {
  return (
    <EnhancedTableProvider<BrandTableResponseTypeDashboard, BrandTableType>
      dataSelector={(response) => response.data}
      totalCountSelector={(response) => response.count}
      queryOptions={{
        queryFn: ({ pagination, sorting }) =>
          getAllDashboardBrands(pagination, sorting),
        queryKey: ["getAllDashboardBrands"],
        refetchOnMount: true,
      }}
    >
      <CategoriesTable />
    </EnhancedTableProvider>
  );
};

export default BrandTableProvider;
