import { useNavigate } from "react-router-dom";

import PATHS from "$/routes/constants";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div id="wrapper">
      <section className="flat-spacing page-404">
        <div className="container">
          <div className="page-404-inner">
            <div className="image">
              <img
                className="lazyload"
                data-src="/images/404.jpg"
                src="/images/404.jpg"
                alt="image"
              />
            </div>
            <div className="content">
              <div className="heading">Oops!</div>
              <div>
                <h2 className="title mb_4">Something is Missing.</h2>
                <div className="text body-text-1 text-secondary">
                  The page you are looking for cannot be found. take a break
                  before trying again{" "}
                </div>
              </div>
              <a
                onClick={() => navigate(PATHS.HOME)}
                className="tf-btn btn-fill"
              >
                <span className="text text-button">Back To Homepage</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
