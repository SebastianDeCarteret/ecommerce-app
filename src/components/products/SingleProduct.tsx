import { useState } from "react";
import { Product } from "../../models/product.model";
import { User } from "../../models/user.model";
import RedError from "../reusable/RedError";
import GreenSucess from "../reusable/GreenSucess";

interface InputTypes {
  product: Product;
  index: number;
  user: User;
}

export default function SingleProduct({ product, index, user }: InputTypes) {
  const [isFail, setIsFail] = useState<boolean>(false);
  const [isSucess, setIsSucess] = useState<boolean>(false);
  async function AddToBasket() {
    const response = fetch(
      `https://localhost:7218/api/Baskets/${user.id}/${product.id}`,
      {
        method: "PATCH",
      }
    );
    if ((await response).status === 500) {
      setIsFail(true);
      setIsSucess(false);
    } else {
      setIsFail(false);
      setIsSucess(true);
    }
  }

  return (
    <div className="single-product-container" key={index}>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>
        colour:<span className="colour-circle"></span>
      </p>
      <h1>£{product.price}</h1>
      <div className="action-buttons">
        <button onClick={AddToBasket}>Add to basket</button>
        <button>View details</button>
      </div>
      <RedError
        state={isFail}
        setState={setIsFail}
        message={"Already in basket!"}
        time={5}
      />
      <GreenSucess
        state={isSucess}
        setState={setIsSucess}
        message={"Added to basket!"}
        time={2}
      />
    </div>
  );
}
