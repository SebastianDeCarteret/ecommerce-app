import { Form } from "react-router-dom";
import { User } from "../../models/user.model";
import { useState } from "react";

interface InputTypes {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function LoginForm({ setUser }: InputTypes) {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  async function Authenticate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await fetch(
      `https://localhost:7218/api/Users/authenticate/username/${username}/password/${password}`,
      {
        method: "PATCH",
        headers: { accept: "text/plain" },
      }
    );
    if (result.status === 201) {
      const user = await result.json();
      setUser(user as User);
    } else {
      setUser(null);
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
