import { useLoaderData, useNavigate } from "react-router-dom";
import { User } from "../models/user.model";
import DisplayUsers from "../components/users/DisplayUsers";

export default function Users() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  const { users }: any = useLoaderData();
  return (
    <>
      <h1>Users</h1>
      <button onClick={() => routeChange()}>Back to products</button>
      <DisplayUsers users={users} />
    </>
  );
}

export async function loader() {
  const response = await fetch("https://localhost:7218/api/Users");
  const users = (await response.json()) as User[];
  return { users };
}
