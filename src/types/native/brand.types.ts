export type Brand = {
  id: number;
  name: string;
  isActive: boolean;
};

export type BrandTableType = {
  id: number;
  name: string;
  isActive: boolean;
  productItems: number;
  createdAt: string;
  updatedAt: string;
};

export type BrandTableResponseType = BrandTableType[];

export type BrandTableResponseTypeDashboard = {
  data: BrandTableType[];
  count: number;
};

export type BrandResponseType = BrandTableType;
