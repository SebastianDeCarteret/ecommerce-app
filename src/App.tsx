import "./App.css";
import "./components/products/Products.css";
import "./components/login/Login.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login, { loader as loginLoader } from "./routes/login";
import Home, { loader as productsLoader } from "./routes/home";
import ErrorPage from "./error-page";
import { useState } from "react";

const routerFn = (
  loggedIn: boolean,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) =>
  createBrowserRouter([
    {
      path: "/",
      element: loggedIn ? (
        <Navigate to="/products" replace={true} />
      ) : (
        <Navigate to="/login" replace={true} />
      ),
      errorElement: <ErrorPage />,
      loader: loggedIn ? productsLoader : loginLoader,
    },
    {
      path: "/login",
      element: loggedIn ? (
        <Navigate to="/" replace={true} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ),
      errorElement: <ErrorPage />,
      loader: loggedIn ? productsLoader : loginLoader,
    },
    {
      path: "/products",
      element: loggedIn ? <Home /> : <Navigate to="/" />,
      errorElement: <ErrorPage />,
      loader: productsLoader,
    },
  ]);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const routes = routerFn(isLoggedIn, setIsLoggedIn);
  return <RouterProvider router={routes} />;
}

export default App;
