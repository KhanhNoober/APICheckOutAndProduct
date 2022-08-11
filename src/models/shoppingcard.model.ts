import { Item } from './product.model';

export interface ShoppingCard {
  customerID: string;
  customer: string;
  products: Item[];
}
