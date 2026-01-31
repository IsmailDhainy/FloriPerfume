import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getSliders } from "$/api/sliders/sliders.api";
import PATHS from "$/routes/constants";

const Carousel = () => {
  const { data: sliderResponse } = useQuery({
    queryKey: ["get-all-sliders"],
    queryFn: () => getSliders(),
    refetchOnMount: true,
  });

  const sliders = sliderResponse?.data || [];

  return (
    <section className="tf-slideshow slider-default slider-effect-fade">
      <div
        dir="ltr"
        className="swiper tf-sw-slideshow"
        data-effect="fade"
        data-preview="1"
        data-tablet="1"
        data-mobile="1"
        data-centered="false"
        data-space="0"
        data-space-mb="0"
        data-loop="true"
        data-auto-play="true"
      >
        <div className="swiper-wrapper">
          {sliders.map((slider, index) => (
            <div
              className="swiper-slide"
              key={`slider-div-${index}-${slider.id}`}
            >
              <div
                className="wrap-slider h-[70vh]"
                key={`slider-div2-${index}-${slider.id}`}
              >
                <img
                  src={slider.image || "/images/Slider.jpg"}
                  alt="slideshow-image"
                  key={`slider-img-${index}-${slider.id}`}
                />
                <div
                  className="box-content"
                  key={`slider-div3-${index}-${slider.id}`}
                >
                  <div
                    className="content-slider"
                    key={`slider-div4-${index}-${slider.id}`}
                  >
                    <div
                      className="box-title-slider"
                      key={`slider-div5-${index}-${slider.id}`}
                    >
                      <p
                        className="fade-item fade-item-1 subheading text-btn-uppercase text-white"
                        key={`slider-p-${index}-${slider.id}`}
                      >
                        {slider.subtitle}
                      </p>
                      <div
                        className="fade-item fade-item-2 heading title-display text-white"
                        key={`slider-div6-${index}-${slider.id}`}
                      >
                        {slider.title}
                      </div>
                    </div>
                    <div
                      className="fade-item fade-item-3 box-btn-slider"
                      key={`slider-div7-${index}-${slider.id}`}
                    >
                      <Link
                        to={PATHS.ALLPRODUCTS}
                        className="tf-btn btn-fill btn-white"
                      >
                        <span
                          className="text"
                          key={`slider-div7-${index}-${slider.id}`}
                        >
                          Explore Collection
                        </span>
                        <i
                          className="icon icon-arrowUpRight"
                          key={`slider-i-${index}-${slider.id}`}
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="wrap-pagination">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle white-circle justify-content-center"></div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
