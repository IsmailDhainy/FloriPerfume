import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getAllProductsByType, getOne } from "$/api/products/product.api";
import Loader from "$/components/shared/Loader";
import useCurrency from "$/hooks/contexts/useCurrency";
import useSettings from "$/hooks/contexts/useSettings";
import PATHS from "$/routes/constants";
import {
  ProductSize2,
  ProductTableType,
  useCartStore,
} from "$/store/CartStore";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currency } = useCurrency();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const updateItem = useCartStore((state) => state.updateItem);
  const removeSizeItem = useCartStore((state) => state.removeSizeItem);

  const [price, setPrice] = useState<number>(0);
  const [productProperty, setProductProperty] = useState<ProductSize2>();
  const [quantity, setQuantity] = useState<number>(0);

  const { data: productData, isPending } = useQuery({
    queryKey: ["get-one-product", id],
    queryFn: () => getOne(parseInt(id!, 10)),
    enabled: !!id,
    refetchOnMount: true,
  });

  const { data: productsResponse } = useQuery({
    queryKey: ["get-products-by-type", productData],
    queryFn: () =>
      getAllProductsByType(
        undefined,
        { offset: 0, limit: 4 },
        undefined,
        undefined,
        [Number(productData?.brandId)],
      ),
    placeholderData: (previousData) => previousData,
    refetchOnMount: true,
  });

  const handleUpdateItem = (
    e: React.MouseEvent,
    product: ProductTableType,
    productProperty: ProductSize2,
    action: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    let updatedQuantity = quantity;

    if (action === "increment") {
      updatedQuantity = updatedQuantity + 1;
    } else {
      updatedQuantity -= 1;
    }

    if (updatedQuantity <= 0) {
      // Remove the item instead
      removeSizeItem(product.id, productProperty.property);
      toast.success("Product property has been removed from cart successfully");
      return;
    }

    // Use 'set' action to set the exact quantity
    updateItem(product, productProperty, "set", updatedQuantity);
    toast.success(`Product property has been ${action}ed to cart successfully`);
  };

  const handlePriceAndProperty = (each: ProductSize2) => {
    setPrice(each.price);
    setProductProperty(each);
  };

  useEffect(() => {
    if (productData) {
      setPrice(productData.price);
      const found = productData.size.filter(
        (each) => each.price === productData.price,
      );
      if (found.length !== 0) {
        setProductProperty(found[0]);
      }
    }
  }, [productData, productData?.size]);

  useEffect(() => {
    if (productData && productProperty) {
      const found = items.find((item) => item.productId === productData.id);

      if (!found) {
        setQuantity(0);
      } else {
        // Find the specific size that matches the current productProperty
        const sizeItem = found.selectedSize.find(
          (size) => size.property === productProperty.property,
        );

        if (sizeItem) {
          setQuantity(sizeItem.quantity);
        } else {
          setQuantity(0);
        }
      }
    }
  }, [productData, productProperty, items]);

  const products = productsResponse?.data || [];

  if (isPending) {
    return <Loader />;
  }

  return (
    <div id="wrapper">
      <div
        className={`page-title h-[300px] bg-cover bg-center`}
        style={{
          backgroundImage: `url('${settings?.productDetailBanner}')`,
        }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Product Detail</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <a onClick={() => navigate(PATHS.HOME)} className="link">
                    Homepage
                  </a>
                </li>
                <li>
                  <i className="icon-arrRight"></i>
                </li>
                <li>
                  <a
                    onClick={() => navigate(PATHS.ALLPRODUCTS)}
                    className="link"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <i className="icon-arrRight"></i>
                </li>
                <li>Product Detail</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section className="flat-spacing">
        <div className="tf-main-product section-image-zoom">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="tf-product-media-wrap sticky-top">
                  <div className="thumbs-slider">
                    <div
                      dir="ltr"
                      className="swiper tf-product-media-thumbs other-image-zoom"
                      data-direction="vertical"
                    ></div>
                    <div
                      dir="ltr"
                      className="swiper tf-product-media-main"
                      id="gallery-swiper-started"
                    >
                      <div className="swiper-wrapper">
                        <div className="swiper-slide" data-color="grey">
                          <a
                            target="_blank"
                            className="item"
                            data-pswp-width="600px"
                            data-pswp-height="800px"
                          >
                            <img
                              className="tf-image-zoom lazyload"
                              data-zoom={
                                productData?.image &&
                                productData?.image.length > 0 &&
                                productData.image[0]
                                  ? productData.image[0]
                                  : "/images/Product.jpg"
                              }
                              data-src={
                                productData?.image &&
                                productData?.image.length > 0 &&
                                productData.image[0]
                                  ? productData.image[0]
                                  : "/images/Product.jpg"
                              }
                              src={
                                productData?.image &&
                                productData?.image.length > 0 &&
                                productData.image[0]
                                  ? productData.image[0]
                                  : "/images/Product.jpg"
                              }
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="tf-product-info-wrap position-relative">
                  <div className="tf-zoom-main"></div>
                  <div className="tf-product-info-list other-image-zoom">
                    <div className="tf-product-info-heading">
                      <div className="tf-product-info-name">
                        <div className="text text-btn-uppercase">
                          {productData?.category?.name}
                        </div>
                        <h3 className="name">{productData?.name}</h3>
                      </div>
                      <div className="tf-product-info-desc">
                        <div className="tf-product-info-price">
                          <h5 className="price-on-sale font-2">
                            {" "}
                            {currency?.symbol ?? "$"}
                            {productData && productData.sale !== 0
                              ? (
                                  (price - (price * productData.sale) / 100) *
                                  (currency?.rate ?? 1)
                                ).toFixed(2)
                              : (price * (currency?.rate ?? 1)).toFixed(2)}
                          </h5>
                          {productData && productData.sale !== 0 && (
                            <>
                              <div className="compare-at-price font-2">
                                {currency?.symbol ?? "$"}
                                {(price * (currency?.rate ?? 1)).toFixed(2)}
                              </div>
                              <div className="badges-on-sale text-btn-uppercase">
                                -{productData?.sale}%
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="tf-product-info-choose-option">
                      <div className="variant-picker-item">
                        <div className="variant-picker-values gap12">
                          {productData?.size?.map((each) => (
                            <div onClick={() => handlePriceAndProperty(each)}>
                              <input
                                type="radio"
                                name="size1"
                                id={`values-${each.property}`}
                                key={`input-values-${each.property}`}
                              />
                              <label
                                className={`style-text size-btn ${each.property === productProperty?.property && "bg-black text-white"}`}
                                htmlFor={`values-${each.property}`}
                                data-value={each.property}
                                data-price={each.price}
                                key={`label-values-${each.property}`}
                              >
                                <span
                                  className="text-title"
                                  key={`span-values-${each.property}`}
                                >
                                  {each.property}
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="tf-product-info-quantity">
                        <div className="title mb_12">Quantity:</div>
                        <div className="wg-quantity">
                          <span
                            className="btn-quantity btn-decrease"
                            onClick={(e) => {
                              if (!productData || !productProperty) return;

                              handleUpdateItem(
                                e,
                                productData,
                                productProperty,
                                "decrement",
                              );
                            }}
                          >
                            -
                          </span>
                          <input
                            className="quantity-product"
                            type="text"
                            name="number"
                            value={quantity}
                          />
                          <span
                            className="btn-quantity btn-increase"
                            onClick={(e) => {
                              if (!productData || !productProperty) return;

                              handleUpdateItem(
                                e,
                                productData,
                                productProperty,
                                "increment",
                              );
                            }}
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {products.length > 0 && (
        <section className="flat-spacing">
          <div className="flat-animate-tab container">
            <ul
              className="tab-product justify-content-sm-center wow fadeInUp"
              data-wow-delay="0s"
              role="tablist"
            >
              <li className="nav-tab-item" role="presentation">
                <a
                  href="#ralatedProducts"
                  className="active"
                  data-bs-toggle="tab"
                >
                  Ralated Products
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane active show"
                id="ralatedProducts"
                role="tabpanel"
              >
                <div
                  dir="ltr"
                  className="swiper tf-sw-latest"
                  data-preview="4"
                  data-tablet="3"
                  data-mobile="2"
                  data-space-lg="30"
                  data-space-md="30"
                  data-space="15"
                  data-pagination="1"
                  data-pagination-md="1"
                  data-pagination-lg="1"
                >
                  <div className="swiper-wrapper">
                    {products.map((product, index) => (
                      <div
                        className="swiper-slide"
                        key={`${index}-product-details-div`}
                      >
                        <div
                          className="card-product"
                          key={`${index}-product-details-div2`}
                        >
                          <div
                            className="card-product-wrapper"
                            key={`${index}-product-details-div3`}
                          >
                            <a
                              onClick={() =>
                                navigate(
                                  PATHS.PRODUCTDETAIL.replace(
                                    ":id",
                                    String(product.id),
                                  ),
                                )
                              }
                              className="product-img"
                              key={`${index}-product-details-a`}
                            >
                              <img
                                className="lazyload img-product"
                                data-src={
                                  product?.image &&
                                  product?.image.length > 0 &&
                                  product.image[0]
                                    ? product.image[0]
                                    : "/images/Product.jpg"
                                }
                                src={
                                  product?.image &&
                                  product?.image.length > 0 &&
                                  product.image[0]
                                    ? product.image[0]
                                    : "/images/Product.jpg"
                                }
                                alt="image-product"
                                key={`${index}-product-details-img`}
                              />
                              <img
                                className="lazyload img-hover"
                                data-src={
                                  product?.image &&
                                  product?.image.length > 0 &&
                                  product.image[0]
                                    ? product.image[0]
                                    : "/images/Product.jpg"
                                }
                                src={
                                  product?.image &&
                                  product?.image.length > 0 &&
                                  product.image[0]
                                    ? product.image[0]
                                    : "/images/Product.jpg"
                                }
                                alt="image-product"
                                key={`${index}-product-details-img2`}
                              />
                            </a>
                            {product?.sale && (
                              <div
                                className="on-sale-wrap"
                                key={`${index}-product-details-div4`}
                              >
                                <span
                                  className="on-sale-item"
                                  key={`${index}-product-details-span22`}
                                >
                                  -{product?.sale}%
                                </span>
                              </div>
                            )}
                            {product?.hotSale && (
                              <div className="marquee-product bg-main">
                                <div className="marquee-wrapper">
                                  <div className="initial-child-container">
                                    {Array.from({ length: 5 }).map(
                                      (_, index) => (
                                        <>
                                          <div
                                            className="marquee-child-item"
                                            key={`${index}-hotsale`}
                                          >
                                            <p
                                              className="font-2 text-btn-uppercase fw-6 text-white"
                                              key={`${index}-hotsale- p`}
                                            >
                                              Hot Sale {product.sale}% OFF
                                            </p>
                                          </div>
                                          <div
                                            className="marquee-child-item"
                                            key={`${index}-hotsale-dev`}
                                          >
                                            <span
                                              className="icon icon-lightning text-critical"
                                              key={`${index}-hotsale-span`}
                                            ></span>
                                          </div>
                                        </>
                                      ),
                                    )}
                                  </div>
                                </div>
                                {product.sale > 0 && (
                                  <div className="marquee-wrapper">
                                    <div className="initial-child-container">
                                      {Array.from({ length: 5 }).map(
                                        (_, index) => (
                                          <>
                                            <div
                                              className="marquee-child-item"
                                              key={`${index}-hotsale2`}
                                            >
                                              <p
                                                className="font-2 text-btn-uppercase fw-6 text-white"
                                                key={`${index}-hotsale2-p`}
                                              >
                                                Hot Sale {product.sale}% OFF
                                              </p>
                                            </div>
                                            <div
                                              className="marquee-child-item"
                                              key={`${index}-hotsale2-div`}
                                            >
                                              <span
                                                className="icon icon-lightning text-critical"
                                                key={`${index}-hotsale2-span`}
                                              ></span>
                                            </div>
                                          </>
                                        ),
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="list-product-btn">
                              <a
                                href="javascript:void(0);"
                                className="box-icon wishlist btn-icon-action"
                              >
                                <span className="icon icon-heart"></span>
                                <span className="tooltip">Wishlist</span>
                              </a>
                            </div>
                            <div className="list-btn-main">
                              <a
                                href="#shoppingCart"
                                data-bs-toggle="modal"
                                className="btn-main-product"
                              >
                                Add To cart
                              </a>
                            </div>
                          </div>
                          <div className="card-product-info">
                            <a
                              onClick={() =>
                                navigate(
                                  PATHS.PRODUCTDETAIL.replace(
                                    ":id",
                                    String(product.id),
                                  ),
                                )
                              }
                              className="title link"
                            >
                              {product.name}
                            </a>
                            <span className="price">
                              <span className="old-price">
                                ${product.price}
                              </span>{" "}
                              ${product.netPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="sw-pagination-latest sw-dots type-circle justify-content-center"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
