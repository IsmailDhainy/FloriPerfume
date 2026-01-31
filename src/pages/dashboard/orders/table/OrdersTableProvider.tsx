import { useParams } from "react-router-dom";

import { getAll, getAllByUserId } from "$/api/checkout/checkout.api";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import {
  Checkout,
  CheckoutTableResponseType,
} from "$/types/native/checkout.types";

import OrdersTable from "./OrdersTable";

const OrderTableProvider = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <EnhancedTableProvider<CheckoutTableResponseType, Checkout>
      dataSelector={(response) => response.data}
      totalCountSelector={(response) => response.count}
      queryOptions={{
        queryFn: ({ pagination, sorting }) =>
          id
            ? getAllByUserId(Number(id), pagination, sorting)
            : getAll(pagination, sorting),
        queryKey: id ? ["getAllOrdersByUserId"] : ["getAllOrders"],
        refetchOnMount: true,
      }}
    >
      <OrdersTable />
    </EnhancedTableProvider>
  );
};

export default OrderTableProvider;
