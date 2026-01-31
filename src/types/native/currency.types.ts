export type Currency = {
  id: number;
  code: string;
  symbol: string;
  rate: number;
  default: boolean;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
};

export type CurrencyTableType = {
  id: number;
  code: string;
  symbol: string;
  rate: number;
  default: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type CurrencyTableResponseType = CurrencyTableType[];

export type CurrencyResponseType = CurrencyTableType;
