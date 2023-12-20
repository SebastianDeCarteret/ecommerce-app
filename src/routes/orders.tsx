import { useLoaderData } from "react-router-dom";
import { Basket } from "../models/basket.model";
import { User } from "../models/user.model";
import OrdersView from "../components/orders/OrdersView";

interface Types {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function Orders({ user, setUser }: Types) {
  const { orders }: any = useLoaderData();
  return (
    <>
      <OrdersView setUser={setUser} user={user} orders={orders} />
    </>
  );
}

export async function loader(id: number) {
  const response = await fetch(`https://localhost:7218/user/${id}/orders`);
  const orders = (await response.json()) as Basket;
  return { orders };
}
