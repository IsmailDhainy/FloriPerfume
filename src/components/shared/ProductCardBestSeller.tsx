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

const ProductCardBestSeller = ({ product, index }) => {
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const isInWishlist = useWhishlistStore((state) =>
    state.isInWishlist(product.id),
  );
  const addProduct = useWhishlistStore((state) => state.addProduct);
  const removeProduct = useWhishlistStore((state) => state.removeProduct);
  const addItem = useCartStore((state) => state.addItem);

  const [selectedSizeIndex] = useState(0);
  const selectedSize = product.size?.[selectedSizeIndex];

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

  const num = Math.random();

  return (
    <div
      className="card-product"
      key={`${index}-${product.id}-best-seller-${num}`}
    >
      <div
        className="card-product-wrapper"
        key={`${index}-${product.id}-best-seller-div-${num}`}
      >
        <a
          onClick={() =>
            navigate(PATHS.PRODUCTDETAIL.replace(":id", String(product.id)))
          }
          className="product-img"
          key={`${index}-${product.id}-best-seller-a-${num}`}
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
            key={`${index}-${product.id}-best-seller-img-${num}`}
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
            key={`${index}-${product.id}-best-seller-img2-${num}`}
          />
        </a>
        <div
          className="list-product-btn"
          key={`${index}-${product.id}-best-seller-div2-${num}`}
        >
          <a
            onClick={handleWhishlist}
            className={`box-icon wishlist btn-icon-action ${isInWishlist && "whislist-active"}`}
            key={`${index}-${product.id}-best-seller-a2-${num}`}
          >
            <span
              className="icon icon-heart"
              key={`${index}-${product.id}-best-seller-span-${num}`}
            ></span>
            <span
              className="tooltip"
              key={`${index}-${product.id}-best-seller-span2-${num}`}
            >
              {isInWishlist ? "Remove" : "Add"} Wishlist
            </span>
          </a>
        </div>
        <div
          className="list-btn-main"
          key={`${index}-${product.id}-best-seller-div3-${num}`}
        >
          <a
            href="#shoppingCart"
            data-bs-toggle="modal"
            className="btn-main-product"
            onClick={handleAddToCart}
            key={`${index}-${product.id}-best-seller-a3-${num}`}
          >
            Add To cart
          </a>
        </div>
      </div>
      <div
        className="card-product-info"
        key={`${index}-${product.id}-best-seller-div4-${num}`}
      >
        <a
          onClick={() =>
            navigate(PATHS.PRODUCTDETAIL.replace(":id", String(product.id)))
          }
          className="title link"
          key={`${index}-${product.id}-best-seller-a4-${num}`}
        >
          {product.name}
        </a>
        <span
          className="price"
          key={`${index}-${product.id}-best-seller-span3-${num}`}
        >
          {product.sale && product.sale > 0 ? (
            <span
              className="old-price"
              key={`${index}-${product.id}-best-seller-span4-${num}`}
            >
              {currency?.symbol ?? "$"}
              {(product.price * (currency?.rate ?? 1)).toFixed(2)}
            </span>
          ) : null}
          {currency?.symbol ?? "$"}
          {(product.netPrice * (currency?.rate ?? 1)).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ProductCardBestSeller;
