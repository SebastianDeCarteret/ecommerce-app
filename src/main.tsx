import React, { ReactNode, useState } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page.tsx";
import Users, { loader as usersLoader } from "./routes/users.tsx";
import Home, { loader as productsLoader } from "./routes/home.tsx";
import Login, { loader as loginLoader } from "./routes/login.tsx";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
    loader: loginLoader,
  },
  {
    path: "/products",
    element: <Home />,
    errorElement: <ErrorPage />,
    loader: productsLoader,
  },
  {
    path: "/users",
    element: <Users />,
    errorElement: <ErrorPage />,
    loader: usersLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
