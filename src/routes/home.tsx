import { useLoaderData } from "react-router-dom";
import { Product } from "../models/product.model";
import DisplayProducts from "../components/products/DisplayProducts";
import { User } from "../models/user.model";

interface Types {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function Home({ setUser }: Types) {
  const { products }: any = useLoaderData();
  return (
    <>
      <DisplayProducts setUser={setUser} products={products} />
    </>
  );
}

export async function loader() {
  const response = await fetch("https://localhost:7218/api/Products");
  const products = (await response.json()) as Product[];
  return { products };
}
