import { useLoaderData } from "react-router-dom";
import { Basket } from "../models/basket.model";
import BasketView from "../components/basket/BasketView";
import { User } from "../models/user.model";

interface Types {
  userId: number;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function Basket({ userId, setUser }: Types) {
  const { basket }: any = useLoaderData();
  return (
    <>
      <BasketView setUser={setUser} userId={userId} basket={basket} />
    </>
  );
}

export async function loader(id: number) {
  const response = await fetch(`https://localhost:7218/api/Baskets/${id}`);
  const basket = (await response.json()) as Basket;
  console.log(basket);
  return { basket };
}
