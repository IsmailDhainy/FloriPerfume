import { useNavigate } from "react-router-dom";

import useCurrency from "$/hooks/contexts/useCurrency";
import useSettings from "$/hooks/contexts/useSettings";
import PATHS from "$/routes/constants";
import { useCartStore } from "$/store/CartStore";

const CartPage = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();

  const { currency } = useCurrency();

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeSizeItem = useCartStore((state) => state.removeSizeItem);

  const handleUpdateItem = (
    e: React.MouseEvent,
    productId: number,
    item: string,
    action: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    updateQuantity(productId, item, action);
  };

  const handleRemoveItem = (e: React.MouseEvent, productId, item) => {
    e.preventDefault();
    e.stopPropagation();

    removeSizeItem(productId, item);
  };

  const randomNumer = Math.floor(Math.random() * 100);

  let total = 0,
    subTotal = 0,
    discount = 0;
  items.map((each) => {
    subTotal += each.basePrice;
    discount += each.basePrice * (each.sale / 100);
    total += each.basePrice - each.basePrice * (each.sale / 100);
  });

  return (
    <div id="wrapper">
      <div
        className={`page-title h-[300px] bg-cover bg-center`}
        style={{
          backgroundImage: `url('${settings?.cartBanner ? settings.cartBanner : "/images/CommonBanner.jpg"}')`,
        }}
      >
        <div className="container">
          <h3 className="heading text-center">Shopping Cart</h3>
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
            <li>Shopping Cart</li>
          </ul>
        </div>
      </div>
      <section className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              {/* desktop view */}
              <div className="max-[767px]:hidden md:block">
                <div className="flex border-b border-b-[#e9e9e9] !pb-4 text-[20px] !font-semibold font-black">
                  <div className="w-[130px]">Products</div>
                  <div className="flex-2"> </div>
                  <div className="flex flex-1">Quantity</div>
                  <div className="flex flex-1">Total Price</div>
                  <div className="flex w-[20px]"></div>
                </div>
                {items.map((each, index) => (
                  <div
                    className="flex border-b border-b-[#e9e9e9] !pt-4 !pb-4 text-[20px]"
                    key={`${index}-cart-page-div`}
                  >
                    <div className="w-[130px]" key={`${index}-cart-page-div2`}>
                      <a
                        onClick={() =>
                          navigate(
                            PATHS.PRODUCTDETAIL.replace(
                              ":id",
                              String(each.productId),
                            ),
                          )
                        }
                        className="block h-[120px] w-[100px] overflow-hidden rounded-[4px]"
                        key={`${index}-cart-page-a`}
                      >
                        <img
                          src={
                            each?.image &&
                            each?.image.length > 0 &&
                            each.image[0]
                              ? each.image[0]
                              : "/images/Product.jpg"
                          }
                          alt="product"
                          key={`${index}-cart-page-img`}
                        />
                      </a>
                    </div>
                    <div className="flex-4" key={`${index}-cart-page-div-div`}>
                      <div
                        className="flex flex-col gap-[10px]"
                        key={`${index}-cart-page-div-div2`}
                      >
                        <div
                          key={`${index}-cart-page-div-div22`}
                          className="flex"
                        >
                          {each.name}
                        </div>
                        {each.selectedSize.map((eachSize, eachIndex) => (
                          <div
                            key={`${index}-cart-page-div-div2388-${randomNumer}-${eachIndex}`}
                            className="flex items-center text-[18px]"
                          >
                            <div
                              key={`${index}-cart-page-div-div24`}
                              className="flex-2"
                            >
                              <div
                                key={`${index}-cart-page-div-div25`}
                                className="flex w-[100px] items-center overflow-hidden rounded-[10px] border-2 border-[var(--line)] bg-white p-[5px]"
                              >
                                {eachSize.property}
                              </div>
                            </div>
                            <div
                              key={`${index}-cart-page-div-div2-div`}
                              className="flex-1"
                            >
                              <div
                                key={`${index}-cart-page-div-div2-div2`}
                                className="flex h-[40px] w-[120px] items-baseline justify-between overflow-hidden rounded-full border-2 border-[var(--line)] bg-white px-[10px]"
                              >
                                {" "}
                                <span
                                  key={`${index}-cart-page-div-span2`}
                                  className="text-[30px] hover:cursor-pointer hover:text-[#e43131]"
                                  onClick={(e) =>
                                    eachSize &&
                                    eachSize?.quantity &&
                                    eachSize?.quantity > 1 &&
                                    handleUpdateItem(
                                      e,
                                      each.productId,
                                      eachSize.property,
                                      "decrease",
                                    )
                                  }
                                >
                                  -
                                </span>
                                <span
                                  className="text-[20px]"
                                  key={`${index}-cart-page-div-span4`}
                                >
                                  {eachSize.quantity}
                                </span>
                                <span
                                  key={`${index}-cart-page-div-span66`}
                                  className="text-[30px] hover:cursor-pointer hover:text-[#e43131]"
                                  onClick={(e) =>
                                    handleUpdateItem(
                                      e,
                                      each.productId,
                                      eachSize.property,
                                      "increase",
                                    )
                                  }
                                >
                                  +
                                </span>
                              </div>
                            </div>
                            <div
                              className="flex-1 text-[20px]"
                              key={`${index}-cart-page-div-div33`}
                            >
                              <span className="old-price-cart">
                                {currency?.symbol ?? "$"}
                                {eachSize &&
                                  eachSize?.quantity &&
                                  (
                                    eachSize.price *
                                    eachSize.quantity *
                                    (currency?.rate ?? 1)
                                  ).toFixed(2)}
                              </span>
                              {currency?.symbol ?? "$"}
                              {each.sale
                                ? eachSize &&
                                  eachSize?.quantity &&
                                  (
                                    (eachSize.price -
                                      (eachSize.price * each.sale) / 100) *
                                    eachSize.quantity *
                                    (currency?.rate ?? 1)
                                  ).toFixed(2)
                                : eachSize &&
                                  eachSize?.quantity &&
                                  (
                                    eachSize.price *
                                    eachSize.quantity *
                                    (currency?.rate ?? 1)
                                  ).toFixed(2)}
                            </div>
                            <div
                              key={`${index}-cart-page-div-div34`}
                              className="remove icon icon-close flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border border-[var(--critical)] bg-white text-[8px] text-[var(--critical)] transition-all duration-300 ease-in-out hover:!bg-[var(--critical)] hover:!text-white"
                              onClick={(e) =>
                                handleRemoveItem(
                                  e,
                                  each.productId,
                                  eachSize.property,
                                )
                              }
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* mobile view */}
              <div className="max-[767px]:block md:hidden">
                <div className="flex border-b border-b-[#e9e9e9] !pb-4 text-[20px] !font-semibold font-black">
                  <div className="w-[130px]">Products</div>
                </div>
                {items.map((each, index) => (
                  <div
                    className="flex flex-col !gap-2 border-b border-b-[#e9e9e9] !pt-4 !pb-4 text-[20px]"
                    key={`${index}-cart2-page-div`}
                  >
                    <div className="flex">
                      <div
                        className="w-[130px]"
                        key={`${index}-cart2-page-div2`}
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
                          className="block h-[120px] w-[100px] overflow-hidden rounded-[4px]"
                          key={`${index}-cart-page-a`}
                        >
                          <img
                            src="images/accessories-cls.jpg"
                            alt="product"
                            key={`${index}-cart-page-img`}
                          />
                        </a>
                      </div>
                      <div className="" key={`${index}-cart2-page-div-div22`}>
                        {each.name}
                      </div>
                    </div>
                    <div className="" key={`${index}-cart2-page-div-div`}>
                      <div
                        className="flex flex-col gap-[10px]"
                        key={`${index}-cart2-page-div-div2`}
                      >
                        {each.selectedSize.map((eachSize, eachIndex) => (
                          <div
                            key={`${index}-cart2-page-div-div23-${eachIndex}`}
                            className="flex items-center text-[18px]"
                          >
                            <div
                              key={`${index}-cart2-page-div-div24`}
                              className="flex-1"
                            >
                              <div
                                key={`${index}-cart2-page-div-div25`}
                                className="flex w-[100px] items-center overflow-hidden rounded-[10px] border-2 border-[var(--line)] bg-white p-[5px]"
                              >
                                {eachSize.property}
                              </div>
                            </div>
                            <div
                              key={`${index}-cart2-page-div-div2-div`}
                              className="flex-1"
                            >
                              <div
                                key={`${index}-cart2-page-div-div2-div2`}
                                className="flex h-[40px] w-[120px] items-baseline justify-between overflow-hidden rounded-full border-2 border-[var(--line)] bg-white px-[10px]"
                              >
                                {" "}
                                <span
                                  key={`${index}-cart2-page-div-span2`}
                                  className="text-[30px] hover:cursor-pointer hover:text-[#e43131]"
                                  onClick={(e) =>
                                    eachSize &&
                                    eachSize?.quantity &&
                                    eachSize.quantity > 1 &&
                                    handleUpdateItem(
                                      e,
                                      each.productId,
                                      eachSize.property,
                                      "decrease",
                                    )
                                  }
                                >
                                  -
                                </span>
                                <span
                                  className="text-[20px]"
                                  key={`${index}-cart2-page-div-span4`}
                                >
                                  {eachSize.quantity}
                                </span>
                                <span
                                  key={`${index}-cart2-page-div-span66`}
                                  className="text-[30px] hover:cursor-pointer hover:text-[#e43131]"
                                  onClick={(e) =>
                                    handleUpdateItem(
                                      e,
                                      each.productId,
                                      eachSize.property,
                                      "increase",
                                    )
                                  }
                                >
                                  +
                                </span>
                              </div>
                            </div>
                            <div
                              className="flex-1 text-[20px]"
                              key={`${index}-cart2-page-div-div33`}
                            >
                              {currency?.symbol ?? "$"}
                              {each.sale
                                ? eachSize &&
                                  eachSize?.quantity &&
                                  (
                                    (eachSize.price -
                                      (eachSize.price * each.sale) / 100) *
                                    eachSize.quantity *
                                    (currency?.rate ?? 1)
                                  ).toFixed(2)
                                : eachSize &&
                                  eachSize?.quantity &&
                                  (
                                    eachSize.price *
                                    eachSize.quantity *
                                    (currency?.rate ?? 1)
                                  ).toFixed(2)}
                            </div>
                            <div
                              key={`${index}-cart2-page-div-div34`}
                              className="remove icon icon-close flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border border-[var(--critical)] bg-white text-[8px] text-[var(--critical)] transition-all duration-300 ease-in-out hover:!bg-[var(--critical)] hover:!text-white"
                              onClick={(e) =>
                                handleRemoveItem(
                                  e,
                                  each.productId,
                                  eachSize.property,
                                )
                              }
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-xl-4">
              <div className="fl-sidebar-cart">
                <div className="box-order bg-surface">
                  <h5 className="title">Order Summary</h5>
                  <div className="subtotal text-button d-flex justify-content-between align-items-center">
                    <span>Subtotal</span>
                    <span className="total">
                      {currency?.symbol ?? "$"}
                      {(subTotal * (currency?.rate ?? 1)).toFixed(2)}
                    </span>
                  </div>
                  <div className="discount text-button d-flex justify-content-between align-items-center">
                    <span>Discounts</span>
                    <span className="total">
                      -{currency?.symbol ?? "$"}
                      {(discount * (currency?.rate ?? 1)).toFixed(2)}
                    </span>
                  </div>
                  <div className="discount text-button d-flex justify-content-between align-items-center">
                    <span>Shipping</span>
                    <span className="total">
                      +{currency?.symbol ?? "$"}
                      {(
                        (settings?.shippingRate || 0) * (currency?.rate ?? 1)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <h5 className="total-order d-flex justify-content-between align-items-center">
                    <span>Total</span>
                    <span className="total">
                      {currency?.symbol ?? "$"}
                      {(
                        (total + (settings?.shippingRate || 0)) *
                        (currency?.rate ?? 1)
                      ).toFixed(2)}
                    </span>
                  </h5>
                  <div className="box-progress-checkout">
                    <a
                      onClick={() => navigate(PATHS.CHECKOUT)}
                      className="tf-btn btn-reset"
                    >
                      Process To Checkout
                    </a>
                    <p
                      onClick={() => navigate(PATHS.ALLPRODUCTS)}
                      className="text-button cursor-pointer text-center"
                    >
                      Or continue shopping
                    </p>
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

export default CartPage;
