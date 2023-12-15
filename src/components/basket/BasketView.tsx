import { Basket } from "../../models/basket.model";
import { User } from "../../models/user.model";
import BasketItem from "./BasketItem";
import { useNavigate } from "react-router-dom";

interface Types {
  basket: Basket | null;
  userId: number;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function BasketView({ basket, userId, setUser }: Types) {
  const navigate = useNavigate();
  return (
    <div className="basket-view">
      <header className="main-header">
        <img
          src="src\assets\currys.png"
          alt="Currys Logo"
          className="currys-logo"
        />
        <h1>Basket</h1>
        <button onClick={() => navigate("/products")}>Home</button>
        <button onClick={() => setUser(null)}>Logout</button>
      </header>
      <div className="basket-items-container">
        {basket?.basketItems.length != 0 ? (
          basket?.basketItems.map((item, index) => {
            return <BasketItem userId={userId} item={item} index={index} />;
          })
        ) : (
          <div className="empty-basket-container">
            <p className="empty-basket">No items yet</p>
            <button onClick={() => navigate("/products")}>
              Start shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
