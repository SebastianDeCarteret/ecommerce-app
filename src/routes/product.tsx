import { useParams } from "react-router-dom";
import { Product } from "../models/product.model";
import { useEffect, useState } from "react";
import ProductView from "../components/product/ProductView";
import { User } from "../models/user.model";

interface Types {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  user: User | null;
}

export default function Product({ setUser, user }: Types) {
  const [product, setProduct] = useState<Product>();
  let { id } = useParams();

  useEffect(() => {
    GetProduct();
  }, []);

  async function GetProduct() {
    const response = await fetch(`https://localhost:7218/api/Products/${id}`);
    const product = (await response.json()) as Product;
    setProduct(product);
  }

  return (
    <>
      <ProductView user={user} setUser={setUser} product={product} />
    </>
  );
}
