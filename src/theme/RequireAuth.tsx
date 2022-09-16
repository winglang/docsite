import { useAuth0 } from "@auth0/auth0-react";
import Loading from "@theme/Loading";
import { InvitePage } from "@site/src/components/InvitePage";
import React, { useEffect } from "react";


const isAuthorized = (user) => {
  if (!user) {
    return false;
  }
  let roles = user["https://winglang.io/roles"];
  if (!roles) {
    return false;
  }
  return roles.includes('WingAlpha');
}

export function RequireAuth({ children }) {
  const { isAuthenticated, isLoading, user, error, loginWithRedirect } = useAuth0();
  const isAllowed = isAuthenticated && isAuthorized(user);

  useEffect(() => {
    if (isAuthenticated && !isAllowed) {
      const interval = setInterval(async () => {
        console.log("checking access...");
        await loginWithRedirect();
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }

  }, [isAuthenticated, isAllowed]);

  if (isLoading) {
    return <Loading/>;
  }
  
  if (!isAllowed) {
    return <InvitePage/>;
  }
  return <>{children}</>;
}
