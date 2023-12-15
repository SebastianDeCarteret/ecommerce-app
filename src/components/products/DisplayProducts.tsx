import { Product } from "../../models/product.model";
import { User } from "../../models/user.model";
import SingleProduct from "./SingleProduct";
import { useNavigate } from "react-router-dom";

interface InputTypes {
  products: Product[];
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function DisplayProducts({ products, setUser }: InputTypes) {
  const navigate = useNavigate();
  return (
    <>
      <header className="main-header">
        <img
          src="src\assets\currys.png"
          alt="Currys Logo"
          className="currys-logo"
        />
        <h1>All Products</h1>
        <button onClick={() => navigate("/basket")}>Basket</button>
        <button onClick={() => setUser(null)}>Logout</button>
      </header>
      <div className="products-container">
        {products.map((product: Product, index) => {
          return <SingleProduct index={index} product={product} />;
        })}
      </div>
    </>
  );
}
