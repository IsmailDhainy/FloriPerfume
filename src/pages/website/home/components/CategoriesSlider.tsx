import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAllCategories } from "$/api/categories/category.api";
import PATHS from "$/routes/constants";

const CategoriesSlider = () => {
  const navigate = useNavigate();

  const { data: categoriesResponse } = useQuery({
    queryKey: ["get-all-categories"],
    queryFn: () => getAllCategories(),
    refetchOnMount: true,
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../../../../public/js/carousel.js";

    script.async = false;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const categories = categoriesResponse?.data || [];

  return (
    <section className="flat-spacing-2 pb_0">
      <div className="container">
        <div className="heading-section-2 wow fadeInUp">
          <h3>Categories you might like</h3>
          <a onClick={() => navigate(PATHS.ALLCATEGORIES)} className="btn-line">
            View All Collection
          </a>
        </div>
        <div
          className="flat-collection-circle wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <div
            dir="ltr"
            className="swiper tf-sw-collection"
            data-preview="5"
            data-tablet="3"
            data-mobile="2"
            data-space-lg="20"
            data-space-md="20"
            data-space="15"
            data-pagination="1"
            data-pagination-md="1"
            data-pagination-lg="1"
          >
            <div className="swiper-wrapper">
              {categories?.map((category, index) => (
                <div
                  className="swiper-slide"
                  key={`${index}-categories-slider-div`}
                >
                  <div
                    className="collection-circle hover-img"
                    key={`${index}-categories-slider-div2`}
                  >
                    <a
                      key={`${index}-categories-slider-a`}
                      onClick={() => {
                        navigate(PATHS.ALLPRODUCTS, {
                          state: { categoryId: category.id },
                        });
                      }}
                      className="img-style"
                    >
                      <img
                        className="lazyload aspect-square"
                        data-src={category.image || "/images/Category.jpg"}
                        src={category.image || "/images/Category.jpg"}
                        alt="collection-img"
                        key={`${index}-categories-slider-img`}
                      />
                    </a>
                    <div
                      className="collection-content text-center"
                      key={`${index}-categories-slider-div2`}
                    >
                      <div key={`${index}-categories-slider-div22`}>
                        <a
                          key={`${index}-categories-slider-a22`}
                          onClick={() => {
                            navigate(PATHS.ALLPRODUCTS, {
                              state: { categoryId: category.id },
                            });
                          }}
                          className="cls-title"
                        >
                          <h6
                            className="text"
                            key={`${index}-categories-slider-h66`}
                          >
                            {category.name}
                          </h6>
                          <i
                            className="icon icon-arrowUpRight"
                            key={`${index}-categories-slider-i`}
                          ></i>
                        </a>
                      </div>
                      <div
                        className="count text-secondary"
                        key={`${index}-categories-slider-div66`}
                      >
                        {category.productItems} item
                        {category.productItems > 1 && "s"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex d-lg-none sw-pagination-collection sw-dots type-circle justify-content-center"></div>
          </div>
          <div className="nav-prev-collection d-none d-lg-flex nav-sw style-line nav-sw-left">
            <i className="icon icon-arrLeft"></i>
          </div>
          <div className="nav-next-collection d-none d-lg-flex nav-sw style-line nav-sw-right">
            <i className="icon icon-arrRight"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSlider;
