import { Product } from "../../models/product.model";
import { useNavigate } from "react-router-dom";

interface Types {
  item: Product;
  index: number;
  userId: number;
}

export default function BasketItem({ item, index, userId }: Types) {
  const navigate = useNavigate();
  async function RemoveItem() {
    fetch(`https://localhost:7218/api/Baskets/${userId}/${item.id}`, {
      method: "DELETE",
    });

    navigate("/basket");
    navigate("/");
    navigate("/basket");
    navigate("/");
    navigate("/basket");
  }

  return (
    <div key={index} className="basket-item">
      <h2>{item.name}</h2>
      <p>
        colour:<span className="colour-circle"></span>
      </p>
      <p>{item.isInStock ? "in stock" : "out of stock"}</p>
      <p>£{item.price}</p>
      <img src={item.imageUrl} alt={item.name} />
      <button onClick={RemoveItem} className="delete-button">
        🗑️
      </button>
    </div>
  );
}
