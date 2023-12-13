import { Product } from "./product.model";
import { User } from "./user.model";

export interface Order {
  id: number;
  user: User | null;
  products: Product[];
  orderDate: string;
}
