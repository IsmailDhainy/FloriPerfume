import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";

export type ProductTableType = {
  id: number;
  name: string;
  description: string;
  sku: string;
  sale: number;
  image: string[];
  size: { property: string; price: number }[];
  price: number;
  netPrice: number;
  hotSale: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  onSale: boolean;
  inStock: number;
  isActive: boolean;
  categoryId: number;
  brandId: number;
  category: {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
  };
  brand: {
    id: number;
    name: string;
    isActive: boolean;
  };
  createdAt: string;
  updatedAt: string;
};

// Types
export interface ProductSize {
  property: string;
  price: number;
  quantity: number;
}

export interface ProductSize2 {
  property: string;
  price: number;
}

export interface Product {
  id: number;
  sale: number;
  name: string;
  image: string[];
  price: number;
  size: ProductSize;
}

export interface CartItem {
  id: number; // Unique cart item ID (product.id + size property)
  productId: number; // Original product ID
  name: string;
  image: string[];
  sale: number;
  basePrice: number; // Original product price
  selectedSize: ProductSize[]; // The specific size variant selected
}

interface CartStore {
  items: CartItem[];

  // Actions
  addItem: (
    product: Product,
    selectedSize: ProductSize,
    quantity?: number,
  ) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (
    productId: number,
    sizeProperty: string,
    action: string,
  ) => void;
  removeSizeItem: (productId: number, sizeProperty: string) => void;
  updateItem: (
    product: ProductTableType,
    sizeProperty: ProductSize2,
    action: string,
    quantity: number,
  ) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set) => ({
        items: [],

        // Add item to cart
        addItem: (product, selectedSize, quantity = 1) => {
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.productId === product.id,
            );
            if (existingItem) {
              let foundSize = false;
              existingItem.selectedSize.forEach((item) => {
                if (item.property === selectedSize.property) {
                  item.quantity += quantity;
                  item.price = selectedSize.price;
                  foundSize = true;
                }
              });
              if (!foundSize) {
                const selectedSizeWithQuantity = selectedSize;
                selectedSizeWithQuantity.quantity = quantity;
                existingItem.selectedSize.push(selectedSizeWithQuantity);
              }
              existingItem.basePrice += selectedSize.price * quantity;
              return {
                items: state.items.map((item) =>
                  item.productId === product.id ? existingItem : item,
                ),
              };
            } else {
              const selectedSizeWithQuantity = selectedSize;
              selectedSizeWithQuantity.quantity = quantity;

              // New item, add to cart
              const newItem: CartItem = {
                id: Date.now(), // Unique ID for this cart item
                productId: product.id,
                name: product.name,
                image: product.image,
                sale: product.sale,
                basePrice: product.price * quantity,
                selectedSize: [selectedSizeWithQuantity],
              };

              return {
                items: [...state.items, newItem],
              };
            }
          });
        },

        // Remove item from cart
        removeItem: (productId) => {
          set((state) => ({
            items: state.items.filter(
              (item) => !(item.productId === productId),
            ),
          }));
        },

        removeSizeItem: (productId: number, sizeProperty: string) => {
          set((state) => {
            // Go through items, remove the size, and remove the whole product if no sizes remain
            const updatedItems = state.items
              .map((item) => {
                if (item.productId !== productId) return item;

                // Remove the selected size
                const updatedSelectedSize = item.selectedSize.filter(
                  (size) => size.property !== sizeProperty,
                );

                if (updatedSelectedSize.length === 0) {
                  // Will remove this item entirely later
                  return null;
                }

                // Recalculate basePrice
                const newBasePrice = updatedSelectedSize.reduce(
                  (sum, size) => sum + size.price * size.quantity,
                  0,
                );

                return {
                  ...item,
                  selectedSize: updatedSelectedSize,
                  basePrice: newBasePrice,
                };
              })
              .filter((item): item is CartItem => item !== null); // Remove items that became null

            return { items: updatedItems };
          });
        },

        // Update item quantity
        updateQuantity: (productId, sizeProperty, action) => {
          set((state) => {
            const items = state.items.map((item) => {
              if (item.productId !== productId) return item;

              const updatedSelectedSize = item.selectedSize
                .map((size) => {
                  if (size.property !== sizeProperty) return size;

                  let newQuantity = size.quantity;
                  if (action === "increase") {
                    newQuantity += 1;
                  } else if (action === "decrease") {
                    newQuantity -= 1;
                  }

                  return { ...size, quantity: newQuantity };
                })
                .filter((size) => size.quantity > 0); // Remove sizes with quantity 0

              // Recalculate basePrice
              const newBasePrice = updatedSelectedSize.reduce(
                (sum, size) => sum + size.price * size.quantity,
                0,
              );

              return {
                ...item,
                selectedSize: updatedSelectedSize,
                basePrice: newBasePrice,
              };
            });

            return { items };
          });
        },

        updateItem: (product, selectedSize, action, quantity = 1) => {
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.productId === product.id,
            );

            if (existingItem) {
              let foundSize = false;

              const updatedSelectedSize = existingItem.selectedSize
                .map((item) => {
                  if (item.property === selectedSize.property) {
                    foundSize = true;
                    let newQuantity = item.quantity;

                    switch (action) {
                      case "increment":
                        newQuantity += quantity;
                        break;
                      case "decrement":
                        newQuantity -= quantity;
                        break;
                      case "set":
                        newQuantity = quantity;
                        break;
                    }

                    // Remove size if quantity is 0 or less
                    if (newQuantity <= 0) return null;

                    return {
                      ...item,
                      quantity: newQuantity,
                      price: selectedSize.price,
                    };
                  }
                  return item;
                })
                .filter((size): size is ProductSize => size !== null);

              // Add new size if not found and action is not decrement
              if (!foundSize && action !== "decrement") {
                const newQuantity = action === "set" ? quantity : quantity;
                updatedSelectedSize.push({
                  ...selectedSize,
                  quantity: newQuantity,
                });
              }

              // Remove entire item if no sizes left
              if (updatedSelectedSize.length === 0) {
                return {
                  items: state.items.filter(
                    (item) => item.productId !== product.id,
                  ),
                };
              }

              // Calculate new base price
              const newBasePrice = updatedSelectedSize.reduce(
                (sum, size) => sum + size.price * size.quantity,
                0,
              );

              return {
                items: state.items.map((item) =>
                  item.productId === product.id
                    ? {
                        ...existingItem,
                        selectedSize: updatedSelectedSize,
                        basePrice: newBasePrice,
                      }
                    : item,
                ),
              };
            } else {
              // New item - only add if not decrementing
              if (action === "decrement") {
                console.warn("Cannot decrement non-existent item");
                return state;
              }

              const newQuantity = action === "set" ? quantity : quantity;

              const newItem: CartItem = {
                id: Date.now(),
                productId: product.id,
                name: product.name,
                image: product.image,
                sale: product.sale,
                basePrice: selectedSize.price * newQuantity,
                selectedSize: [
                  {
                    ...selectedSize,
                    quantity: newQuantity,
                  },
                ],
              };

              return {
                items: [...state.items, newItem],
              };
            }
          });
        },

        // Clear entire cart
        clearCart: () => set({ items: [] }),
      }),
      {
        name: "cart-storage", // localStorage key
        storage: createJSONStorage(() => localStorage),
      },
    ),
    {
      name: "CartStore", // Name in Redux DevTools
    },
  ),
);

// Selectors for better performance
export const selectCartItems = (state: CartStore) => state.items;
export const selectCartItemCount = (state: CartStore) => state.items.length;
