import { Product } from "../../models/product.model";
import { User } from "../../models/user.model";
import SingleProduct from "./SingleProduct";
import { useNavigate } from "react-router-dom";

interface InputTypes {
  products: Product[];
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  user: User;
}

export default function DisplayProducts({
  products,
  setUser,
  user,
}: InputTypes) {
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
        <div className="header-buttons-container">
          <button onClick={() => navigate("/basket")}>Basket</button>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      </header>
      <div className="products-container">
        {products.map((product: Product, index) => {
          return <SingleProduct user={user} product={product} index={index} />;
        })}
      </div>
    </>
  );
}
