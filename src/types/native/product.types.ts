export type Category = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
};

export enum ProductTypeEnum {
  NEW_ARRIVAL = "newArrival",
  BEST_SELLER = "bestSeller",
  ON_SALE = "onSale",
}

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

export type ProductTableResponseType = ProductTableType[];

export type ProductTableResponseTypeDashboard = {
  data: ProductTableType[];
  count: number;
};

export type ProductAllTypesResponse = {
  onSale: ProductTableType[];
  newArrival: ProductTableType[];
  bestSeller: ProductTableType[];
};

export type ProductDynamicTypesEach = {
  categoryId: string;
  categoryName: string;
  products: ProductTableType[];
};

export type ProductDynamicTypesResponse = ProductDynamicTypesEach[];
export type ProductResponseType = ProductTableType;
