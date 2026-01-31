import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "$/api/auth/login";
import Loader from "$/components/shared/Loader";
import useAuth from "$/hooks/contexts/useAuth";
import useSettings from "$/hooks/contexts/useSettings";
import PATHS from "$/routes/constants";
import { errorMessageToaster } from "$/utils/functions/error.functions";

const LoginWebsitePage = () => {
  const navigate = useNavigate();
  const { invalidateUser } = useAuth();
  const { settings } = useSettings();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: loginUser,
    onSuccess: () => {
      invalidateUser();
      navigate(PATHS.CLIENTLOGIN);
      toast.success(`Successfully logged in`);
    },
    onError: (error: AxiosError) => errorMessageToaster(error),
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    login(data as { email: string; password: string });
  };

  if (isPending) {
    <Loader />;
  }

  return (
    <div id="wrapper">
      <div
        className="page-title"
        style={{
          backgroundImage: `url('${settings?.accountBanner ? settings.accountBanner : "/images/CommonBanner.jpg"}')`,
        }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Login</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <a className="link" onClick={() => navigate(PATHS.HOME)}>
                    Homepage
                  </a>
                </li>
                <li>
                  <i className="icon-arrRight"></i>
                </li>
                <li>Login</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section className="flat-spacing">
        <div className="container">
          <div className="login-wrap">
            <div className="left">
              <div className="heading">
                <h4>Login</h4>
              </div>
              <form
                onSubmit={(data) => {
                  handleLogin(data);
                }}
                className="form-login form-has-password"
              >
                <div className="wrap">
                  <fieldset className="">
                    <input
                      className=""
                      type="email"
                      placeholder="Email address*"
                      name="email"
                      tabIndex={2}
                      aria-required="true"
                      required
                    />
                  </fieldset>
                  <fieldset className="position-relative password-item">
                    <input
                      className="input-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password*"
                      name="password"
                      tabIndex={2}
                      aria-required="true"
                      required
                    />
                    <span
                      className="toggle-password unshow"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={
                          showPassword ? "icon-eye" : "icon-eye-hide-line"
                        }
                      ></i>
                    </span>
                  </fieldset>
                </div>
                <div className="button-submit">
                  <button className="tf-btn btn-fill" type="submit">
                    <span className="text text-button">Login</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="right">
              <h4 className="mb_8">New Customer</h4>
              <p className="text-secondary">
                Be part of our growing family of new customers! Join us today
                and unlock a world of exclusive benefits, offers, and
                personalized experiences.
              </p>
              <a
                onClick={() => navigate(PATHS.CLIENTREGISTER)}
                className="tf-btn btn-fill"
              >
                <span className="text text-button">Register</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginWebsitePage;
