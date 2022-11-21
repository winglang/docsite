import React, { PropsWithChildren, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "@theme/Loading";

export default function RequireAuth(props: PropsWithChildren) {
  const { loginWithRedirect, isAuthenticated, error, isLoading } =
    useAuth0();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isAuthenticated) {
      return;
    }
    loginWithRedirect();
  }, [isLoading, isAuthenticated, error]);

  return (
    <>
      {isLoading && (
        <Loading
          isLoading={isLoading}
          error={error}
          timedOut={false}
          retry={() => {}}
          pastDelay={true}
        />
      )}
      {isAuthenticated && props.children}
    </>
  );
}
