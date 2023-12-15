import { useLoaderData, Form, Navigate } from "react-router-dom";
import { User } from "../models/user.model";
import { useState } from "react";
import LoginForm from "../components/login/LoginForm";

interface Types {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setIsLoggedIn }: Types) {
  return <LoginForm setIsLoggedIn={setIsLoggedIn} />;
}

export async function loader() {
  const response = await fetch("https://localhost:7218/api/Users");
  const users = (await response.json()) as User[];
  return { users };
}
