import { useAuth0 } from "@auth0/auth0-react";
import Loading from "@theme/Loading";
import { InvitePage } from "@site/src/components/InvitePage";
import React from "react";


const isAuthorized = (user) => {
  if (!user) {
    return false;
  }
  let roles = user["https://winglang.io/roles"];
  if (!roles) {
    return false;
  }

  return roles[0] === 'WingAlpha';
}

export function RequireAuth({ children }) {
  const { isAuthenticated, isLoading, user, error } = useAuth0();
  console.log({ error, isLoading, isAuthenticated })
  const isAllowed = isAuthenticated && isAuthorized(user);
  if (isLoading) {
    return <Loading/>;
  }

  if (!isAllowed) {
    return <InvitePage/>;
  }
  return <>{children}</>;
}
