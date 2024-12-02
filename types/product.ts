export enum ProductCategory {
  PHYTOSANITARY = 'PHYTOSANITARY',
  PLANTS = 'PLANTS'
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  image: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}