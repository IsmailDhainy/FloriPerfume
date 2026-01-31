import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllDynamicTypeProducts } from "$/api/products/product.api";
import ProductCardNewArrival from "$/components/shared/ProductCardNewArrival";
import PATHS from "$/routes/constants";

const ProductsDynamic = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: products } = useQuery({
    queryKey: ["get-products-by-dynamic-type"],
    queryFn: () => getAllDynamicTypeProducts(),
    refetchOnMount: true,
  });

  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-animate-tab">
          <ul className="tab-product justify-content-sm-center" role="tablist">
            {products?.map((item, index) => (
              <li
                className="nav-tab-item"
                role="presentation"
                key={`div787878-${index}-${item.categoryId}`}
                onClick={() => setActiveIndex(index)}
              >
                <a
                  href={`#${item.categoryName}`}
                  className={index === activeIndex ? "active" : ""}
                  data-bs-toggle="tab"
                  key={`div787878-a-${index}-${item.categoryId}`}
                >
                  {item.categoryName}
                </a>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            {products?.map((item, index) => (
              <div
                className={`tab-pane ${index === activeIndex && "active show"}`}
                id={item.categoryName}
                role="tabpanel"
                key={`div787878-div-${index}-${item.categoryId}`}
              >
                <div
                  className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4"
                  key={`div787878-div22-${index}-${item.categoryId}`}
                >
                  {item.products?.map((product, index) => (
                    <ProductCardNewArrival
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>

                <div
                  className="sec-btn text-center"
                  key={`div787878-div3232-${index}-${item.categoryId}`}
                >
                  <a
                    onClick={() => navigate(PATHS.ALLPRODUCTS)}
                    className="btn-line"
                    key={`div787878-div-a23-${index}-${item.categoryId}`}
                  >
                    View All Products
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsDynamic;
