import { useAuth0 } from "@auth0/auth0-react";
import { Product } from "../../models/product.model";
import { User } from "../../models/user.model";
import SingleProduct from "./SingleProduct";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface InputTypes {
  products: Product[];
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userAsState: User | null;
}

export default function DisplayProducts({
  products,
  setUser,
  userAsState,
}: InputTypes) {
  const navigate = useNavigate();
  const { user, isAuthenticated, loginWithRedirect, isLoading, error, logout } =
    useAuth0();

  useEffect(() => {
    getUserData();
  }, [userAsState, user]);

  console.log(user);
  // setUser(get user by sub)
  async function getUserData() {
    // await loginWithRedirect();
    const response = await fetch(
      `https://localhost:7218/api/Users/${user?.sub}`
    );
    const dbUser = (await response.json()) as User;
    setUser(dbUser);
  }

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
          {isAuthenticated ? (
            <>
              <button className="basket" onClick={() => navigate("/basket")}>
                <img
                  onClick={() => navigate("/basket")}
                  src="..\src\assets\basket.png"
                  alt="basket button"
                />
              </button>
              <button onClick={() => navigate("/orders")}>Orders</button>
              <button
                className="logout"
                onClick={() => {
                  setUser(null);
                  logout();
                }}
              >
                <img
                  onClick={() => {
                    setUser(null);
                    logout();
                  }}
                  src="..\src\assets\logout.png"
                  alt="logout button"
                />
              </button>
            </>
          ) : (
            <>
              <button
                style={{ backgroundColor: "green" }}
                className="logout"
                onClick={() => {
                  loginWithRedirect();
                  getUserData();
                }}
              >
                <img
                  onClick={() => {
                    loginWithRedirect();
                    getUserData();
                  }}
                  src="..\src\assets\logout.png"
                  alt="logout button"
                />
              </button>
            </>
          )}
        </div>

        <p>
          {userAsState?.firstName} {userAsState?.lastName}
        </p>
      </header>
      <div className="products-container">
        {products.map((product: Product, index) => {
          return (
            <SingleProduct user={userAsState} product={product} index={index} />
          );
        })}
      </div>
    </>
  );
}
