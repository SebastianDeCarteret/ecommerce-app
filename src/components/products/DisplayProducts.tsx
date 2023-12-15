import { Product } from "../../models/product.model";
import SingleProduct from "./SingleProduct";

interface InputTypes {
  products: Product[];
}

export default function DisplayProducts({ products }: InputTypes) {
  return (
    <>
      <header className="main-header">
        <img
          src="src\assets\currys.png"
          alt="Currys Logo"
          className="currys-logo"
        />
        <h1>All Products</h1>
      </header>
      <div className="products-container">
        {products.map((product: Product, index) => {
          return <SingleProduct index={index} product={product} />;
        })}
      </div>
    </>
  );
}
