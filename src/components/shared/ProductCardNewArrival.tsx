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

const ProductCardNewArrival = ({ product, index }) => {
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
      toast.success("Removed from wishlist");
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
      className="card-product wow fadeInUp"
      data-wow-delay="0.1s"
      key={`${index}-product-card-new-arrival-div`}
    >
      <div
        className="card-product-wrapper"
        key={`${index}-product-card-new-arrival-div22`}
      >
        <a
          onClick={() =>
            navigate(PATHS.PRODUCTDETAIL.replace(":id", String(product.id)))
          }
          className="product-img"
          key={`${index}-product-card-new-arrival-a`}
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
            key={`${index}-product-card-new-arrival-img`}
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
            key={`${index}-product-card-new-arrival-img22`}
          />
        </a>
        {product.sale > 0 && (
          <div
            className="on-sale-wrap"
            key={`${index}-product-card-new-arrival-div22`}
          >
            <span
              className="on-sale-item"
              key={`${index}-product-card-new-arrival-span22`}
            >
              -{product.sale}%
            </span>
          </div>
        )}
        <div
          className="marquee-product bg-main"
          key={`${index}-product-card-new-arrival-div33`}
        >
          <div
            className="marquee-wrapper"
            key={`${index}-product-card-new-arrival-div44`}
          >
            {product.hotSale && (
              <div
                className="initial-child-container"
                key={`${index}-product-card-new-arrival-div-s`}
              >
                {Array.from({ length: 8 }).map((_, index2) => (
                  <>
                    <div
                      className="marquee-child-item"
                      key={`${index2}-product-card-new-arrival-div-div22`}
                    >
                      <p
                        className="font-2 text-btn-uppercase fw-6 text-white"
                        key={`${index2}-product-card-new-arrival-p`}
                      >
                        Hot Sale {product.sale}% OFF
                      </p>
                    </div>
                    <div
                      className="marquee-child-item"
                      key={`${index2}-product-card-new-arrival-div-div44`}
                    >
                      <span
                        className="icon icon-lightning text-critical"
                        key={`${index2}-product-card-new-arrival-div-span65`}
                      ></span>
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
          <div
            className="marquee-wrapper"
            key={`${index}-product-card-new-arrival-div-ll`}
          >
            {product.hotSale && (
              <div
                className="initial-child-container"
                key={`${index}-product-card-new-arrival-div-ll2`}
              >
                {Array.from({ length: 9 }).map((_, index2) => (
                  <>
                    <div
                      className="marquee-child-item"
                      key={`${index2}-product-card-new-arrival-div-div66`}
                    >
                      <p
                        className="font-2 text-btn-uppercase fw-6 text-white"
                        key={`${index2}-product-card-new-arrival-div-p`}
                      >
                        Hot Sale {product.sale}% OFF
                      </p>
                    </div>
                    <div
                      className="marquee-child-item"
                      key={`${index2}-product-card-new-arrival-div-div77`}
                    >
                      <span
                        className="icon icon-lightning text-critical"
                        key={`${index2}-product-card-new-arrival-div-span`}
                      ></span>
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className="list-product-btn"
          key={`${index}-product-card-new-arrival-div-din`}
        >
          <a
            onClick={handleWhishlist}
            className={`box-icon wishlist btn-icon-action ${isInWishlist && "whislist-active"}`}
            key={`${index}-product-card-new-arrival-div-a-a`}
          >
            <span
              className="icon icon-heart"
              key={`${index}-product-card-new-arrival-div-a-span`}
            ></span>
            <span
              className="tooltip"
              key={`${index}-product-card-new-arrival-div-a-span33`}
            >
              {isInWishlist ? "Remove" : "Add"} Wishlist
            </span>
          </a>
        </div>
        <div
          className="list-btn-main"
          key={`${index}-product-card-new-arrival-div-ff`}
        >
          <a
            href="#shoppingCart"
            data-bs-toggle="modal"
            className="btn-main-product"
            onClick={handleAddToCart}
            key={`${index}-product-card-new-arrival-div-a-a`}
          >
            Add To cart
          </a>
        </div>
      </div>
      <div
        className="card-product-info"
        key={`${index}-product-card-new-arrival-div-555`}
      >
        <a
          onClick={() =>
            navigate(PATHS.PRODUCTDETAIL.replace(":id", String(product.id)))
          }
          className="title link"
          key={`${index}-product-card-new-arrival-div-11-22`}
        >
          {product.name}
        </a>
        <span
          className="price"
          key={`${index}-product-card-new-arrival-div-span-div`}
        >
          <span
            className="old-price"
            key={`${index}-product-card-new-arrival-div-span-span`}
          >
            {currency?.symbol ?? "$"}
            {(product.price * (currency?.rate ?? 1)).toFixed(2)}
          </span>{" "}
          {currency?.symbol ?? "$"}
          {(product.netPrice * (currency?.rate ?? 1)).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ProductCardNewArrival;
