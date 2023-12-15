import { Basket } from "./basket.model";
import { Category } from "./category.model";
import { Review } from "./review.model";

export interface Product {
  id: number;
  name: string;
  price: number;
  colour: string;
  description: string;
  isInStock: boolean;
  imageUrl: string;
  reviews: Review[];
  category: Category;
  baskets: Basket[];
}
