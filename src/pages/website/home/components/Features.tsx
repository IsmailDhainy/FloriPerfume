const Features = () => {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div
          dir="ltr"
          className="swiper tf-sw-iconbox"
          data-preview="4"
          data-tablet="3"
          data-mobile-sm="2"
          data-mobile="1"
          data-space-lg="30"
          data-space-md="30"
          data-space="15"
          data-pagination="1"
          data-pagination-sm="2"
          data-pagination-md="3"
          data-pagination-lg="4"
        >
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="tf-icon-box">
                <div className="icon-box">
                  <span className="icon icon-return"></span>
                </div>
                <div className="content text-center">
                  <h6>14-Day Returns</h6>
                  <p className="text-secondary">
                    Risk-free shopping with easy returns.
                  </p>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="tf-icon-box">
                <div className="icon-box">
                  <span className="icon icon-shipping"></span>
                </div>
                <div className="content text-center">
                  <h6>Free Shipping</h6>
                  <p className="text-secondary">
                    No extra costs, just the price you see.
                  </p>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="tf-icon-box">
                <div className="icon-box">
                  <span className="icon icon-headset"></span>
                </div>
                <div className="content text-center">
                  <h6>24/7 Support</h6>
                  <p className="text-secondary">
                    24/7 support, always here just for you
                  </p>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="tf-icon-box">
                <div className="icon-box">
                  <span className="icon icon-sealCheck"></span>
                </div>
                <div className="content text-center">
                  <h6>Member Discounts</h6>
                  <p className="text-secondary">
                    Special prices for our loyal customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="sw-pagination-iconbox sw-dots type-circle justify-content-center"></div>
        </div>
      </div>
    </section>
  );
};

export default Features;
