import { User } from "../models/user.model";
import LoginForm from "../components/login/LoginForm";

interface Types {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function Login({ setUser }: Types) {
  return <LoginForm setUser={setUser} />;
}
