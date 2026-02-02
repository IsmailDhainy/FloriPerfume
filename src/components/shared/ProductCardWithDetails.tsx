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

const ProductCardWithDetails = ({ product, index }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { currency } = useCurrency();
  const queryClient = useQueryClient();

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(product.price);
  const selectedSize = product.size?.[selectedSizeIndex];

  const isInWishlist = useWhishlistStore((state) =>
    state.isInWishlist(product.id),
  );
  const addProduct = useWhishlistStore((state) => state.addProduct);
  const removeProduct = useWhishlistStore((state) => state.removeProduct);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedSize) {
      return;
    }

    addItem(product, selectedSize, 1);
    toast.success(`Product added successfully to the cart`);
  };

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
      className="card-product style-list"
      data-category={product.category.name}
      data-brand={product.brand?.name || ""}
      key={`product-${index}-${product.id}`}
    >
      <div
        className="card-product-wrapper"
        key={`product-div-${index}-${product.id}-${num}`}
      >
        <a
          onClick={() =>
            navigate(PATHS.PRODUCTDETAIL.replace(":id", String(product.id)))
          }
          className="product-img"
          key={`product-a-${index}-${product.id}`}
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
          />
        </a>
      </div>
      <div
        className="card-product-info"
        key={`product-div2-${index}-${product.id}`}
      >
        <a
          onClick={() =>
            navigate(PATHS.PRODUCTDETAIL.replace(":id", String(product.id)))
          }
          className="title link"
          key={`product-a11-${index}-${product.id}`}
        >
          {product.name}
        </a>
        <div className="price" key={`product-div22-${index}-${product.id}`}>
          {selectedPrice.sale && selectedPrice.sale > 0 ? (
            <span className="old-price">
              {" "}
              {currency?.symbol ?? "$"}
              {(selectedPrice * (currency?.rate ?? 1)).toFixed(2)}
            </span>
          ) : null}
          <span className="current-price">
            {currency?.symbol ?? "$"}
            {(
              (selectedPrice - (selectedPrice * product.sale) / 100) *
              (currency?.rate ?? 1)
            ).toFixed(2)}
          </span>
        </div>
        <div
          className="price"
          key={`product-div22-${index}-${product.id}-${num}`}
        >
          <span className="text-secondary-2">
            {product.category.name}
            {" - "}
          </span>
          <span className="text-secondary-2">{product.brand?.name || ""}</span>
        </div>
        <p className="description text-secondary text-line-clamp-2">
          {product.description}
        </p>

        <div className="variant-wrap-list">
          <div className="size-box list-product-btn">
            {product.size.map((sizeItem, sizeIndex) => (
              <span
                className={`text-main flex h-[70px] w-[70px] items-center justify-center rounded-full border hover:cursor-pointer ${sizeIndex === selectedSizeIndex && "border-2 border-black"} border-[#e9e9e9] bg-white`}
                key={`size-${sizeIndex}-${sizeItem.property}`}
                onClick={() => (
                  setSelectedSizeIndex(sizeIndex),
                  setSelectedPrice(sizeItem.price)
                )}
              >
                {sizeItem.property}
              </span>
            ))}
          </div>
          <div className="list-product-btn">
            <a
              href="#shoppingCart"
              data-bs-toggle="modal"
              className="btn-main-product"
              onClick={handleAddToCart}
            >
              Add To cart
            </a>
            <a
              onClick={handleWhishlist}
              className={`box-icon wishlist btn-icon-action ${isInWishlist && "!border-black !bg-black !text-white"}`}
            >
              <span className="icon icon-heart"></span>
              <span className="tooltip">
                {" "}
                {isInWishlist ? "Remove" : "Add"} Wishlist
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardWithDetails;
