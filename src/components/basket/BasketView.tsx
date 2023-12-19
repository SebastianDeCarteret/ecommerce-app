import { Basket } from "../../models/basket.model";
import { User } from "../../models/user.model";
import BasketItem from "./BasketItem";
import { useNavigate } from "react-router-dom";

interface Types {
  basket: Basket | null;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function BasketView({ basket, user, setUser }: Types) {
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
        <div className="header-buttons-container">
          <button onClick={() => navigate("/products")}>Home</button>
          <button className="logout" onClick={() => setUser(null)}>
            <img
              onClick={() => setUser(null)}
              src="..\src\assets\logout.png"
              alt="logout button"
            />
          </button>
        </div>
        <p>
          {user.firstName} {user.lastName}
        </p>
      </header>
      <div className="basket-items-container">
        {basket?.basketItems.length != 0 ? (
          <>
            {basket?.basketItems.map((item, index) => {
              return <BasketItem user={user} item={item} index={index} />;
            })}
            <button onClick={() => navigate("/products")}>Back</button>
          </>
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
