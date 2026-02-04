import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";

// Types
export interface ProductSize {
  property: string;
  price: number;
}

export interface Product {
  id: number; // Unique cart item ID (product.id + size property)
  productId?: number; // Original product ID
  name: string;
  image: string[];
  sale: number;
  price: number;
  netPrice: number;
  onSale?: boolean;
  size: ProductSize; // The specific size variant selected
}

interface WhislistStore {
  items: Product[];

  // Actions
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  clearWhishlist: () => void;
  setWhishlist: (items: Product[]) => void;
  isInWishlist: (productId: number) => boolean; // Add this
}

export const useWhishlistStore = create<WhislistStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Add 'get' here
        items: [],

        // Add item to cart
        addProduct: (product) => {
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.productId === product.id,
            );
            if (!existingItem) {
              // New item, add to cart
              const newItem: Product = {
                id: Date.now(), // Unique ID for this cart item
                productId: product.id,
                name: product.name,
                image: product.image,
                sale: product.sale,
                price: product.price,
                netPrice: product.netPrice,
                onSale: product.onSale,
                size: product.size[0],
              };

              return {
                items: [...state.items, newItem],
              };
            }
            return { items: state.items };
          });
        },

        // Remove item from cart
        removeProduct: (productId) => {
          set((state) => ({
            items: state.items.filter(
              (item) => !(item.productId === productId),
            ),
          }));
        },

        clearWhishlist: () => {
          set({ items: [] });
        },

        setWhishlist: (products) => {
          set({ items: products });
        },

        // Check if product exists in wishlist
        isInWishlist: (productId) => {
          return get().items.some((item) => item.productId === productId);
        },
      }),
      {
        name: "whislist-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
    {
      name: "WhishlistStore",
    },
  ),
);

// Selectors for better performance
export const selectCartItems = (state: WhislistStore) => state.items;
export const selectCartItemCount = (state: WhislistStore) => state.items.length;
