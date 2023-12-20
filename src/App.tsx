import "./App.css";
import "./components/products/Products.css";
import "./components/login/Login.css";
import "./components/basket/basket.css";
import "./components/reusable/Reusable.css";
import "./components/product/Product.css";
import "./components/orders/Orders.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./routes/login";
import Home, { loader as productsLoader } from "./routes/home";
import ErrorPage from "./error-page";
import { useState } from "react";
import { User } from "./models/user.model";
import Basket, { loader as baksetLoader } from "./routes/basket";
import Product from "./routes/product";
import Orders, { loader as ordersLoader } from "./routes/orders";

const routerFn = (
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
) =>
  createBrowserRouter([
    {
      path: "/",
      element: user ? (
        <Navigate to="/products" replace={true} />
      ) : (
        <Navigate to="/login" replace={true} />
      ),
      errorElement: <ErrorPage />,
      loader: user ? productsLoader : undefined,
    },
    {
      path: "/login",
      element: user ? (
        <Navigate to="/" replace={true} />
      ) : (
        <Login setUser={setUser} />
      ),
      errorElement: <ErrorPage />,
      loader: user ? productsLoader : undefined,
    },
    {
      path: "/products",
      element: user ? (
        <Home user={user} setUser={setUser} />
      ) : (
        <Navigate to="/" />
      ),
      errorElement: <ErrorPage />,
      loader: productsLoader,
    },
    {
      path: "/basket",
      element: user ? (
        <Basket setUser={setUser} user={user} />
      ) : (
        <Navigate to="/" />
      ),
      errorElement: <ErrorPage />,
      loader: user ? () => baksetLoader(user.id) : undefined,
    },
    {
      path: "/product/:id",
      element: user ? (
        <Product user={user} setUser={setUser} />
      ) : (
        <Navigate to="/" />
      ),
      errorElement: <ErrorPage />,
      loader: undefined,
    },
    {
      path: "/orders",
      element: user ? (
        <Orders user={user} setUser={setUser} />
      ) : (
        <Navigate to="/" />
      ),
      errorElement: <ErrorPage />,
      loader: user ? () => ordersLoader(user?.id as number) : undefined,
    },
  ]);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const routes = routerFn(user, setUser);
  return <RouterProvider router={routes} />;
}

export default App;
