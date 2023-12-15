import { useLoaderData } from "react-router-dom";
import { Basket } from "../models/basket.model";
import BasketView from "../components/basket/BasketView";

export default function Basket() {
  const { basket }: any = useLoaderData();
  return (
    <>
      <BasketView basket={basket} />
    </>
  );
}

export async function loader(id: number) {
  const response = await fetch(`https://localhost:7218/api/Baskets/${id}`);
  const basket = (await response.json()) as Basket;
  console.log(basket);
  return { basket };
}
