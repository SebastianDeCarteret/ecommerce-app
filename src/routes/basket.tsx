import { useLoaderData } from "react-router-dom";
import { Basket } from "../models/basket.model";
import BasketView from "../components/basket/BasketView";
import { User } from "../models/user.model";
import {
  AppState,
  LogoutOptions,
  RedirectLoginOptions,
} from "@auth0/auth0-react";
import * as Auth0 from "@auth0/auth0-react";

interface Types {
  user: User | null;
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

export default function Basket({ user, setUser, auth0Container }: Types) {
  const { basket }: any = useLoaderData();
  return (
    <>
      <BasketView
        setUser={setUser}
        userAsState={user}
        basket={basket}
        auth0Container={auth0Container}
      />
    </>
  );
}

export async function loader(id: number) {
  const response = await fetch(`https://localhost:7218/api/Baskets/${id}`);
  const basket = (await response.json()) as Basket;
  console.log(basket);
  return { basket };
}
