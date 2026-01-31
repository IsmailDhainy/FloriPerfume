export type Product = {
  id: number;
  name: string;
  description: string;
  sku: string;
  sale: number;
  image: string[] | string;
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
  createdAt: string;
  updatedAt: string;
};

export type Whishlist = {
  id: number;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
  productId?: number;
  product: Product;
};

export type WhihlistResponseType = Whishlist[];
