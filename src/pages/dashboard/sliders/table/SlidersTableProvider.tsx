import { getSliders } from "$/api/sliders/sliders.api";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import {
  SliderTableResponseTypeDashboard,
  SliderTableType,
} from "$/types/native/slider.types";

import SlidersTable from "./SlidersTable";

const SliderTableProvider = () => {
  return (
    <EnhancedTableProvider<SliderTableResponseTypeDashboard, SliderTableType>
      dataSelector={(response) => response.data}
      totalCountSelector={(response) => response.count}
      queryOptions={{
        queryFn: ({ pagination, sorting }) => getSliders(pagination, sorting),
        queryKey: ["getAllSliders"],
        refetchOnMount: true,
      }}
    >
      <SlidersTable />
    </EnhancedTableProvider>
  );
};

export default SliderTableProvider;
