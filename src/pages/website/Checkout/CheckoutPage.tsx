import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "$/api/auth/login";
import { createCheckout } from "$/api/checkout/checkout.api";
import useAuth from "$/hooks/contexts/useAuth";
import useCurrency from "$/hooks/contexts/useCurrency";
import useSettings from "$/hooks/contexts/useSettings";
import PATHS from "$/routes/constants";
import { useCartStore } from "$/store/CartStore";
import { Checkout } from "$/types/native/checkout.types";
import { errorMessageToaster } from "$/utils/functions/error.functions";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const { settings } = useSettings();

  const { invalidateUser, user } = useAuth();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  let total = 0,
    subTotal = 0,
    discount = 0;
  items.map((each) => {
    subTotal += each.basePrice;
    discount += each.basePrice * (each.sale / 100);
    total += each.basePrice - each.basePrice * (each.sale / 100);
  });

  const { mutate } = useMutation({
    mutationKey: ["create-checkout"],
    mutationFn: createCheckout,
    onSuccess: () => {
      toast.success(`Checkout successfully placed`);
      clearCart();
      navigate(PATHS.HOME);
    },
  });

  const { mutate: login } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: loginUser,
    onSuccess: () => {
      invalidateUser();
    },
    onError: (error: AxiosError) => errorMessageToaster(error),
  });

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    if (data.email === "") {
      delete data.email;
    }

    const checkoutData = items.map((each) => ({
      productId: each.productId,
      basePrice: each.basePrice,
      sale: each.sale,
      selectedSize: each.selectedSize,
    }));

    const finalData = {
      ...data,
      total,
      subTotal,
      discount,
      cart: checkoutData,
    } as Checkout;

    if (user) {
      (finalData as Checkout).userId = user.id;
    }
    if (settings && settings?.shippingRate > 0) {
      finalData.delivery = settings?.shippingRate;
    }
    if (currency) {
      finalData.currency = currency.code;
      finalData.rate = currency.rate;
    }

    mutate(finalData);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    login(data as { email: string; password: string });
  };

  return (
    <div id="wrapper">
      <div
        className={`page-title h-[300px] bg-cover bg-center`}
        style={{
          backgroundImage: `url('${settings?.checkoutBanner ? settings.checkoutBanner : "/images/CommonBanner.jpg"}')`,
        }}
      >
        <div className="container">
          <h3 className="heading text-center">Check Out</h3>
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
              <a className="link" onClick={() => navigate(PATHS.ALLPRODUCTS)}>
                Shop
              </a>
            </li>
            <li>
              <i className="icon-arrRight"></i>
            </li>
            <li>View Cart</li>
          </ul>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="flat-spacing tf-page-checkout">
                {!user && (
                  <div className="wrap">
                    <div className="title-login">
                      <p>Already have an account?</p>
                      <a
                        onClick={() => navigate(PATHS.CLIENTLOGIN)}
                        className="text-button"
                      >
                        Login here
                      </a>
                    </div>
                    <form
                      className="login-box"
                      onSubmit={(data) => {
                        handleLogin(data);
                      }}
                    >
                      <div className="grid-2">
                        <input
                          type="text"
                          name="email"
                          placeholder="Your name/Email*"
                          required
                        />
                        <input
                          type="password"
                          placeholder="Password*"
                          name="password"
                          required
                        />
                      </div>
                      <button className="tf-btn" type="submit">
                        <span className="text">Login</span>
                      </button>
                    </form>
                  </div>
                )}
                <form className="info-box" onSubmit={(e) => handleCheckout(e)}>
                  <div className="wrap">
                    <h5 className="title">Information</h5>
                    <div className="info-box">
                      <div className="grid-2">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name*"
                          required
                          defaultValue={user?.firstName}
                        />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name*"
                          required
                          defaultValue={user?.lastName}
                        />
                      </div>
                      <div className="grid-2">
                        <input
                          type="text"
                          name="email"
                          placeholder="Email Address"
                          defaultValue={user?.email}
                        />
                        <input
                          type="text"
                          name="phone"
                          placeholder="Phone Number*"
                          defaultValue={user?.phone}
                          required
                        />
                      </div>
                      <div className="grid-1">
                        <input
                          type="text"
                          name="city"
                          placeholder="City*"
                          defaultValue={user?.location?.city}
                          required
                        />
                      </div>
                      <div className="grid-2">
                        <input
                          type="text"
                          name="building"
                          placeholder="Building*"
                          required
                          defaultValue={user?.location?.building}
                        />
                        <input
                          type="text"
                          name="street"
                          placeholder="Street,..."
                          required
                          defaultValue={user?.location?.street}
                        />
                      </div>
                      <textarea
                        name="notes"
                        placeholder="Write note..."
                        defaultValue={user?.location?.notes}
                      ></textarea>
                    </div>
                  </div>
                  <div className="wrap">
                    <h5 className="title">Choose payment Option:</h5>
                    <div className="form-payment">
                      <div className="payment-box" id="payment-box">
                        <div className="payment-item">
                          <label
                            html-for="delivery-method"
                            className="payment-header collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#delivery-payment"
                            aria-controls="delivery-payment"
                          >
                            <input
                              type="radio"
                              name="payment-method"
                              className="tf-check-rounded"
                              id="delivery-method"
                              defaultChecked={true}
                            />
                            <span className="text-title">Cash on delivery</span>
                          </label>
                          <div
                            id="delivery-payment"
                            className="collapse"
                            data-bs-parent="#payment-box"
                          ></div>
                        </div>
                      </div>
                      <button className="tf-btn btn-reset" type="submit">
                        Check Out
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-xl-1">
              <div className="line-separation"></div>
            </div>
            <div className="col-xl-5">
              <div className="flat-spacing flat-sidebar-checkout">
                <div className="sidebar-checkout-content">
                  <h5 className="title">Shopping Cart</h5>
                  <div className="list-product">
                    {items.map((each, index) => (
                      <div
                        key={`${index}-${each.id}-div`}
                        className="item-product"
                      >
                        <a
                          key={`${index}-${each.id}-a`}
                          onClick={() =>
                            navigate(
                              PATHS.PRODUCTDETAIL.replace(
                                ":id",
                                String(each.productId),
                              ),
                            )
                          }
                          className="img-product"
                        >
                          <img
                            key={`${index}-${each.id}-img`}
                            src={
                              each?.image &&
                              each?.image.length > 0 &&
                              each.image[0]
                                ? each.image[0]
                                : "/images/Product.jpg"
                            }
                            alt="img-product"
                          />
                        </a>
                        <div
                          className="content-box"
                          key={`${index}-${each.id}-div2`}
                        >
                          <div
                            className="info flex w-[100%]"
                            key={`${index}-${each.id}-div3`}
                          >
                            <a
                              onClick={() =>
                                navigate(
                                  PATHS.PRODUCTDETAIL.replace(
                                    ":id",
                                    String(each.productId),
                                  ),
                                )
                              }
                              className="name-product link text-title"
                              key={`${index}-${each.id}-a2`}
                            >
                              {each.name}
                            </a>
                            {each.selectedSize.map((eachSize) => (
                              <div
                                key={`${index}-${each.id}-div4`}
                                className="variant text-caption-1 text-secondary flex items-center justify-between"
                              >
                                <span
                                  className="size"
                                  key={`${index}-${each.id}-span`}
                                >
                                  {eachSize.property}
                                </span>
                                <div
                                  className="total-price text-button"
                                  key={`${index}-${each.id}-div5`}
                                >
                                  <span
                                    className="count"
                                    key={`${index}-${each.id}-span2`}
                                  >
                                    {eachSize.quantity}
                                  </span>
                                  X
                                  <span
                                    className="price"
                                    key={`${index}-${each.id}-span3`}
                                  >
                                    {currency?.symbol ?? "$"}
                                    {each.sale
                                      ? (
                                          (eachSize.price -
                                            (eachSize.price * each.sale) /
                                              100) *
                                          (currency?.rate ?? 1)
                                        ).toFixed(2)
                                      : (
                                          eachSize.price * (currency?.rate ?? 1)
                                        ).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="sec-total-price">
                    <div className="top">
                      <div className="item d-flex align-items-center justify-content-between text-button">
                        <span>Subtotal</span>
                        <span>
                          {" "}
                          {currency?.symbol ?? "$"}
                          {(subTotal * (currency?.rate ?? 1)).toFixed(2)}
                        </span>
                      </div>
                      <div className="item d-flex align-items-center justify-content-between text-button">
                        <span>Shipping</span>
                        <span>
                          {settings?.shippingRate === 0
                            ? "Free"
                            : `${currency?.symbol ?? "$"}${(
                                (currency?.rate || 1) *
                                (settings?.shippingRate || 0)
                              ).toFixed(2)}`}
                        </span>
                      </div>
                      <div className="item d-flex align-items-center justify-content-between text-button">
                        <span>Discounts</span>
                        <span>
                          -{currency?.symbol ?? "$"}
                          {(discount * (currency?.rate ?? 1)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="bottom">
                      <h5 className="d-flex justify-content-between">
                        <span>Total</span>
                        <span className="total-price-checkout">
                          {currency?.symbol ?? "$"}
                          {(
                            (total + (settings?.shippingRate || 0)) *
                            (currency?.rate ?? 1)
                          ).toFixed(2)}
                        </span>
                      </h5>
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

export default CheckoutPage;
