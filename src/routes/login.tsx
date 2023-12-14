import { useLoaderData, useNavigate, Form } from "react-router-dom";
import { User } from "../models/user.model";
import LoginForm from "../components/login/LoginForm";
import { useState } from "react";

export default function Login() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `products`;
    navigate(path);
  };

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { users }: any = useLoaderData();

  async function Authenticate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userFound: User = users.find(
      (user: User) => user.username === username && user.password === password
    );

    const result = await fetch(
      `https://localhost:7218/api/Users/authenticate/username/${username}/password/${password}`,
      {
        method: "PATCH",
        headers: { accept: "text/plain" },
      }
    );
    if (result.status === 201) {
      setIsLoggedIn(true);
      routeChange();
    } else {
      setIsLoggedIn(false);
    }
  }

  return (
    <>
      <h1>Login:</h1>
      <Form method="patch" id="contact-form" onSubmit={(e) => Authenticate(e)}>
        <span>Username:</span>
        <input
          placeholder="username"
          aria-label="Username"
          type="text"
          name="username"
          defaultValue=""
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span>Password:</span>
        <input
          placeholder="password"
          aria-label="Passsword"
          type="password"
          name="password"
          defaultValue=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </Form>
    </>
  );
}

export async function loader() {
  const response = await fetch("https://localhost:7218/api/Users");
  const users = (await response.json()) as User[];
  return { users };
}
