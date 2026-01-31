import { useNavigate } from "react-router-dom";

import PATHS from "$/routes/constants";

const TermsAndConditionPage = () => {
  const navigate = useNavigate();

  return (
    <div id="wrapper">
      <div
        className={`page-title h-[300px] bg-cover bg-center`}
        style={
          {
            // backgroundImage: `url('${settings?.cartBanner}')`,
          }
        }
      >
        <div className="container">
          <h3 className="heading text-center">Terms & Condition</h3>
          <ul className="breadcrumbs d-flex align-items-center justify-content-center">
            <li>
              <a className="link" onClick={() => navigate(PATHS.HOME)}>
                Homepage
              </a>
            </li>
            <li>
              <i className="icon-arrRight"></i>
            </li>
            <li>Terms & Condition</li>
          </ul>
        </div>
      </div>
      <section className="flat-spacing">
        <div className="container">
          <div className="terms-of-use-wrap">
            <div className="left sticky-top">
              <h6 className="btn-scroll-target active" data-scroll="terms">
                1. Terms{" "}
              </h6>
              <h6 className="btn-scroll-target" data-scroll="limitations">
                2. Limitations
              </h6>
              <h6
                className="btn-scroll-target"
                data-scroll="revisions-and-errata"
              >
                3. Revisions and errata
              </h6>
              <h6 className="btn-scroll-target" data-scroll="site-terms">
                4. Site terms of use modifications
              </h6>
              <h6 className="btn-scroll-target" data-scroll="risks">
                5. Risks
              </h6>
            </div>
            <div className="right">
              <h4 className="heading">Terms of use</h4>
              <div
                className="terms-of-use-item item-scroll-target"
                data-scroll="terms"
              >
                <h5 className="terms-of-use-title">1. Terms</h5>
                <div className="terms-of-use-content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer sed euismod justo, sit amet efficitur dui. Aliquam
                    sodales vestibulum velit, eget sollicitudin quam. Donec non
                    aliquam eros. Etiam sit amet lectus vel justo dignissim
                    condimentum.
                  </p>
                  <p>
                    In malesuada neque quis libero laoreet posuere. In consequat
                    vitae ligula quis rutrum. Morbi dolor orci, maximus a
                    pulvinar sed, bibendum ac lacus. Suspendisse in consectetur
                    lorem. Pellentesque habitant morbi tristique senectus et
                    netus et malesuada fames ac turpis egestas. Aliquam
                    elementum, est sed interdum cursus, felis ex pharetra nisi,
                    ut elementum tortor urna eu nulla. Donec rhoncus in purus
                    quis blandit.
                  </p>
                  <p>
                    Etiam eleifend metus at nunc ultricies facilisis. Morbi
                    finibus tristique interdum. Nullam vel eleifend est, eu
                    posuere risus. Vestibulum ligula ex, ullamcorper sit amet
                    molestie
                  </p>
                </div>
              </div>
              <div
                className="terms-of-use-item item-scroll-target"
                data-scroll="limitations"
              >
                <h5 className="terms-of-use-title">2. Limitations</h5>
                <div className="terms-of-use-content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer sed euismod justo, sit amet efficitur dui. Aliquam
                    sodales vestibulum velit, eget sollicitudin quam. Donec non
                    aliquam eros. Etiam sit amet lectus vel justo dignissim
                    condimentum.
                  </p>
                  <p>
                    In malesuada neque quis libero laoreet posuere. In consequat
                    vitae ligula quis rutrum. Morbi dolor orci, maximus a
                    pulvinar sed, bibendum ac lacus. Suspendisse in consectetur
                    lorem. Pellentesque habitant morbi tristique senectus et
                    netus et malesuada fames ac turpis egestas. Aliquam
                    elementum, est sed interdum cursus, felis ex pharetra nisi,
                    ut elementum tortor urna eu nulla. Donec rhoncus in purus
                    quis blandit.
                  </p>
                  <p>
                    Etiam eleifend metus at nunc ultricies facilisis. Morbi
                    finibus tristique interdum. Nullam vel eleifend est, eu
                    posuere risus. Vestibulum ligula ex, ullamcorper sit amet
                    molestie
                  </p>
                </div>
              </div>
              <div
                className="terms-of-use-item item-scroll-target"
                data-scroll="revisions-and-errata"
              >
                <h5 className="terms-of-use-title">3. Revisions and errata</h5>
                <div className="terms-of-use-content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer sed euismod justo, sit amet efficitur dui. Aliquam
                    sodales vestibulum velit, eget sollicitudin quam. Donec non
                    aliquam eros. Etiam sit amet lectus vel justo dignissim
                    condimentum.
                  </p>
                  <p>
                    In malesuada neque quis libero laoreet posuere. In consequat
                    vitae ligula quis rutrum. Morbi dolor orci, maximus a
                    pulvinar sed, bibendum ac lacus. Suspendisse in consectetur
                    lorem. Pellentesque habitant morbi tristique senectus et
                    netus et malesuada fames ac turpis egestas. Aliquam
                    elementum, est sed interdum cursus, felis ex pharetra nisi,
                    ut elementum tortor urna eu nulla. Donec rhoncus in purus
                    quis blandit.
                  </p>
                  <p>
                    Etiam eleifend metus at nunc ultricies facilisis. Morbi
                    finibus tristique interdum. Nullam vel eleifend est, eu
                    posuere risus. Vestibulum ligula ex, ullamcorper sit amet
                    molestie
                  </p>
                </div>
              </div>
              <div
                className="terms-of-use-item item-scroll-target"
                data-scroll="site-terms"
              >
                <h5 className="terms-of-use-title">
                  4. Site terms of use modifications
                </h5>
                <div className="terms-of-use-content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer sed euismod justo, sit amet efficitur dui. Aliquam
                    sodales vestibulum velit, eget sollicitudin quam. Donec non
                    aliquam eros. Etiam sit amet lectus vel justo dignissim
                    condimentum.
                  </p>
                  <p>
                    In malesuada neque quis libero laoreet posuere. In consequat
                    vitae ligula quis rutrum. Morbi dolor orci, maximus a
                    pulvinar sed, bibendum ac lacus. Suspendisse in consectetur
                    lorem. Pellentesque habitant morbi tristique senectus et
                    netus et malesuada fames ac turpis egestas. Aliquam
                    elementum, est sed interdum cursus, felis ex pharetra nisi,
                    ut elementum tortor urna eu nulla. Donec rhoncus in purus
                    quis blandit.
                  </p>
                  <p>
                    Etiam eleifend metus at nunc ultricies facilisis. Morbi
                    finibus tristique interdum. Nullam vel eleifend est, eu
                    posuere risus. Vestibulum ligula ex, ullamcorper sit amet
                    molestie
                  </p>
                </div>
              </div>
              <div
                className="terms-of-use-item item-scroll-target"
                data-scroll="risks"
              >
                <h5 className="terms-of-use-title">5. Risks</h5>
                <div className="terms-of-use-content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer sed euismod justo, sit amet efficitur dui. Aliquam
                    sodales vestibulum velit, eget sollicitudin quam. Donec non
                    aliquam eros. Etiam sit amet lectus vel justo dignissim
                    condimentum.
                  </p>
                  <p>
                    In malesuada neque quis libero laoreet posuere. In consequat
                    vitae ligula quis rutrum. Morbi dolor orci, maximus a
                    pulvinar sed, bibendum ac lacus. Suspendisse in consectetur
                    lorem. Pellentesque habitant morbi tristique senectus et
                    netus et malesuada fames ac turpis egestas. Aliquam
                    elementum, est sed interdum cursus, felis ex pharetra nisi,
                    ut elementum tortor urna eu nulla. Donec rhoncus in purus
                    quis blandit.
                  </p>
                  <p>
                    Etiam eleifend metus at nunc ultricies facilisis. Morbi
                    finibus tristique interdum. Nullam vel eleifend est, eu
                    posuere risus. Vestibulum ligula ex, ullamcorper sit amet
                    molestie
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditionPage;
