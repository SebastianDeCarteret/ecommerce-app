import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { Product } from "../models/product.model";
import DisplayProducts from "../components/products/DisplayProducts";

export default function Home() {
  const { products }: any = useLoaderData();
  return (
    <>
      <DisplayProducts products={products} />
    </>
  );
}

export async function loader() {
  const response = await fetch("https://localhost:7218/api/Products");
  const products = (await response.json()) as Product[];
  return { products };
}
