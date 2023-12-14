import { Product } from "../../models/product.model";
import SingleProduct from "./SingleProduct";

interface InputTypes {
  products: Product[];
}

export default function DisplayProducts({ products }: InputTypes) {
  return (
    <>
      {products.map((product: Product, index) => {
        return (
          <div>
            <SingleProduct index={index} product={product} />
          </div>
        );
      })}
    </>
  );
}
