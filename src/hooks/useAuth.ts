import {
  LogoutOptions,
  RedirectLoginOptions,
  useAuth0,
  User,
} from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useAuth() {
  const [user, setUser] = useLocalStorage<User>("auth.user");
  const [isAuthenticated, setIsAuthenticated] = useState(user !== undefined);
  const [isLoading, setIsLoading] = useState(false);
  const auth0 = useAuth0();
  const { error } = auth0;

  const loginWithRedirect = useCallback(
    (options?: RedirectLoginOptions) => {
      if (user) {
        return;
      }

      setIsLoading(true);
      return auth0.loginWithRedirect(options);
    },
    [user]
  );

  const logout = (options?: LogoutOptions) => {
    setUser(undefined);
    auth0.logout(options);
  };

  useEffect(() => {
    if (auth0.user) {
      setUser(auth0.user);
    }
  }, [auth0.user]);

  useEffect(() => {
    setIsAuthenticated(user !== undefined);
  }, [user]);

  useEffect(() => {
    setIsLoading(auth0.isLoading);
  }, [auth0.isLoading]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    loginWithRedirect,
    logout,
  };
}
