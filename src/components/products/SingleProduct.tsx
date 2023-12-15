import { Product } from "../../models/product.model";

interface InputTypes {
  product: Product;
  index: number;
}

export default function SingleProduct({ product, index }: InputTypes) {
  return (
    <div className="single-product-container" key={index}>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>
        colour:<span className="colour-circle"></span>
      </p>

      <h1>£{product.price}</h1>
    </div>
  );
}
