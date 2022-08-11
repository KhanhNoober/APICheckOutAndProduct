export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  productAddedDate: string;
}

export interface Item {
  product: Product;
  quantity: number;
}
