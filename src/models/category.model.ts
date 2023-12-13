import { Product } from "./product.model";

export interface Category {
  id: number;
  categoryType: string;
  products: Product[];
}
