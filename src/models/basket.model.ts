import { Product } from "./product.model";

export interface Basket {
  id: number;
  userId: number;
  basketItems: Product[];
}
