import { useNavigate } from "react-router-dom";
import { Product } from "../../models/product.model";
import { User } from "../../models/user.model";
import { useState } from "react";
import RedError from "../reusable/RedError";
import GreenSucess from "../reusable/GreenSucess";

interface Types {
  product: Product | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  user: User | null;
}

export default function ProductView({ product, setUser, user }: Types) {
  const [isFail, setIsFail] = useState<boolean>(false);
  const [isSucess, setIsSucess] = useState<boolean>(false);
  const navigate = useNavigate();

  async function AddToBasket() {
    const response = fetch(
      `https://localhost:7218/api/Baskets/${user.id}/${product?.id}`,
      {
        method: "PATCH",
      }
    );
    if ((await response).status === 500) {
      setIsFail(true);
      setIsSucess(false);
    } else {
      setIsFail(false);
      setIsSucess(true);
    }
  }
  return (
    <>
      <header className="main-header">
        <img
          src="..\src\assets\currys.png"
          alt="Currys Logo"
          className="currys-logo"
        />
        <h1>{product ? `View: ${product.name}` : "loading..."}</h1>
        <div className="header-buttons-container">
          <button onClick={() => navigate("/products")}>Home</button>
          <button className="basket" onClick={() => navigate("/basket")}>
            <img
              onClick={() => navigate("/basket")}
              src="..\src\assets\basket.png"
              alt="basket button"
            />
          </button>
          <button className="logout" onClick={() => setUser(null)}>
            <img
              onClick={() => setUser(null)}
              src="..\src\assets\logout.png"
              alt="logout button"
            />
          </button>
        </div>
      </header>
      {product ? (
        <>
          <p className="navigation-path">{`Home > ${product.name}`}</p>
          <div className="item-flex-container">
            <div className="single-product-container single-page">
              <h1>{product.name}</h1>
              <img src={product.imageUrl} alt={product.name} />
              <p>
                colour:
                <span
                  style={{ backgroundColor: product.colour }}
                  className="colour-circle"
                ></span>
                <p className="colour-tag">({product.colour.toLowerCase()})</p>
              </p>
              <h1>£{product.price}</h1>
              <div className="description-section">
                <p className="description-title">
                  <strong>Details:</strong>
                </p>
                <p className="description-content">{product.description}</p>
              </div>
              <div className="action-buttons">
                <button onClick={AddToBasket}>Add to basket</button>
              </div>
              <RedError
                state={isFail}
                setState={setIsFail}
                message={"Already in basket!"}
                time={5}
              />
              <GreenSucess
                shouldNavigateToBasket={true}
                state={isSucess}
                setState={setIsSucess}
                message={"Added to basket!"}
                time={5}
              />
            </div>
            <button onClick={() => navigate("/products")}>Back</button>
          </div>
        </>
      ) : (
        "loading..."
      )}
    </>
  );
}
