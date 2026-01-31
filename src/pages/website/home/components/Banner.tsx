import { Link } from "react-router-dom";

import PATHS from "$/routes/constants";

const Banner = () => {
  return (
    <section className="bg-surface flat-spacing flat-countdown-banner">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="banner-left">
              <div className="box-title">
                <h3 className="wow fadeInUp">Limited-Time Deals On!</h3>
                <p className="text-secondary wow fadeInUp">
                  Up to 50% Off Selected Styles. Don't Miss Out.
                </p>
              </div>
              <div
                // onClick={() => console.log("dd")}
                className="btn-banner wow fadeInUp"
              >
                <Link to={PATHS.ALLPRODUCTS} className="tf-btn btn-fill">
                  <span className="text">Shop Now</span>
                  <i className="icon icon-arrowUpRight"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="banner-img">
              {/* <img className="lazyload" data-src="images/banner/img-countdown1.png" src="images/banner/img-countdown1.png" alt="banner" /> */}
            </div>
          </div>
          <div className="col-lg-5">
            <div className="banner-right">
              <div className="tf-countdown-lg">
                <div
                  className="js-countdown"
                  data-timer="1007500"
                  data-labels="Days,Hours,Mins,Secs"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
