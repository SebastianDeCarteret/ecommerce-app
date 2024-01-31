import { useEffect } from "react";
import { Basket } from "../../models/basket.model";
import { User } from "../../models/user.model";
import BasketItem from "./BasketItem";
import { useNavigate } from "react-router-dom";
import {
  AppState,
  LogoutOptions,
  RedirectLoginOptions,
} from "@auth0/auth0-react";
import * as Auth0 from "@auth0/auth0-react";

interface Types {
  basket: Basket | null;
  userAsState: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  auth0Container: {
    user: Auth0.User | undefined;
    isAuthenticated: boolean;
    loginWithRedirect: (
      options?: RedirectLoginOptions<AppState> | undefined
    ) => Promise<void>;
    logout: (options?: LogoutOptions | undefined) => Promise<void>;
  };
}

export default function BasketView({
  basket,
  userAsState,
  setUser,
  auth0Container,
}: Types) {
  const navigate = useNavigate();

  const { user, isAuthenticated, loginWithRedirect, logout } = auth0Container;

  useEffect(() => {
    getUserData();
  }, [isAuthenticated]);

  async function getUserData() {
    if (!isAuthenticated) return;
    const response = await fetch(
      `https://localhost:7218/api/Users/${user?.sub}`
    );
    const dbUser = (await response.json()) as User;
    setUser(dbUser);
  }

  let ids: number[] = [];

  async function Checkout() {
    const response = await fetch(
      `https://localhost:7218/api/Orders/add/order/user/${userAsState?.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(ids),
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json-patch+json",
        },
      }
    );
    RemoveItem();
    navigate("/orders");
  }

  async function RemoveItem() {
    ids.forEach(async (id) => {
      await fetch(
        `https://localhost:7218/api/Baskets/${userAsState?.id}/${id}`,
        {
          method: "DELETE",
        }
      );
    });
  }

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
          <button onClick={() => navigate("/orders")}>Orders</button>
          <button className="logout" onClick={() => setUser(null)}>
            <img
              onClick={() => setUser(null)}
              src="..\src\assets\logout.png"
              alt="logout button"
            />
          </button>
        </div>
        <p>
          {user?.firstName} {user?.lastName}
        </p>
      </header>
      <div className="basket-items-container">
        {basket?.basketItems.length != 0 ? (
          <>
            {basket?.basketItems.map((item, index) => {
              ids.push(item.id);
              return (
                <BasketItem
                  userAsState={userAsState}
                  item={item}
                  index={index}
                />
              );
            })}
            <button onClick={Checkout}>Checkout</button>
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
