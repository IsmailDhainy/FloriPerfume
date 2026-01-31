import { getAllProducts } from "$/api/products/product.api";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import {
  ProductTableResponseTypeDashboard,
  ProductTableType,
} from "$/types/native/product.types";

import ProductsTable from "./ProductsTable";

const ProductTableProvider = () => {
  return (
    <EnhancedTableProvider<ProductTableResponseTypeDashboard, ProductTableType>
      dataSelector={(response) => response.data}
      totalCountSelector={(response) => response.count}
      queryOptions={{
        queryFn: ({ pagination, sorting }) =>
          getAllProducts(pagination, sorting).then((response) => response),
        queryKey: ["getAllProducts"],
        refetchOnMount: true,
      }}
    >
      <ProductsTable />
    </EnhancedTableProvider>
  );
};

export default ProductTableProvider;
