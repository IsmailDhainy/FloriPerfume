import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addUser } from "$/api/users/users.api";
import Loader from "$/components/shared/Loader";
import useAuth from "$/hooks/contexts/useAuth";
import useSettings from "$/hooks/contexts/useSettings";
import { createUserFormSchema } from "$/pages/dashboard/users/form/zod.validation";
import PATHS from "$/routes/constants";
import { errorMessageToaster } from "$/utils/functions/error.functions";

const RegisterWebsitePage = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { invalidateUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: register, isPending } = useMutation({
    mutationKey: ["add-client"],
    mutationFn: addUser,
    onSuccess: () => {
      invalidateUser();
      navigate(PATHS.HOME);
      toast.success(`Successfully registered`);
    },
    onError: (error: AxiosError) => errorMessageToaster(error),
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const rawData: Record<string, string> = {};
    formData.forEach((value, key) => {
      rawData[key] = value.toString();
    });

    const formattedData = {
      firstName: rawData.firstname,
      lastName: rawData.lastname,
      email: rawData.email,
      password: rawData.password,
      phone: rawData.phone,
      role: rawData.role || "CLIENT",
    };

    const parsedData = createUserFormSchema.parse(formattedData);

    register(parsedData);
  };

  if (isPending) {
    return <Loader />;
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
              <h3 className="heading text-center">Create An Account</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <a className="link" onClick={() => navigate(PATHS.HOME)}>
                    Homepage
                  </a>
                </li>
                <li>
                  <i className="icon-arrRight"></i>
                </li>
                <li>Register</li>
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
                <h4>Register</h4>
              </div>
              <form
                onSubmit={(data) => {
                  handleRegister(data);
                }}
                className="form-login form-has-password"
              >
                <div className="wrap">
                  <fieldset className="">
                    <input
                      className=""
                      type="text"
                      placeholder="First Name*"
                      name="firstname"
                      tabIndex={2}
                      required
                      aria-required="true"
                    />
                  </fieldset>
                  <fieldset className="">
                    <input
                      className=""
                      type="text"
                      placeholder="Last Name*"
                      name="lastname"
                      tabIndex={2}
                      required
                      aria-required="true"
                    />
                  </fieldset>
                  <fieldset className="">
                    <input
                      className=""
                      type="text"
                      placeholder="Phone Number*"
                      name="phone"
                      tabIndex={2}
                      required
                      aria-required="true"
                      pattern="\d{6}"
                    />
                  </fieldset>
                  <fieldset className="">
                    <input
                      className=""
                      type="email"
                      placeholder="Email address*"
                      name="email"
                      tabIndex={2}
                      required
                      aria-required="true"
                    />
                  </fieldset>
                  <fieldset className="position-relative password-item">
                    <input
                      className="input-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password*"
                      name="password"
                      tabIndex={2}
                      required
                      aria-required="true"
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
                    <span className="text text-button">Register</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="right">
              <h4 className="mb_8">Already have an account?</h4>
              <p className="text-secondary">
                Welcome back. Sign in to access your personalized experience,
                saved preferences, and more. We're thrilled to have you with us
                again!
              </p>
              <a
                onClick={() => navigate(PATHS.CLIENTLOGIN)}
                className="tf-btn btn-fill"
              >
                <span className="text text-button">Login</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterWebsitePage;
