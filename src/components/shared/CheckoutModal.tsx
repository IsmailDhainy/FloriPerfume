import { useNavigate } from "react-router-dom";

import useCurrency from "$/hooks/contexts/useCurrency";
import PATHS from "$/routes/constants";
import { useCartStore } from "$/store/CartStore";

const CheckoutModal = () => {
  const navigate = useNavigate();
  const { currency } = useCurrency();

  const items = useCartStore((state) => state.items);
  const totalPrice = items.reduce((total, item) => {
    const price =
      item.sale != null
        ? item.basePrice - item.basePrice * (item.sale / 100)
        : item.basePrice;

    return total + price;
  }, 0);

  const handleRemoveFromCart = (e: React.MouseEvent, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (!item) {
      return;
    }

    removeItem(item);
  };

  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="modal fullRight fade modal-shopping-cart" id="shoppingCart">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="d-flex flex-column h-100 flex-grow-1">
            <div className="header">
              <h5 className="title">Shopping Cart</h5>
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="modal"
              ></span>
            </div>
            <div className="wrap">
              <div className="tf-mini-cart-wrap">
                <div className="tf-mini-cart-main">
                  <div className="tf-mini-cart-sroll">
                    <div className="tf-mini-cart-items">
                      {items.map((each) => (
                        <div className="tf-mini-cart-item file-delete">
                          <div className="tf-mini-cart-image">
                            <img
                              className="lazyload"
                              data-src={
                                each?.image &&
                                each?.image.length > 0 &&
                                each.image[0]
                                  ? each.image[0]
                                  : "/images/Product.jpg"
                              }
                              src={
                                each?.image &&
                                each?.image.length > 0 &&
                                each.image[0]
                                  ? each.image[0]
                                  : "/images/Product.jpg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="tf-mini-cart-info flex-grow-1">
                            <div className="mb_12 d-flex align-items-center justify-content-between flex-wrap gap-12">
                              <div className="text-title">
                                <a
                                  className="link text-line-clamp-1"
                                  onClick={() =>
                                    navigate(
                                      PATHS.PRODUCTDETAIL.replace(
                                        ":id",
                                        String(each.productId),
                                      ),
                                    )
                                  }
                                >
                                  {each.name}
                                </a>
                              </div>
                              <div
                                className="text-button tf-btn-remove remove"
                                onClick={(e) =>
                                  handleRemoveFromCart(e, each.productId)
                                }
                              >
                                Remove
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                              {each.selectedSize.map((sizeItem, sizeIndex) => (
                                <div
                                  key={`${sizeIndex}-div-cart-modal`}
                                  className="flex w-full items-center justify-between"
                                >
                                  <div
                                    key={`${sizeIndex}-div2-cart-modal`}
                                    className="text-secondary-2"
                                  >
                                    {sizeItem.property}
                                  </div>
                                  <div
                                    key={`${sizeIndex}-div3-cart-modal`}
                                    className="text-button"
                                  >
                                    {sizeItem.quantity} X{" "}
                                    {currency?.symbol ?? "$"}
                                    {each.sale
                                      ? (
                                          (sizeItem.price -
                                            (sizeItem.price * each.sale) /
                                              100) *
                                          (currency?.rate ?? 1)
                                        ).toFixed(2)
                                      : each.sale}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="tf-mini-cart-bottom">
                  <div className="tf-mini-cart-bottom-wrap">
                    <div className="tf-cart-totals-discounts">
                      <h5>Subtotal</h5>
                      <h5 className="tf-totals-total-value">
                        {currency?.symbol ?? "$"}
                        {(totalPrice * (currency?.rate ?? 1)).toFixed(2)}
                      </h5>
                    </div>
                    <div className="tf-mini-cart-view-checkout">
                      <a
                        data-bs-dismiss="modal"
                        onClick={() => navigate(PATHS.CART)}
                        className="tf-btn btn-white radius-4 has-border w-100"
                      >
                        <span className="text">View cart</span>
                      </a>
                      <a
                        data-bs-dismiss="modal"
                        onClick={() => navigate(PATHS.CHECKOUT)}
                        className="tf-btn btn-fill radius-4 w-100"
                      >
                        <span className="text">Check Out</span>
                      </a>
                    </div>
                    <div
                      className="cursor-pointer text-center"
                      onClick={() => navigate(PATHS.ALLPRODUCTS)}
                    >
                      <a className="link text-btn-uppercase">
                        Or continue shopping
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
