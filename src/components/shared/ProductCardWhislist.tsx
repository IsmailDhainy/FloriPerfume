import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { remove } from "$/api/whishlist/whishlist.api";
import useAuth from "$/hooks/contexts/useAuth";
import useCurrency from "$/hooks/contexts/useCurrency";
import PATHS from "$/routes/constants";
import { useCartStore } from "$/store/CartStore";
import { useWhishlistStore } from "$/store/WhislistStore";

const ProductCardWhislist = ({ product, index }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currency } = useCurrency();
  const queryClient = useQueryClient();

  const removeProduct = useWhishlistStore((state) => state.removeProduct);
  const addItem = useCartStore((state) => state.addItem);

  // Use mutation for removing from wishlist
  const { mutate: removeFromWishlist } = useMutation({
    mutationFn: () => remove(product.id, user!.id),
    onSuccess: () => {
      // Remove from local store immediately for instant UI update
      removeProduct(product.id);

      // Invalidate and refetch wishlist from backend
      queryClient.invalidateQueries({
        queryKey: ["get-whislist-by-userId", user?.id],
      });

      toast.success(`Wishlist successfully removed`);
    },
    onError: () => {
      toast.error("Failed to remove from wishlist");
    },
  });

  const handleWhishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (user) {
      removeFromWishlist();
    } else {
      // If user is not logged in, just remove from local store
      removeProduct(product.productId);
      toast.success(`Wishlist successfully removed`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.size, 1);
  };

  return (
    <div
      className="card-product wow fadeInUp"
      data-wow-delay="0.1s"
      key={`${index}-${product.id}-whislist`}
    >
      <div
        className="card-product-wrapper"
        key={`${index}-${product.id}-whislist-div`}
      >
        <a
          onClick={() =>
            navigate(
              PATHS.PRODUCTDETAIL.replace(":id", String(product.productId)),
            )
          }
          className="product-img"
          key={`${index}-${product.id}-whislist-a`}
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
            key={`${index}-${product.id}-whislist-img-55`}
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
            key={`${index}-${product.id}-whislist-img-66`}
          />
        </a>
        {product.sale && 0 < product.sale && (
          <div
            className="on-sale-wrap"
            key={`${index}-${product.id}-whislist-div2`}
          >
            <span
              className="on-sale-item"
              key={`${index}-${product.id}-whislist-span`}
            >
              -{product.sale}%
            </span>
          </div>
        )}
        {product.sale && (
          <div
            className="marquee-product bg-main"
            key={`${index}-${product.id}-whislist-div3`}
          >
            <div
              className="marquee-wrapper"
              key={`${index}-${product.id}-whislist-div4`}
            >
              <div
                className="initial-child-container"
                key={`${index}-${product.id}-whislist-div5`}
              >
                {Array.from({ length: 5 }).map((_, index2) => (
                  <>
                    <div
                      className="marquee-child-item"
                      key={`${index2}-${index}-marquee-child-item`}
                    >
                      <p
                        className="font-2 text-btn-uppercase fw-6 text-white"
                        key={`${index2}-${index}-marquee-child-item-p`}
                      >
                        Hot Sale {product.sale}% OFF
                      </p>
                    </div>
                    <div
                      className="marquee-child-item"
                      key={`${index2}-${index}-marquee-child-item-div`}
                    >
                      <span
                        className="icon icon-lightning text-critical"
                        key={`${index2}-${index}-marquee-child-item-span`}
                      ></span>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div
              className="marquee-wrapper"
              key={`${index}-${product.id}-whislist-div6`}
            >
              <div
                className="initial-child-container"
                key={`${index}-${product.id}-whislist-div7`}
              >
                {Array.from({ length: 5 }).map((_, index2) => (
                  <>
                    <div
                      className="marquee-child-item"
                      key={`${index2}-${index}-marquee-child-item-2`}
                    >
                      <p
                        className="font-2 text-btn-uppercase fw-6 text-white"
                        key={`${index2}-${index}-marquee-child-item-2-p`}
                      >
                        Hot Sale {product.sale}% OFF
                      </p>
                    </div>
                    <div
                      className="marquee-child-item"
                      key={`${index2}-${index}-marquee-child-item-2-div`}
                    >
                      <span
                        className="icon icon-lightning text-critical"
                        key={`${index2}-${index}-marquee-child-item-2-span`}
                      ></span>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
        <div
          className="list-product-btn"
          key={`${index}-${product.id}-whislist-div899`}
        >
          <a
            onClick={handleWhishlist}
            className="box-icon box-icon-active wishlist btn-icon-action"
            key={`${index}-${product.id}-whislist-a2`}
          >
            <span
              className="icon icon-heart"
              key={`${index}-${product.id}-whislist-span2`}
            ></span>
            <span
              className="tooltip"
              key={`${index}-${product.id}-whislist-span3`}
            >
              Remove from Wishlist
            </span>
          </a>
        </div>
        <div
          className="list-btn-main"
          key={`${index}-${product.id}-whislist-div8555`}
        >
          <a
            data-bs-toggle="modal"
            className="btn-main-product"
            onClick={handleAddToCart}
            key={`${index}-${product.id}-whislist-a3`}
          >
            Add To cart
          </a>
        </div>
      </div>
      <div
        className="card-product-info"
        key={`${index}-${product.id}-whislist-div10`}
      >
        <a
          onClick={() =>
            navigate(PATHS.PRODUCTDETAIL.replace(":id", String(product.id)))
          }
          className="title link"
          key={`${index}-${product.id}-whislist-a5`}
        >
          {product.name}
        </a>
        <div className="price" key={`${index}-${product.id}-whislist-div11`}>
          {product.sale > 0 && (
            <span
              className="old-price"
              key={`${index}-${product.id}-whislist-span5`}
            >
              {currency?.symbol ?? "$"}
              {(product.price * (currency?.rate ?? 1)).toFixed(2)}
            </span>
          )}{" "}
          <span
            className="current-price"
            key={`${index}-${product.id}-whislist-span6`}
          >
            {currency?.symbol ?? "$"}
            {(product.price * (currency?.rate ?? 1)).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardWhislist;
