import { User } from "../../models/user.model";
import SingleUser from "./SingleUser";

interface InputTypes {
  users: User[];
}

export default function DisplayUsers({ users }: InputTypes) {
  return (
    <>
      {users.map((user: User, index) => {
        return (
          <div>
            <SingleUser index={index} user={user} />
          </div>
        );
      })}
    </>
  );
}
