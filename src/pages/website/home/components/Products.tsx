import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getAllTypeProducts } from "$/api/products/product.api";
import ProductCardBestSeller from "$/components/shared/ProductCardBestSeller";
import ProductCardNewArrival from "$/components/shared/ProductCardNewArrival";
import PATHS from "$/routes/constants";

const Products = () => {
  const navigate = useNavigate();

  const { data: allTypeProductsResponse } = useQuery({
    queryKey: ["get-products-by-all-types"],
    queryFn: () => getAllTypeProducts(),
    refetchOnMount: true,
  });

  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-animate-tab">
          <ul className="tab-product justify-content-sm-center" role="tablist">
            {allTypeProductsResponse?.newArrival?.length !== 0 && (
              <li className="nav-tab-item" role="presentation">
                <a href="#newArrivals" className="active" data-bs-toggle="tab">
                  New Arrivals
                </a>
              </li>
            )}
            {allTypeProductsResponse?.bestSeller?.length !== 0 && (
              <li className="nav-tab-item" role="presentation">
                <a href="#bestSeller" data-bs-toggle="tab">
                  Best Seller
                </a>
              </li>
            )}
            {allTypeProductsResponse?.onSale?.length !== 0 && (
              <li className="nav-tab-item" role="presentation">
                <a href="#onSale" data-bs-toggle="tab">
                  On Sale
                </a>
              </li>
            )}
          </ul>
          <div className="tab-content">
            {/* NEW ARRIVALS */}
            <div
              className="tab-pane active show"
              id="newArrivals"
              role="tabpanel"
            >
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                {allTypeProductsResponse?.newArrival?.map((product, index) => (
                  <ProductCardNewArrival product={product} index={index} />
                ))}
              </div>
              {(allTypeProductsResponse?.newArrival?.length !== 0 ||
                allTypeProductsResponse?.bestSeller?.length !== 0 ||
                allTypeProductsResponse?.onSale?.length !== 0) && (
                <div className="sec-btn text-center">
                  <a
                    onClick={() => navigate(PATHS.ALLPRODUCTS)}
                    className="btn-line"
                  >
                    View All Products
                  </a>
                </div>
              )}
            </div>
            {/* BEST SELLER */}
            <div className="tab-pane" id="bestSeller" role="tabpanel">
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                {allTypeProductsResponse?.bestSeller?.map((product, index) => (
                  <ProductCardBestSeller product={product} index={index} />
                ))}
              </div>
              <div className="sec-btn text-center">
                <a
                  onClick={() => navigate(PATHS.ALLPRODUCTS)}
                  className="btn-line"
                >
                  View All Products
                </a>
              </div>
            </div>
            {/* ON SALE */}
            <div className="tab-pane" id="onSale" role="tabpanel">
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                {allTypeProductsResponse?.onSale?.map((product, index) => (
                  <ProductCardBestSeller product={product} index={index} />
                ))}
              </div>
              <div className="sec-btn text-center">
                <a
                  onClick={() => navigate(PATHS.ALLPRODUCTS)}
                  className="btn-line"
                >
                  View All Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
