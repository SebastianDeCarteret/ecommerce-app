import "./App.css";
import "./components/products/Products.css";
import "./components/login/Login.css";
import "./components/basket/basket.css";
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
      element: user ? <Home setUser={setUser} /> : <Navigate to="/" />,
      errorElement: <ErrorPage />,
      loader: productsLoader,
    },
    {
      path: "/basket",
      element: user ? (
        <Basket setUser={setUser} userId={user.id} />
      ) : (
        <Navigate to="/" />
      ),
      errorElement: <ErrorPage />,
      loader: user ? () => baksetLoader(user.id) : undefined,
    },
  ]);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const routes = routerFn(user, setUser);
  return <RouterProvider router={routes} />;
}

export default App;
