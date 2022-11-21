import React, { PropsWithChildren, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "@theme/Loading";

export default function RequireAuth(props: PropsWithChildren) {
  const { loginWithRedirect, isAuthenticated, error, isLoading, user } =
    useAuth0();

  // TODO: If error: redirect to auth0. If unauthorised: redirect.

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isAuthenticated) {
      return;
    }
    if (error) {
      return;
    }
    loginWithRedirect();
  }, [isLoading, isAuthenticated, error]);

  return (
    <>
      {error && (
        <div>
          {error?.name}, {error?.message}
        </div>
      )}

      {JSON.stringify({ error, isLoading, user })}

      {isLoading && (
        <Loading
          isLoading={isLoading}
          error={error}
          timedOut={false}
          retry={() => {}}
          pastDelay={true}
        />
      )}

      {/* <Loading
        isLoading={true}
        error={undefined}
        timedOut={false}
        retry={() => {}}
        pastDelay={true}
      /> */}

      {isAuthenticated && props.children}
    </>
  );
}
