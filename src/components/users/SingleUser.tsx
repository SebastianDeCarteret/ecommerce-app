import { User } from "../../models/user.model";

interface InputTypes {
  user: User;
  index: number;
}

export default function SingleUser({ user, index }: InputTypes) {
  return (
    <div
      className="single-user"
      style={{
        backgroundColor: "red",
        margin: "10px",
        padding: "10px",
        borderRadius: "10px",
      }}
      key={index}
    >
      <h1>First name: {user.firstName}</h1>
      <h1>Last name: {user.lastName}</h1>
      <h1>Gender: {user.gender}</h1>
    </div>
  );
}
