import React, { useEffect, useState } from "react";
import { User } from "../models/user.model";

export default function DisplayUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const response = await fetch("https://localhost:7218/api/Users");
    const data = (await response.json()) as User[];
    setUsers(data);
  }

  function loaded() {
    return users.map((element, index) => {
      return <h1 key={index}>{element.firstName}</h1>;
    });
  }

  return (
    <>
      {users.length != 0 ? (
        loaded()
      ) : (
        <h1 className="loading-placeholder">Loading...</h1>
      )}
    </>
  );
}
