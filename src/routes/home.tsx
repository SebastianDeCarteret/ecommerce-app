import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { Product } from "../models/product.model";
import DisplayProducts from "../components/products/DisplayProducts";

export default function Home() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `users`;
    navigate(path);
  };

  const { products }: any = useLoaderData();
  return (
    <>
      <h1>Products</h1>
      <button onClick={() => routeChange()}>Users</button>

      <DisplayProducts products={products} />
    </>
  );
}

export async function loader() {
  const response = await fetch("https://localhost:7218/api/Products");
  const products = (await response.json()) as Product[];
  return { products };
}
