import { Basket } from "../../models/basket.model";

interface Types {
  basket: Basket | null;
}

export default function BasketView({ basket }: Types) {
  return <>{basket?.basketItems[0].name}</>;
}
