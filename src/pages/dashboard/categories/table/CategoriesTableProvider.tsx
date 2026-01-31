import { getAllAdminCategoriesDashboard } from "$/api/categories/category.api";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import {
  CategoryTableResponseTypeDashboard,
  CategoryTableType,
} from "$/types/native/category.types";

import CategoriesTable from "./CategoriesTable";

const CategoryTableProvider = () => {
  return (
    <EnhancedTableProvider<
      CategoryTableResponseTypeDashboard,
      CategoryTableType
    >
      dataSelector={(response) => response.data}
      totalCountSelector={(response) => response.count}
      queryOptions={{
        queryFn: ({ pagination, sorting }) =>
          getAllAdminCategoriesDashboard(pagination, sorting),
        queryKey: ["getAllCategories"],
        refetchOnMount: true,
      }}
    >
      <CategoriesTable />
    </EnhancedTableProvider>
  );
};

export default CategoryTableProvider;
