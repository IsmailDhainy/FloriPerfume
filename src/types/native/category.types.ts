export type Category = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  image: string;
  showOnHomePage: boolean;
};

export type CategoryTableType = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  image: string;
  showOnHomePage: boolean;
  productItems: number;
  createdAt: string;
  updatedAt: string;
};

export type CategoryTableResponseType = CategoryTableType[];

export type CategoryTableResponseTypeDashboard = {
  data: CategoryTableType[];
  count: number;
};

export type CategoryResponseType = CategoryTableType;
