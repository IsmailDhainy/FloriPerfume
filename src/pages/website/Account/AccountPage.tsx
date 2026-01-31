import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { changePassword } from "$/api/auth/change-password";
import { editClientInformation } from "$/api/users/users.api";
import AccountCard from "$/components/shared/AccountCard";
import useAuth from "$/hooks/contexts/useAuth";
import PATHS from "$/routes/constants";
import { EditUser, UserPassword } from "$/types/native/user.types";

const AccountPage = () => {
  const { user, invalidateUser } = useAuth();
  const navigate = useNavigate();

  const { mutate: editUserInfo } = useMutation({
    mutationKey: ["edit-user-info"],
    mutationFn: (payload: { id: string; data: EditUser }) => {
      return editClientInformation(payload.id, payload.data);
    },
    onSuccess: () => {
      invalidateUser();
    },
  });

  const handleUserInformation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    const data: EditUser = {
      firstName: values.firstname as string,
      lastName: values.lastname as string,
      phone: values.phone as string,
    };
    editUserInfo({
      id: String(user!.id),
      data,
    });
  };

  const { mutate: editUserPass } = useMutation({
    mutationKey: ["edit-user-pass"],
    mutationFn: (payload: UserPassword) => {
      return changePassword(payload);
    },
    onSuccess: () => {},
  });

  const handleUserPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    const data: UserPassword = {
      userId: user?.id as number,
      password: values.password as string,
      newPassword: values.newPassword as string,
    };
    editUserPass(data);
  };

  return (
    <div id="wrapper">
      <div
        className="page-title"
        style={{ backgroundImage: "url('/images/CommonBanner.jpg')" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">My Account</h3>
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
                  <a className="link" href="#">
                    Pages
                  </a>
                </li>
                <li>
                  <i className="icon-arrRight"></i>
                </li>
                <li>My Account</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="btn-sidebar-account">
        <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount">
          <i className="icon icon-squares-four"></i>
        </button>
      </div>

      <section className="flat-spacing">
        <div className="container">
          <div className="my-account-wrap">
            <AccountCard />
            <div className="my-account-content">
              <div className="account-details">
                <form
                  onSubmit={(e) => {
                    handleUserInformation(e);
                  }}
                  className="form-account-details form-has-password"
                >
                  <div className="account-info">
                    <h5 className="title">Information</h5>
                    <div className="cols mb_20">
                      <fieldset className="">
                        <input
                          className=""
                          type="text"
                          placeholder="First Name*"
                          name="firstname"
                          tabIndex={2}
                          defaultValue={user?.firstName}
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
                          defaultValue={user?.lastName}
                          aria-required="true"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="cols mb_20">
                      <fieldset className="">
                        <input
                          className=""
                          type="email"
                          placeholder="Email address*"
                          name="email"
                          tabIndex={2}
                          value={user?.email}
                          aria-required="true"
                          disabled
                        />
                      </fieldset>
                      <fieldset className="">
                        <input
                          className=""
                          type="text"
                          placeholder="Phone Number*"
                          name="phone"
                          tabIndex={2}
                          defaultValue={user?.phone}
                          aria-required="true"
                          pattern="\d{6}"
                          required
                        />
                      </fieldset>
                    </div>
                  </div>
                  <div className="button-submit">
                    <button className="tf-btn btn-fill" type="submit">
                      <span className="text text-button">Update Account</span>
                    </button>
                  </div>
                </form>
                <form
                  onSubmit={(e) => {
                    handleUserPassword(e);
                  }}
                  className="form-account-details form-has-password"
                >
                  <div className="account-password">
                    <h5 className="title">Change Password</h5>
                    <fieldset className="position-relative password-item mb_20">
                      <input
                        className="input-password"
                        type="password"
                        placeholder="Password*"
                        name="password"
                        tabIndex={2}
                        aria-required="true"
                      />
                      <span className="toggle-password unshow">
                        <i className="icon-eye-hide-line"></i>
                      </span>
                    </fieldset>
                    <fieldset className="position-relative password-item mb_20">
                      <input
                        className="input-password"
                        type="password"
                        placeholder="New Password*"
                        name="newPassword"
                        tabIndex={2}
                        aria-required="true"
                      />
                      <span className="toggle-password unshow">
                        <i className="icon-eye-hide-line"></i>
                      </span>
                    </fieldset>
                  </div>
                  <div className="button-submit">
                    <button className="tf-btn btn-fill" type="submit">
                      <span className="text text-button">Change Password</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountPage;
