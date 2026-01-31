import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getAllByUserId } from "$/api/checkout/checkout.api";
import AccountCard from "$/components/shared/AccountCard";
import Loader from "$/components/shared/Loader";
import useAuth from "$/hooks/contexts/useAuth";
import PATHS from "$/routes/constants";
import { formatDateLong } from "$/utils/functions/date.functions";

const OrdersPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: ordersData, isPending } = useQuery({
    queryKey: ["get-orders"],
    queryFn: () => getAllByUserId(user?.id as number),
    refetchOnMount: true,
  });

  if (isPending) {
    return <Loader />;
  }

  const orders = ordersData?.data ?? [];

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
              <div className="account-orders">
                <div className="wrap-account-order">
                  <table>
                    <thead>
                      <tr>
                        <th className="fw-6">Order</th>
                        <th className="fw-6">Date</th>
                        <th className="fw-6">Status</th>
                        <th className="fw-6">Total</th>
                        <th className="fw-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((order, index) => (
                        <tr className="tf-order-item" key={`tr-${index}-order`}>
                          <td key={`td1-${index}-order`}>#{order.id}</td>
                          <td key={`td2-${index}-order`}>
                            {formatDateLong(order.createdAt)}
                          </td>
                          <td key={`td3-${index}-order`}>{order.status}</td>
                          <td key={`td5-${index}-order`}>
                            {order.currency}
                            {order.total} for {order.cart.length} item
                            {order.cart.length > 1 && "s"}
                          </td>
                          <td key={`td6-${index}-order`}>
                            <a
                              onClick={() =>
                                navigate(
                                  PATHS.ORDERDETAIL.replace(
                                    ":id",
                                    String(order.id),
                                  ),
                                )
                              }
                              className="tf-btn btn-fill radius-4"
                              key={`td-a-${index}-order`}
                            >
                              <span
                                key={`td-span-${index}-order`}
                                className="text"
                              >
                                View
                              </span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;
