import { Form, Navigate, useLoaderData } from "react-router-dom";
import { User } from "../../models/user.model";
import { useState } from "react";

interface InputTypes {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm({ setIsLoggedIn }: InputTypes) {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

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
    } else {
      setIsLoggedIn(false);
    }
  }

  return (
    <div className="login-page">
      <header>
        <img
          src="src\assets\currys.png"
          alt="Currys Logo"
          className="currys-logo"
        />
      </header>
      <div className="login-form-container">
        <h1 className="top-form-title">Login</h1>
        <Form
          method="patch"
          id="contact-form"
          onSubmit={(e) => Authenticate(e)}
        >
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
      </div>
    </div>
  );
}
