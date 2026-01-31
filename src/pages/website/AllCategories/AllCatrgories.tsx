import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllCategories } from "$/api/categories/category.api";
import Loader from "$/components/shared/Loader";
import useSettings from "$/hooks/contexts/useSettings";
import PATHS from "$/routes/constants";

const AllCategoriesPage = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();

  const [page, setPage] = useState(1);
  const limit = 12;

  const { data: categoriesResponse, isPending } = useQuery({
    queryKey: ["get-categories", page],
    queryFn: () => getAllCategories({ offset: page - 1, limit }, undefined),
    placeholderData: (previousData) => previousData,
  });

  if (isPending) {
    return <Loader />;
  }

  const categories = categoriesResponse?.data || [];
  const total = categoriesResponse?.count || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <div id="wrapper">
        <div
          className={`page-title h-[300px] bg-cover bg-center`}
          style={{
            backgroundImage: `url('${settings?.categoryBanner ? settings.categoryBanner : "/images/CommonBanner.jpg"}')`,
          }}
        >
          <div className="container-full">
            <div className="row">
              <div className="col-12">
                <h3 className="heading text-center">Categories</h3>
                <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                  <li>
                    <a href={PATHS.HOME} className="link">
                      Homepage
                    </a>
                  </li>
                  <li>
                    <i className="icon-arrRight"></i>
                  </li>
                  <li>Categories</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <section className="flat-spacing">
          <div className="container">
            <div className="tf-grid-layout tf-col-2 lg-col-4">
              {categories.map((category) => (
                <div
                  key={`${category.id}-all-categories-div`}
                  className="collection-position-2 radius-lg style-3 hover-img"
                  onClick={() =>
                    navigate(PATHS.ALLPRODUCTS, {
                      state: { categoryId: category.id },
                    })
                  }
                >
                  <a
                    className="img-style"
                    key={`${category.id}-all-categories`}
                  >
                    <img
                      className="lazyload"
                      src={category.image || "/images/Category.jpg"}
                      alt="banner-cls"
                      key={`${category.id}-all-categories-img`}
                    />
                  </a>
                  <div
                    className="content"
                    key={`${category.id}-all-categories-div2`}
                  >
                    <a
                      className="cls-btn"
                      key={`${category.id}-all-categories-a`}
                    >
                      <h6
                        className="text"
                        key={`${category.id}-all-categories-h6`}
                      >
                        {category.name}
                      </h6>
                      <span
                        className="count-item text-secondary"
                        key={`${category.id}-all-categories-span`}
                      >
                        {category.productItems} item
                        {category.productItems > 1 && "s"}
                      </span>
                      <i
                        className="icon icon-arrowUpRight"
                        key={`${category.id}-all-categories-i`}
                      ></i>
                    </a>
                  </div>
                </div>
              ))}

              {/* Pagination */}
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
                {Array.from({
                  length: totalPages,
                }).map((_, i) => (
                  <li key={i} className={page === i + 1 ? "active" : ""}>
                    <a
                      onClick={() => setPage(i + 1)}
                      className="pagination-item text-button"
                      key={`${i}-all-categories22-div`}
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
                    <i className="icon-arrRight"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AllCategoriesPage;
