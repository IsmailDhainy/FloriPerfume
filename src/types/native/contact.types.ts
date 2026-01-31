export type Contact = {
  id: number;
  name: string;
  email?: string;
  phone: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ContactTableType = {
  id: number;
  name: string;
  email?: string;
  phone: string;
  message: string;
  createdAt?: string;
};

export type ContactTableResponseType = ContactTableType[];

export type ContactTableResponseTypeDashboard = {
  data: ContactTableType[];
  count: number;
};

export type ContactResponseType = ContactTableType;
