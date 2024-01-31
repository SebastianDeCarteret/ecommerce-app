import { useLoaderData } from "react-router-dom";
import { Product } from "../models/product.model";
import DisplayProducts from "../components/products/DisplayProducts";
import { User } from "../models/user.model";
import {
  AppState,
  LogoutOptions,
  RedirectLoginOptions,
} from "@auth0/auth0-react";
import * as Auth0 from "@auth0/auth0-react";

interface Types {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  user: User | null;
  auth0Container: {
    user: Auth0.User | undefined;
    isAuthenticated: boolean;
    loginWithRedirect: (
      options?: RedirectLoginOptions<AppState> | undefined
    ) => Promise<void>;
    logout: (options?: LogoutOptions | undefined) => Promise<void>;
  };
}

export default function Home({ setUser, user, auth0Container }: Types) {
  const { products }: any = useLoaderData();
  return (
    <>
      <DisplayProducts
        userAsState={user}
        setUser={setUser}
        products={products}
        auth0Container={auth0Container}
      />
    </>
  );
}

export async function loader() {
  const response = await fetch("https://localhost:7218/api/Products");
  const products = (await response.json()) as Product[];
  return { products };
}
