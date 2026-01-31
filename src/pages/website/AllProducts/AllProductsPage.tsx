import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getAllBrands } from "$/api/brands/brand.api";
import { getAllCategories } from "$/api/categories/category.api";
import {
  getAllProductsByType,
  getHighestPrice,
} from "$/api/products/product.api";
import CheckoutModal from "$/components/shared/CheckoutModal";
import Loader from "$/components/shared/Loader";
import ProductCardGrid from "$/components/shared/ProductCardGrid";
import ProductCardWithDetails from "$/components/shared/ProductCardWithDetails";
import useSettings from "$/hooks/contexts/useSettings";
import PATHS from "$/routes/constants";

declare global {
  interface Window {
    jQuery?: unknown;
    shopFunctions?: {
      init: () => void;
      cleanup: () => void;
    };
  }
}

const AllProductsPage = () => {
  const location = useLocation();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const initialCategoryId = location.state?.categoryId;

  const [page, setPage] = useState(1);
  const [categoriesFilter, setCategoriesFilter] = useState<number[]>([
    initialCategoryId,
  ]);
  const [brandsFilter, setBrandsFilter] = useState<number[]>([]);
  const [onSale, setOnSale] = useState<boolean>(Boolean(false));

  const limit = 3;

  const { data: productsResponse, isPending } = useQuery({
    queryKey: [
      "get-products-by-type",
      page,
      categoriesFilter,
      brandsFilter,
      onSale,
    ],
    queryFn: () =>
      getAllProductsByType(
        undefined,
        { offset: page - 1, limit },
        undefined,
        categoriesFilter,
        brandsFilter,
        onSale,
      ),
    placeholderData: (previousData) => previousData,
    refetchOnMount: true,
  });

  const { data: productsHigestPrice } = useQuery({
    queryKey: ["get-products-price"],
    queryFn: () => getHighestPrice(),
    refetchOnMount: true,
  });

  const { data: categoriesResponse } = useQuery({
    queryKey: ["get-categories"],
    queryFn: () => getAllCategories(),
    refetchOnMount: true,
  });

  const { data: brandsResponse } = useQuery({
    queryKey: ["get-brands"],
    queryFn: () => getAllBrands(),
    refetchOnMount: true,
  });

  const toggleCategoryFilter = (categoryId: number) => {
    setCategoriesFilter((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const toggleBrandFilter = (brandId: number) => {
    setBrandsFilter((prev) => {
      if (prev.includes(brandId)) {
        return prev.filter((id) => id !== brandId);
      } else {
        return [...prev, brandId];
      }
    });
  };

  const ResetFilter = () => {
    setCategoriesFilter([]);
    setBrandsFilter([]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.jQuery && window.shopFunctions) {
        window.shopFunctions.init();
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      if (window.shopFunctions) {
        window.shopFunctions.cleanup();
      }
    };
  }, [productsResponse]);

  if (isPending) {
    return <Loader />;
  }

  const products = productsResponse?.data || [];
  const total = productsResponse?.count || 0;
  const totalPages = Math.ceil(total / limit);
  const categories = categoriesResponse?.data || [];
  const brands = brandsResponse?.data || [];

  return (
    <>
      <div id="wrapper">
        <div
          className={`page-title h-[300px] bg-cover bg-center`}
          style={{
            backgroundImage: `url('${settings?.productBanner ? settings.productBanner : "/images/CommonBanner.jpg"}')`,
          }}
        >
          <div className="container-full">
            <div className="row">
              <div className="col-12">
                <h3 className="heading text-center">Products</h3>
                <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                  <li>
                    <a onClick={() => navigate(PATHS.HOME)} className="link">
                      Homepage
                    </a>
                  </li>
                  <li>
                    <i className="icon-arrRight"></i>
                  </li>
                  <li>Products</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <section className="flat-spacing">
          <div className="container">
            {/* filtering */}
            <div className="tf-shop-control">
              <div className="tf-control-filter">
                <a
                  href="#filterShop"
                  data-bs-toggle="offcanvas"
                  aria-controls="filterShop"
                  className="tf-btn-filter"
                >
                  <span className="icon icon-filter"></span>
                  <span className="text">Filters</span>
                </a>
                <div
                  className={`d-none d-lg-flex shop-sale-text ${onSale && "active"}`}
                  onClick={() => setOnSale(!onSale)}
                >
                  <i className="icon icon-checkCircle"></i>
                  <p className="text-caption-1">Shop sale items only</p>
                </div>
              </div>
              <ul className="tf-control-layout">
                <li
                  className="tf-view-layout-switch sw-layout-list list-layout"
                  data-value-layout="list"
                >
                  <div className="item">
                    <svg
                      className="icon"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="3" cy="6" r="2.5" stroke="#181818" />
                      <rect
                        x="7.5"
                        y="3.5"
                        width="12"
                        height="5"
                        rx="2.5"
                        stroke="#181818"
                      />
                      <circle cx="3" cy="14" r="2.5" stroke="#181818" />
                      <rect
                        x="7.5"
                        y="11.5"
                        width="12"
                        height="5"
                        rx="2.5"
                        stroke="#181818"
                      />
                    </svg>
                  </div>
                </li>
                <li
                  className="tf-view-layout-switch sw-layout-2"
                  data-value-layout="tf-col-2"
                >
                  <div className="item">
                    <svg
                      className="icon"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="6" cy="6" r="2.5" stroke="#181818" />
                      <circle cx="14" cy="6" r="2.5" stroke="#181818" />
                      <circle cx="6" cy="14" r="2.5" stroke="#181818" />
                      <circle cx="14" cy="14" r="2.5" stroke="#181818" />
                    </svg>
                  </div>
                </li>
                <li
                  className="tf-view-layout-switch sw-layout-3"
                  data-value-layout="tf-col-3"
                >
                  <div className="item">
                    <svg
                      className="icon"
                      width="22"
                      height="20"
                      viewBox="0 0 22 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="3" cy="6" r="2.5" stroke="#181818" />
                      <circle cx="11" cy="6" r="2.5" stroke="#181818" />
                      <circle cx="19" cy="6" r="2.5" stroke="#181818" />
                      <circle cx="3" cy="14" r="2.5" stroke="#181818" />
                      <circle cx="11" cy="14" r="2.5" stroke="#181818" />
                      <circle cx="19" cy="14" r="2.5" stroke="#181818" />
                    </svg>
                  </div>
                </li>
                <li
                  className="tf-view-layout-switch sw-layout-4 active"
                  data-value-layout="tf-col-4"
                >
                  <div className="item">
                    <svg
                      className="icon"
                      width="30"
                      height="20"
                      viewBox="0 0 30 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="3" cy="6" r="2.5" stroke="#181818" />
                      <circle cx="11" cy="6" r="2.5" stroke="#181818" />
                      <circle cx="19" cy="6" r="2.5" stroke="#181818" />
                      <circle cx="27" cy="6" r="2.5" stroke="#181818" />
                      <circle cx="3" cy="14" r="2.5" stroke="#181818" />
                      <circle cx="11" cy="14" r="2.5" stroke="#181818" />
                      <circle cx="19" cy="14" r="2.5" stroke="#181818" />
                      <circle cx="27" cy="14" r="2.5" stroke="#181818" />
                    </svg>
                  </div>
                </li>
                <li
                  className="tf-view-layout-switch sw-layout-5"
                  data-value-layout="tf-col-5"
                >
                  <div className="item">
                    <svg
                      className="icon"
                      width="38"
                      height="20"
                      viewBox="0 0 38 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="3" cy="6" r="2.5" stroke="#181818" />
                      <circle cx="11" cy="6" r="2.5" stroke="#181818" />
                      <circle cx="19" cy="6" r="2.5" stroke="#181818" />
                      <circle cx="27" cy="6" r="2.5" stroke="#181818" />
                      <circle cx="35" cy="6" r="2.5" stroke="#181818" />
                      <circle cx="3" cy="14" r="2.5" stroke="#181818" />
                      <circle cx="11" cy="14" r="2.5" stroke="#181818" />
                      <circle cx="19" cy="14" r="2.5" stroke="#181818" />
                      <circle cx="27" cy="14" r="2.5" stroke="#181818" />
                      <circle cx="35" cy="14" r="2.5" stroke="#181818" />
                    </svg>
                  </div>
                </li>
              </ul>
            </div>

            <div className="wrapper-control-shop">
              {/* listLayout */}
              <div className="tf-list-layout wrapper-shop" id="listLayout">
                {/* WITH DETAILS */}
                {products?.map((product, index) => (
                  <ProductCardWithDetails product={product} index={index} />
                ))}
                <ul className="wg-pagination justify-content-center">
                  <li>
                    <a
                      onClick={(e) => {
                        if (page - 1 === 0) {
                          e.preventDefault();
                          return;
                        }
                        setPage(page - 1);
                      }}
                      className="pagination-item text-button"
                    >
                      <i className="icon-arrLeft"></i>
                    </a>
                  </li>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li
                      key={`${i}-all-products-li`}
                      className={page === i + 1 ? "active" : ""}
                    >
                      <a
                        onClick={() => setPage(i + 1)}
                        className="pagination-item text-button"
                        key={`${i}-all-products-div`}
                      >
                        {i + 1}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      onClick={(e) => {
                        if (page + 1 > totalPages) {
                          e.preventDefault();
                          return;
                        }
                        setPage(page + 1);
                      }}
                      className="pagination-item text-button"
                    >
                      {" "}
                      <i className="icon-arrRight"></i>
                    </a>
                  </li>
                </ul>
              </div>

              {/* gridLayout */}
              <div
                className="tf-grid-layout wrapper-shop tf-col-4"
                id="gridLayout"
              >
                {products?.map((product, index) => (
                  <ProductCardGrid product={product} index={index} />
                ))}
                <ul className="wg-pagination justify-content-center">
                  <li>
                    <a
                      onClick={(e) => {
                        if (page - 1 === 0) {
                          e.preventDefault();
                          return;
                        }
                        setPage(page - 1);
                      }}
                      className="pagination-item text-button"
                    >
                      <i className="icon-arrLeft"></i>
                    </a>
                  </li>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li
                      key={`${i}-all-products-div666`}
                      className={page === i + 1 ? "active" : ""}
                    >
                      <a
                        onClick={() => setPage(i + 1)}
                        className="pagination-item text-button"
                        key={`${i}-all-products-div33`}
                      >
                        {i + 1}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      onClick={(e) => {
                        if (page + 1 > totalPages) {
                          e.preventDefault();
                          return;
                        }
                        setPage(page + 1);
                      }}
                      className="pagination-item text-button"
                    >
                      {" "}
                      <i className="icon-arrRight"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CheckoutModal />

      {/* FILTERING */}
      <div className="offcanvas offcanvas-start canvas-filter" id="filterShop">
        <div className="canvas-wrapper">
          <div className="canvas-header">
            <h5>Filters</h5>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></span>
          </div>
          <div className="canvas-body">
            <div className="widget-facet facet-price">
              <h6 className="facet-title">Price</h6>
              <div
                className="price-val-range"
                id="price-value-range"
                data-min="0"
                data-max={
                  productsHigestPrice ? String(productsHigestPrice) : "700"
                }
              ></div>
              <div className="box-price-product">
                <div className="box-price-item">
                  <span className="title-price">Min price</span>
                  <div
                    className="price-val"
                    id="price-min-value"
                    data-currency="$"
                  ></div>
                </div>
                <div className="box-price-item">
                  <span className="title-price">Max price</span>
                  <div
                    className="price-val"
                    id="price-max-value"
                    data-currency="$"
                  ></div>
                </div>
              </div>
            </div>
            <div className="widget-facet facet-fieldset">
              <h6 className="facet-title">Brands</h6>
              <div className="box-fieldset-item">
                {brands.map((brand, index) => (
                  <fieldset
                    className="fieldset-item"
                    key={`${index}-${brand.id}-brand`}
                  >
                    <input
                      type="checkbox"
                      name="brand"
                      className="tf-check"
                      id={brand.name}
                      key={`${index}-${brand.id}-brand-input`}
                      onClick={() => toggleBrandFilter(brand.id)}
                    />
                    <label
                      htmlFor={brand.name}
                      key={`${index}-${brand.id}-brand-label`}
                    >
                      {brand.name}{" "}
                      <span
                        className="count-stock"
                        key={`${index}-${brand.id}-brand-span`}
                      >
                        ({brand.productItems})
                      </span>
                    </label>
                  </fieldset>
                ))}
              </div>
            </div>
            <div className="widget-facet facet-fieldset">
              <h6 className="facet-title">Categories</h6>
              <div className="box-fieldset-item">
                {categories?.map((category, index) => (
                  <fieldset
                    className="fieldset-item"
                    key={`${index}-${category.id}-category`}
                  >
                    <input
                      type="checkbox"
                      name="category"
                      className="tf-check"
                      id={category.name}
                      defaultChecked={
                        categoriesFilter.includes(category.id) || false
                      }
                      key={`${index}-${category.id}-category-input`}
                      onClick={() => toggleCategoryFilter(category.id)}
                    />
                    <label
                      htmlFor={category.name}
                      key={`${index}-${category.id}-category-label`}
                    >
                      {category.name}
                      <span
                        className="count-brand"
                        key={`${index}-${category.id}-category-span`}
                      >
                        ({category.productItems})
                      </span>
                    </label>
                  </fieldset>
                ))}
              </div>
            </div>
          </div>
          <div className="canvas-bottom">
            <button
              id="reset-filter"
              className="tf-btn btn-reset"
              onClick={() => ResetFilter()}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProductsPage;
