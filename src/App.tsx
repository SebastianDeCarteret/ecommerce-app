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
import { useEffect, useState } from "react";
import { User } from "./models/user.model";
import Basket from "./routes/basket";
import Product from "./routes/product";
import Orders, { loader as ordersLoader } from "./routes/orders";
import {
  AppState,
  Auth0Provider,
  LogoutOptions,
  RedirectLoginOptions,
  useAuth0,
} from "@auth0/auth0-react";
import * as Auth0 from "@auth0/auth0-react";

interface Types {
  userAsState: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  auth0Container: {
    user: Auth0.User | undefined;
    isAuthenticated: boolean;
    loginWithRedirect: (
      options?: RedirectLoginOptions<AppState> | undefined
    ) => Promise<void>;
    logout: (options?: LogoutOptions | undefined) => Promise<void>;
    isLoading: boolean;
  };
}

const routerFn = ({ userAsState, setUser, auth0Container }: Types) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/products" replace={true} />,
      errorElement: <ErrorPage />,
      loader: userAsState ? productsLoader : undefined,
    },
    // {
    //   path: "/login",
    //   element: <Login setUser={setUser} />,
    //   errorElement: <ErrorPage />,
    //   loader: user ? productsLoader : undefined,
    // },
    {
      path: "/products",
      element: (
        <Home
          user={userAsState}
          setUser={setUser}
          auth0Container={auth0Container}
        />
      ),
      errorElement: <ErrorPage />,
      loader: productsLoader,
    },
    {
      path: "/basket",
      element: (
        <Basket
          setUser={setUser}
          user={userAsState}
          auth0Container={auth0Container}
        />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/product/:id",
      element: <Product user={userAsState} setUser={setUser} />,
      errorElement: <ErrorPage />,
      loader: undefined,
    },
    {
      path: "/orders",
      element: <Orders user={userAsState} setUser={setUser} />,
      errorElement: <ErrorPage />,
      loader: userAsState
        ? () => ordersLoader(userAsState?.id as number)
        : undefined,
    },
  ]);

function App() {
  const [userAsState, setUser] = useState<User | null>(null);
  const { user, isAuthenticated, loginWithRedirect, logout, isLoading } =
    useAuth0();
  const auth0Container = {
    user: user,
    isAuthenticated: isAuthenticated,
    loginWithRedirect: loginWithRedirect,
    logout: logout,
    isLoading: isLoading,
  };
  const routes = routerFn({ userAsState, setUser, auth0Container });

  useEffect(() => {
    getUserData();
  }, [isAuthenticated]);

  async function getUserData() {
    if (!isAuthenticated) return;
    const response = await fetch(
      `https://localhost:7218/api/Users/${user?.sub}`
    );
    const dbUser = (await response.json()) as User;
    setUser(dbUser);
  }

  return <RouterProvider router={routes} />;
}

export default App;
