import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { editClientLocation } from "$/api/users/users.api";
import AccountCard from "$/components/shared/AccountCard";
import useAuth from "$/hooks/contexts/useAuth";
import PATHS from "$/routes/constants";
import { UserLocation } from "$/types/native/user.types";

const AddressPage = () => {
  const { user, invalidateUser } = useAuth();
  const navigate = useNavigate();

  const { mutate: editUserLoc } = useMutation({
    mutationKey: ["edit-user-location"],
    mutationFn: (payload: { id: string; location: UserLocation }) => {
      return editClientLocation(payload.id, payload.location);
    },
    onSuccess: () => {
      invalidateUser();
    },
  });

  const handleUserLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    const location: UserLocation = {
      city: values.city as string,
      street: values.street as string,
      building: values.building as string,
      notes: values.notes as string | undefined,
    };
    editUserLoc({
      id: String(user!.id),
      location: location,
    });
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
                <li>My Address</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-sidebar-account">
        <button
          data-bs-toggle="offcanvas"
          data-bs-target="#mbAccount"
          aria-controls="offcanvas"
        >
          <i className="icon icon-squares-four"></i>
        </button>
      </div>

      <section className="flat-spacing">
        <div className="container">
          <div className="my-account-wrap">
            <AccountCard />
            <div className="my-account-content">
              <div className="account-address">
                <div className="widget-inner-address text-center">
                  <h5 className="title text-left">Address</h5>
                  <form
                    className="show-form-address wd-form-address"
                    onSubmit={(e) => {
                      handleUserLocation(e);
                    }}
                  >
                    <div className="cols mb_20">
                      <fieldset className="">
                        <input
                          className=""
                          type="text"
                          placeholder="City*"
                          name="city"
                          tabIndex={2}
                          defaultValue={user?.location?.city}
                          aria-required="true"
                          required
                        />
                      </fieldset>
                      <fieldset className="">
                        <input
                          className=""
                          type="text"
                          placeholder="Building*"
                          name="building"
                          tabIndex={2}
                          defaultValue={user?.location?.building}
                          aria-required="true"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="cols mb_20">
                      <fieldset className="">
                        <input
                          className=""
                          type="text"
                          placeholder="Street*"
                          name="street"
                          tabIndex={2}
                          defaultValue={user?.location?.street}
                          aria-required="true"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="cols mb_20">
                      <fieldset className="">
                        <textarea
                          className=""
                          placeholder="note..."
                          name="notes"
                          tabIndex={2}
                          defaultValue={user?.location?.notes}
                          aria-required="true"
                        />
                      </fieldset>
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-20">
                      <button
                        type="submit"
                        className="tf-btn btn-fill radius-4"
                      >
                        <span className="text">
                          {!user || !user?.location ? "Add" : "Edit"} address
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddressPage;
