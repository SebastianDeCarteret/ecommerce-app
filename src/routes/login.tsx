import { Navigate, redirect } from "react-router-dom";
import { User } from "../models/user.model";
// import LoginForm from "../components/login/LoginForm";
import { useAuth0 } from "@auth0/auth0-react";

interface Types {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function Login({ setUser }: Types) {
  // return <LoginForm setUser={setUser} />;
  const { user, isAuthenticated, loginWithRedirect, isLoading, error } =
    useAuth0();
  console.log(user);
  // setUser(get user by sub)
  async function getUserData() {
    await loginWithRedirect();
    const response = await fetch(
      `https://localhost:7218/api/Users/${user?.sub}`
    );
    const dbUser = (await response.json()) as User;
    redirect("/products");
    setUser(dbUser);
  }
  getUserData();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  // return isAuthenticated ? redirect("/products") : loginWithRedirect();
  // return <button onClick={() => loginWithRedirect()}>Log In</button>;
}
