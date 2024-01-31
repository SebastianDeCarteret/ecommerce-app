import { useLoaderData } from "react-router-dom";
import { Product } from "../models/product.model";
import DisplayProducts from "../components/products/DisplayProducts";
import { User } from "../models/user.model";
import { useAuth0 } from "@auth0/auth0-react";

interface Types {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  user: User | null;
}

export default function Home({ setUser, user }: Types) {
  const { products }: any = useLoaderData();
  return (
    <>
      <DisplayProducts
        userAsState={user}
        setUser={setUser}
        products={products}
      />
    </>
  );
}

export async function loader() {
  const response = await fetch("https://localhost:7218/api/Products");
  const products = (await response.json()) as Product[];
  return { products };
}
