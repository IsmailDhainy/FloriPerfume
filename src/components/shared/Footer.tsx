import { useNavigate } from "react-router-dom";

import useAuth from "$/hooks/contexts/useAuth";
import useSettings from "$/hooks/contexts/useSettings";
import PATHS from "$/routes/constants";

const Footer = () => {
  const { settings } = useSettings();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <footer id="footer" className="footer border-t-[1px] border-red-500">
      <div className="footer-wrap border-0">
        <div className="footer-body">
          <div className="container">
            <div className="flex flex-row justify-around">
              <div className="">
                <div className="footer-infor">
                  <div className="footer-logo w-[100px]">
                    <a onClick={() => navigate(PATHS.HOME)}>
                      <img src="/images/FloriPerfumeLogo.svg" alt="" />
                    </a>
                  </div>
                  <ul className="tf-social-icon">
                    {settings?.whatsapp && (
                      <li>
                        <a
                          href={`https://web.whatsapp.com/send?phone=${settings?.whatsapp}`}
                          className="social-whatsapp"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="icon icon-phone"></i>
                        </a>
                      </li>
                    )}
                    {settings?.x && (
                      <li>
                        <a
                          href={settings?.x}
                          className="social-twiter"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="icon icon-x"></i>
                        </a>
                      </li>
                    )}
                    {settings?.facebook && (
                      <li>
                        <a
                          href={settings?.facebook}
                          className="social-facebook"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="icon icon-fb"></i>
                        </a>
                      </li>
                    )}
                    {settings?.instagram && (
                      <li>
                        <a
                          href={settings?.instagram}
                          className="social-instagram"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="icon icon-instagram"></i>
                        </a>
                      </li>
                    )}
                    {settings?.tiktok && (
                      <li>
                        <a
                          href={settings?.tiktok}
                          className="social-tiktok"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="icon icon-tiktok"></i>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="">
                <div className="footer-menu flex justify-between">
                  <div className="footer-col-block">
                    <div className="footer-heading text-button footer-heading-mobile">
                      Customer Services
                    </div>
                    <div className="tf-collapse-content">
                      <ul className="footer-menu-list">
                        <li className="text-caption-1">
                          <a
                            onClick={() => navigate(PATHS.PRIVACYPOLICY)}
                            className={`footer-menu_item ${location.pathname === PATHS.PRIVACYPOLICY && "active-link"}`}
                          >
                            Privacy Policy
                          </a>
                        </li>
                        <li className="text-caption-1">
                          <a
                            onClick={() => navigate(PATHS.TERMSANDCONDITION)}
                            className={`footer-menu_item ${location.pathname === PATHS.TERMSANDCONDITION && "active-link"}`}
                          >
                            Terms & Conditions
                          </a>
                        </li>
                        <li className="text-caption-1">
                          <a
                            onClick={() =>
                              navigate(
                                user ? PATHS.MYACCOUNT : PATHS.CLIENTLOGIN,
                              )
                            }
                            className={`footer-menu_item ${location.pathname === PATHS.MYACCOUNT && "active-link"}`}
                          >
                            My Account
                          </a>
                        </li>
                        <li className="text-caption-1">
                          <a
                            onClick={() => navigate(PATHS.WHISLIST)}
                            className={`footer-menu_item ${location.pathname === PATHS.WHISLIST && "active-link"}`}
                          >
                            My Wishlist
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
