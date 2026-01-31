import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getOneById } from "$/api/checkout/checkout.api";
import AccountCard from "$/components/shared/AccountCard";
import Loader from "$/components/shared/Loader";
import PATHS from "$/routes/constants";
import { formatDateLong } from "$/utils/functions/date.functions";

const OrdersPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: order, isPending } = useQuery({
    queryKey: ["get-one-order"],
    queryFn: () => getOneById(id ? parseInt(id, 10) : 0),
    refetchOnMount: true,
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <div id="wrapper">
      <div
        className="page-title"
        style={{
          backgroundImage: `url("/images/CommonBanner.jpg")`,
        }}
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
              <div className="account-order-details">
                <div className="wd-form-order">
                  <div className="order-head">
                    <div className="content">
                      <div className="badge">{order?.status}</div>
                      <h6 className="fw-5 mt-8">Order #{order?.id}</h6>
                    </div>
                  </div>
                  <div className="tf-grid-layout md-col-1 gap-15">
                    <div className="item">
                      <div className="text-2">Start Time</div>
                      <div className="text-2 mt_4 fw-6">
                        {formatDateLong(order?.createdAt)}
                      </div>
                    </div>
                    <div className="item">
                      <div className="text-2">Address</div>
                      <div className="text-2 mt_4 fw-6">
                        {order?.location?.building}, {order?.location?.street},{" "}
                        {order?.location?.city}
                      </div>
                    </div>
                  </div>
                  <div className="widget-tabs style-3 widget-order-tab">
                    <ul className="widget-menu-tab">
                      <li className="item-title active">
                        <span className="inner">Item Details</span>
                      </li>
                    </ul>
                    <div className="widget-content-tab">
                      <div className="widget-content-inner active">
                        {order?.cart.map((item, index) => (
                          <div
                            className="order-head"
                            key={`order-item-${index}-${item.productId}`}
                          >
                            <figure
                              className="img-product"
                              key={`order-item-figure-${index}-${item.productId}`}
                            >
                              <img
                                src="images/products/womens/women-1.jpg"
                                alt="product"
                                key={`order-item-image-${index}-${item.productId}`}
                              />
                            </figure>
                            <div
                              className="content"
                              key={`order-item-div-${index}-${item.productId}`}
                            >
                              <div
                                className="text-2 fw-6"
                                key={`order-item-div2-${index}-${item.productId}`}
                              >
                                {item.name}
                              </div>
                              <div
                                className="mt_4"
                                key={`order-item-div3-${index}-${item.productId}`}
                              >
                                <span
                                  className="fw-6"
                                  key={`order-item-span-${index}-${item.productId}`}
                                >
                                  Price :
                                </span>{" "}
                                {order.currency}
                                {item.sale
                                  ? (item.basePrice -
                                      item.basePrice * item.sale) *
                                    (order.rate ?? 1)
                                  : item.basePrice * (order.rate ?? 1)}
                              </div>
                              <div
                                className="mt_4"
                                key={`order-item-div5-${index}-${item.productId}`}
                              >
                                <span
                                  className="fw-6"
                                  key={`order-item-span2-${index}-${item.productId}`}
                                >
                                  Size :
                                </span>{" "}
                                {item.selectedSize
                                  .map((each) => each.property)
                                  .join(", ")}
                              </div>
                            </div>
                          </div>
                        ))}
                        <ul>
                          <li className="d-flex justify-content-between text-2">
                            <span>Total Price</span>
                            <span className="fw-6">
                              {order?.currency}{" "}
                              {order
                                ? (order.subTotal ?? 0) * (order.rate ?? 1)
                                : 0}
                            </span>
                          </li>
                          {order && order.discount && order.discount > 0 && (
                            <li className="d-flex justify-content-between text-2 mt_4 pb_8 line-bt">
                              <span>Total Discounts</span>
                              <span className="fw-6">
                                {order?.currency}{" "}
                                {order?.discount * (order.rate ?? 1)}
                              </span>
                            </li>
                          )}
                          {order && order.delivery && order.delivery > 0 && (
                            <li className="d-flex justify-content-between text-2 mt_4 pb_8 line-bt">
                              <span>Total Discounts</span>
                              <span className="fw-6">
                                {order?.currency}{" "}
                                {order?.delivery * (order.rate ?? 1)}
                              </span>
                            </li>
                          )}
                          <li className="d-flex justify-content-between text-2 mt_8">
                            <span>Order Total</span>
                            <span className="fw-6">
                              {" "}
                              {order?.currency}{" "}
                              {order
                                ? (order?.total ?? 0) * (order.rate ?? 1)
                                : 0}
                            </span>
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
      </section>
    </div>
  );
};

export default OrdersPage;
