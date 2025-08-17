// types/product.ts

export interface Specifications {
  weight: string;
  color: string;
  dimensions: string;
}

export interface Supplier {
  logo: string;
  name: string;
  city: string;
}

export interface ProductData {
  supplier: Supplier;
  specifications: Specifications;
  productDemand: number;
  productViews: number;
  orders: number;
  _id: string;
  name: string;
  location: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  isFeatured: boolean;
  isNew: boolean;
  status: string;
  currency: string;
  coverImage: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  stock: number;
}
