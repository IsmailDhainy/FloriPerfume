import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createWhislist, remove } from "$/api/whishlist/whishlist.api";
import useAuth from "$/hooks/contexts/useAuth";
import useCurrency from "$/hooks/contexts/useCurrency";
import PATHS from "$/routes/constants";
import { useCartStore } from "$/store/CartStore";
import { useWhishlistStore } from "$/store/WhislistStore";

const ProductCardGrid = ({ product, index }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currency } = useCurrency();
  const queryClient = useQueryClient();

  const [selectedSizeIndex] = useState(0);
  const selectedSize = product.size?.[selectedSizeIndex];

  const isInWishlist = useWhishlistStore((state) =>
    state.isInWishlist(product.id),
  );
  const addProduct = useWhishlistStore((state) => state.addProduct);
  const removeProduct = useWhishlistStore((state) => state.removeProduct);
  const addItem = useCartStore((state) => state.addItem);

  const { mutate: addToWishlistAPI } = useMutation({
    mutationFn: () =>
      createWhislist({ productId: product.id, userId: user!.id }),
    onSuccess: () => {
      // Invalidate wishlist query to refetch from backend
      queryClient.invalidateQueries({
        queryKey: ["get-whislist-by-userId", user?.id],
      });
    },
    onError: () => {
      toast.error("Failed to add to wishlist");
    },
  });

  // Remove from wishlist mutation
  const { mutate: removeFromWishlistAPI } = useMutation({
    mutationFn: () => remove(product.id, user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-whislist-by-userId", user?.id],
      });
    },
    onError: () => {
      toast.error("Failed to remove from wishlist");
    },
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedSize) {
      return;
    }

    addItem(product, selectedSize, 1);
  };

  const handleWhishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist) {
      // Remove from wishlist
      removeProduct(product.id);
      if (user?.id) {
        removeFromWishlistAPI();
      }
      toast.success("Removed to wishlist");
    } else {
      // Add to wishlist
      addProduct(product);
      if (user?.id) {
        addToWishlistAPI();
      }
      toast.success("Added to wishlist");
    }
  };

  return (
    <div
      className="card-product grid"
      data-brand={product.brand?.name || ""}
      data-category={product.category && product.category.name}
      key={`${index}-${product.id}-grid-div`}
    >
      <div
        className="card-product-wrapper"
        key={`${index}-${product.id}-grid-div2`}
      >
        <a
          onClick={() =>
            navigate(PATHS.PRODUCTDETAIL.replace(":id", String(product.id)))
          }
          className="product-img"
          key={`${index}-${product.id}-grid-a`}
        >
          <img
            className="lazyload img-product"
            data-src={
              product?.image && product?.image.length > 0 && product.image[0]
                ? product.image[0]
                : "/images/Product.jpg"
            }
            src={
              product?.image && product?.image.length > 0 && product.image[0]
                ? product.image[0]
                : "/images/Product.jpg"
            }
            alt="image-product"
            key={`${index}-${product.id}-grid-img`}
          />
          <img
            className="lazyload img-hover"
            data-src={
              product?.image && product?.image.length > 0 && product.image[0]
                ? product.image[0]
                : "/images/Product.jpg"
            }
            src={
              product?.image && product?.image.length > 0 && product.image[0]
                ? product.image[0]
                : "/images/Product.jpg"
            }
            alt="image-product"
            key={`${index}-${product.id}-grid-img2`}
          />
        </a>
        {product.sale && (
          <div
            className="on-sale-wrap"
            key={`${index}-${product.id}-grid-div366`}
          >
            <span
              className="on-sale-item"
              key={`${index}-${product.id}-grid-span2`}
            >
              -{product.sale}%
            </span>
          </div>
        )}
        {product.hotSale && (
          <div
            className="marquee-product bg-main"
            key={`${index}-${product.id}-grid-div3`}
          >
            <div
              className="marquee-wrapper"
              key={`${index}-${product.id}-grid-div-div1`}
            >
              <div
                className="initial-child-container"
                key={`${index}-${product.id}-grid-div-div2`}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <>
                    <div
                      className="marquee-child-item"
                      key={`${index}-${product.id}-grid-div-div1-div2`}
                    >
                      <p
                        className="font-2 text-btn-uppercase fw-6 text-white"
                        key={`${index}-${product.id}-grid-div-div1-p`}
                      >
                        Hot Sale {product.sale}% OFF
                      </p>
                    </div>
                    <div
                      className="marquee-child-item"
                      key={`${index}-${product.id}-grid-div-div1-div4`}
                    >
                      <span
                        className="icon icon-lightning text-critical"
                        key={`${index}-${product.id}-grid-div-div1-span`}
                      ></span>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div
              className="marquee-wrapper"
              key={`${index}-${product.id}-grid-div-div1-div21`}
            >
              <div
                className="initial-child-container"
                key={`${index}-${product.id}-grid-div-div1-div22`}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={`${index}-${product.id}-grid-div-div1-div2-2`}>
                    <div
                      className="marquee-child-item"
                      key={`${index}-${product.id}-grid-div-div1-div23`}
                    >
                      <p
                        className="font-2 text-btn-uppercase fw-6 text-white"
                        key={`${index}-${product.id}-grid-div-div1-p22`}
                      >
                        Hot Sale {product.sale}% OFF
                      </p>
                    </div>
                    <div
                      className="marquee-child-item"
                      key={`${index}-${product.id}-grid-div-div1-div24`}
                    >
                      <span
                        className="icon icon-lightning text-critical"
                        key={`${index}-${product.id}-grid-div-div1-span33`}
                      ></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="list-product-btn">
          <a
            onClick={handleWhishlist}
            className={`box-icon wishlist btn-icon-action ${isInWishlist && "!bg-black !text-white"}`}
          >
            <span className="icon icon-heart"></span>
            <span className="tooltip">
              {isInWishlist ? "Remove" : "Add"} Wishlist
            </span>
          </a>
        </div>
        <div className="list-btn-main">
          <a
            href="#shoppingCart"
            data-bs-toggle="modal"
            className="btn-main-product"
            onClick={handleAddToCart}
          >
            Add To cart
          </a>
        </div>
      </div>
      <div className="card-product-info">
        <a
          className="title link"
          onClick={() =>
            navigate(PATHS.PRODUCTDETAIL.replace(":id", String(product.id)))
          }
        >
          {product.name}
        </a>
        <div className="price">
          {product.sale && product.sale > 0 ? (
            <span className="old-price">
              {currency?.symbol ?? "$"}
              {(product.price * (currency?.rate ?? 1)).toFixed(2)}
            </span>
          ) : null}
          <span className="current-price">
            {" "}
            {currency?.symbol ?? "$"}{" "}
            {(product.netPrice * (currency?.rate ?? 1)).toFixed(2)}
          </span>
        </div>
        <div className="price" key={`product-div22-${index}-${product.id}`}>
          {product.category && (
            <span className="text-secondary-2">
              {" "}
              {product.category.name}
              {" - "}
            </span>
          )}

          <span className="text-secondary-2">{product.brand?.name || ""}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardGrid;
