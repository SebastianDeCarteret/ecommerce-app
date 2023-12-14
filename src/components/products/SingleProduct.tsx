import { Product } from "../../models/product.model";

interface InputTypes {
  product: Product;
  index: number;
}

export default function SingleProduct({ product, index }: InputTypes) {
  return (
    <div
      className="single-product"
      style={{
        backgroundColor: "red",
        margin: "10px",
        padding: "10px",
        borderRadius: "10px",
      }}
      key={index}
    >
      <h1>Name: {product.name}</h1>
      <h1>Category: {product.category.categoryType}</h1>
      <h1>Colour: {product.colour}</h1>
    </div>
  );
}
