import { useState } from "react";
import { Product } from "../../models/product.model";
import { User } from "../../models/user.model";
import RedError from "../reusable/RedError";
import GreenSucess from "../reusable/GreenSucess";
import { useNavigate } from "react-router-dom";

interface InputTypes {
  product: Product;
  index: number;
  user: User | null;
}

export default function SingleProduct({ product, index, user }: InputTypes) {
  const [isFail, setIsFail] = useState<boolean>(false);
  const [isSucess, setIsSucess] = useState<boolean>(false);
  const navigate = useNavigate();

  async function AddToBasket() {
    const response = fetch(
      `https://localhost:7218/api/Baskets/${user!.id}/${product.id}`,
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
        colour:
        <span
          style={{ backgroundColor: product.colour }}
          className="colour-circle"
        ></span>
        <p className="colour-tag">({product.colour.toLowerCase()})</p>
      </p>
      <h1>£{product.price}</h1>
      <div className="action-buttons">
        {user?.auth0Id ? (
          <button onClick={AddToBasket}>Add to basket</button>
        ) : (
          <></>
        )}
        <button onClick={() => navigate(`/product/${product.id}`)}>
          View details
        </button>
      </div>
      <RedError
        state={isFail}
        setState={setIsFail}
        message={"Already in basket!"}
        time={1000}
      />
      <GreenSucess
        shouldNavigateToBasket={true}
        state={isSucess}
        setState={setIsSucess}
        message={"Added to basket!"}
        time={5}
      />
    </div>
  );
}
