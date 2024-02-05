import { Basket } from "../models/basket.model";
import BasketView from "../components/basket/BasketView";
import { User } from "../models/user.model";
import {
  AppState,
  LogoutOptions,
  RedirectLoginOptions,
} from "@auth0/auth0-react";
import * as Auth0 from "@auth0/auth0-react";

interface Types {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  auth0Container: {
    user: Auth0.User | undefined;
    isAuthenticated: boolean;
    loginWithRedirect: (
      options?: RedirectLoginOptions<AppState> | undefined
    ) => Promise<void>;
    logout: (options?: LogoutOptions | undefined) => Promise<void>;
    isLoading: boolean;
  };
}

export default function Basket({ user, setUser, auth0Container }: Types) {
  return (
    <>
      <BasketView
        setUser={setUser}
        userAsState={user}
        auth0Container={auth0Container}
      />
    </>
  );
}
