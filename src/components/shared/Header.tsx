import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import { getAllCurrencies } from "$/api/currencies/currencies.api";
import Loader from "$/components/shared/Loader";
import useAuth from "$/hooks/contexts/useAuth";
import useCurrency from "$/hooks/contexts/useCurrency";
import PATHS from "$/routes/constants";
import { useCartStore } from "$/store/CartStore";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currency, setCurrencyData } = useCurrency();
  const { user } = useAuth();
  const items = useCartStore((state) => state.items);

  const { data: currenciesResponse, isPending } = useQuery({
    queryKey: ["get-currencies"],
    queryFn: () => getAllCurrencies(),
    refetchOnMount: true,
  });

  if (isPending) return <Loader />;

  return (
    <>
      <header id="header" className="header-default header-bg">
        <div className="container">
          <div className="row wrapper-header align-items-center">
            <div className="col-md-4 d-xl-none col-3">
              <a
                href="#mobileMenu"
                className="mobile-menu"
                data-bs-toggle="offcanvas"
                aria-controls="mobileMenu"
              >
                <i className="icon icon-categories"></i>
              </a>
            </div>
            <div className="col-xl-3 col-md-4 col-6">
              <a onClick={() => navigate(PATHS.HOME)} className="logo-header">
                <img
                  src="/images/FloriPerfumeLogo.svg"
                  alt="logo"
                  className="logo"
                />
              </a>
            </div>
            <div className="col-xl-6 d-none d-xl-block">
              <nav className="box-navigation text-center">
                <ul className="box-nav-ul d-flex align-items-center justify-content-center">
                  <li
                    className={`menu-item ${location.pathname === PATHS.HOME && "active"}`}
                  >
                    <Link to={PATHS.HOME} className="item-link">
                      Home
                    </Link>
                  </li>
                  <li
                    className={`menu-item ${location.pathname === PATHS.ALLPRODUCTS && "active"}`}
                  >
                    <Link to={PATHS.ALLPRODUCTS} className="item-link">
                      Products
                    </Link>
                  </li>
                  <li
                    className={`menu-item ${location.pathname === PATHS.ALLCATEGORIES && "active"}`}
                  >
                    <Link to={PATHS.ALLCATEGORIES} className="item-link">
                      Categories
                    </Link>
                  </li>
                  <li
                    className={`menu-item ${location.pathname === PATHS.CONTACTFORM && "active"}`}
                  >
                    <Link to={PATHS.CONTACTFORM} className="item-link">
                      Contact us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-xl-3 col-md-4 col-3">
              <ul className="nav-icon d-flex justify-content-end align-items-center">
                <li className="nav-account">
                  <a
                    className={`nav-icon-item nav-icon ${(location.pathname === PATHS.MYACCOUNT || location.pathname === PATHS.MYADDRESS || location.pathname === PATHS.MYORDER) && "nav-icon-item-active"}`}
                    onClick={() =>
                      navigate(user ? PATHS.MYACCOUNT : PATHS.CLIENTLOGIN)
                    }
                  >
                    <svg
                      className="icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                        stroke="#181818"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                        stroke="#181818"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </li>
                <li className="nav-wishlist">
                  <a
                    onClick={() => navigate(PATHS.WHISLIST)}
                    className={`nav-icon-item ${location.pathname === PATHS.WHISLIST && "nav-icon-item-active"}`}
                  >
                    <svg
                      className="icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z"
                        stroke="#181818"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </li>
                <li className="nav-cart">
                  <a
                    onClick={() => navigate(PATHS.CART)}
                    data-bs-toggle="modal"
                    className={`nav-icon-item ${location.pathname === PATHS.CART && "nav-icon-item-active"}`}
                  >
                    <svg
                      className="icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5078 10.8734V6.36686C16.5078 5.17166 16.033 4.02541 15.1879 3.18028C14.3428 2.33514 13.1965 1.86035 120013 1.86035"
                        stroke="#181818"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.11491 8.62012H19.8877L21.0143 22.1396H2.98828L4.11491 8.62012Z"
                        stroke="#181818"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="count-box">{items?.length || 0}</span>
                  </a>
                </li>
                <li className="nav-cart">
                  <select
                    className="image-select center style-default type-currencies color-white"
                    value={currency?.id ?? ""} // controlled select
                    onChange={(e) => {
                      const selectedId = Number(e.target.value);
                      const selectedCurrency = currenciesResponse?.find(
                        (c) => c.id === selectedId,
                      );
                      if (selectedCurrency) {
                        setCurrencyData(selectedCurrency);
                      }
                    }}
                  >
                    {currenciesResponse?.map((each) => (
                      <option key={each.id} value={each.id}>
                        {each.code}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
        <span
          className="icon-close icon-close-popup"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></span>
        <div className="mb-canvas-content">
          <div className="mb-body">
            <div className="mb-content-top">
              <ul className="nav-ul-mb" id="wrapper-menu-navigation">
                <li className="nav-mb-item">
                  <a
                    onClick={() => navigate(PATHS.HOME)}
                    className="mb-menu-link"
                  >
                    Home{" "}
                  </a>
                </li>
                <li className="nav-mb-item">
                  <a
                    onClick={() => navigate(PATHS.ALLPRODUCTS)}
                    className="mb-menu-link"
                  >
                    Products
                  </a>
                </li>
                <li className="nav-mb-item">
                  <a
                    onClick={() => navigate(PATHS.ALLCATEGORIES)}
                    className="mb-menu-link"
                  >
                    Categories
                  </a>
                </li>
                <li className="nav-mb-item">
                  <a
                    onClick={() => navigate(PATHS.CONTACTFORM)}
                    className="mb-menu-link"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-other-content">
              <div className="group-icon">
                <a
                  onClick={() => navigate(PATHS.WHISLIST)}
                  className="site-nav-icon"
                >
                  <svg
                    className="icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z"
                      stroke="#181818"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Wishlist
                </a>

                <a
                  onClick={() => navigate(PATHS.CLIENTLOGIN)}
                  className="site-nav-icon"
                >
                  <svg
                    className="icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="#181818"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="#181818"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Login
                </a>
              </div>
            </div>
          </div>
          <div className="mb-bottom">
            <div className="bottom-bar-language">
              <div className="tf-currencies">
                <select
                  className="image-select center style-default type-currencies"
                  value={currency?.id ?? ""} // controlled select
                  onChange={(e) => {
                    const selectedId = Number(e.target.value);
                    const selectedCurrency = currenciesResponse?.find(
                      (c) => c.id === selectedId,
                    );
                    if (selectedCurrency) {
                      setCurrencyData(selectedCurrency);
                    }
                  }}
                >
                  {currenciesResponse?.map((each) => (
                    <option key={each.id} value={each.id}>
                      {each.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
