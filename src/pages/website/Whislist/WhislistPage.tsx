import { useNavigate } from "react-router-dom";

import CheckoutModal from "$/components/shared/CheckoutModal";
import ProductCardGrid from "$/components/shared/ProductCardGrid";
import useSettings from "$/hooks/contexts/useSettings";
import PATHS from "$/routes/constants";
import { useWhishlistStore } from "$/store/WhislistStore";

const WhislistPage = () => {
  const items = useWhishlistStore((state) => state.items);
  const { settings } = useSettings();
  const navigate = useNavigate();

  return (
    <div id="wrapper">
      <div
        className={`page-title h-[300px] bg-cover bg-center`}
        style={{
          backgroundImage: `url('${settings?.whishlistBanner ? settings.whishlistBanner : "/images/CommonBanner.jpg"}')`,
        }}
      >
        <div className="container">
          <h3 className="heading text-center">Your Wishlist</h3>
          <ul className="breadcrumbs d-flex align-items-center justify-content-center">
            <li>
              <a className="link" onClick={() => navigate(PATHS.HOME)}>
                Homepage
              </a>
            </li>
            <li>
              <i className="icon-arrRight"></i>
            </li>
            <li>
              <a className="link" onClick={() => navigate(PATHS.PRODUCTS)}>
                Products
              </a>
            </li>
            <li>
              <i className="icon-arrRight"></i>
            </li>
            <li>Wishlist</li>
          </ul>
        </div>
      </div>
      <section className="flat-spacing">
        <div className="container">
          <div className="tf-grid-layout tf-col-2 md-col-3 xl-col-4">
            {items.map((item, index) => (
              <ProductCardGrid product={item} index={index} />
            ))}
          </div>
        </div>
      </section>
      <CheckoutModal />
    </div>
  );
};

export default WhislistPage;
