import { Basket } from "./basket.model";
import { Order } from "./order.model";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  password: string;
  basket: Basket;
  orders: Order[];
  isLoggedIn: boolean;
}
