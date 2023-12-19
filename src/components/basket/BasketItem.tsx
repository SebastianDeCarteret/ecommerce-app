import { useState } from "react";
import { Product } from "../../models/product.model";
import { useNavigate } from "react-router-dom";
import GreenSucess from "../reusable/GreenSucess";
import { User } from "../../models/user.model";

interface Types {
  item: Product;
  index: number;
  user: User;
}

export default function BasketItem({ item, index, user }: Types) {
  const [isSucess, setIsSucess] = useState<boolean>(false);
  const navigate = useNavigate();
  async function RemoveItem() {
    setTimeout(async () => {
      const response = fetch(
        `https://localhost:7218/api/Baskets/${user.id}/${item.id}`,
        {
          method: "DELETE",
        }
      );
      if ((await response).status === 204) {
        setIsSucess(true);
      } else {
        setIsSucess(false);
      }
      navigate("");
    }, 1 * 1000);
  }

  return (
    <>
      <div key={index} className={isSucess ? "hide" : "basket-item"}>
        <div className="basket-item-sub-container">
          <h2>{item.name}</h2>
          <p>
            colour:<span className="colour-circle"></span>
          </p>
          <p>{item.isInStock ? "in stock" : "out of stock"}</p>
          <p>£{item.price}</p>
          <img src={item.imageUrl} alt={item.name} />
        </div>
        <button
          onClick={() => {
            RemoveItem();
            setIsSucess(true);
          }}
          className="delete-button"
        >
          Remove from basket
        </button>
      </div>
      <span className="message-container">
        <GreenSucess
          shouldNavigateToBasket={false}
          state={isSucess}
          setState={setIsSucess}
          message={"Removed successfully!"}
          time={5}
        />
      </span>
    </>
  );
}
