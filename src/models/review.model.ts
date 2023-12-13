import { Product } from "./product.model";
import { User } from "./user.model";

export interface Review {
  id: number;
  rating: number;
  title: number;
  description: string;
  product: Product;
  user: User;
}
