import React, { PropsWithChildren, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "@theme/Loading";

export default function RequireAuth(props: PropsWithChildren) {
  const { loginWithRedirect, isAuthenticated, error, isLoading, user } =
    useAuth0();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isAuthenticated) {
      return;
    }

    localStorage.setItem("intendedURL", `${location.pathname}${location.hash}`);

    loginWithRedirect();
  }, [isLoading, isAuthenticated, error]);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!user.nickname) {
      return;
    }

    if (window.analytics) {
      window.analytics.identify(user.nickname, {
        github_username: user.nickname,
        email: user.email,
        name: user.name,
      });
    }
  }, [user]);

  useEffect(() => {
    // Since we don't render the docs until auth0 retrieves the user info,
    // we have to explicitely jump to the DOM contents with `location.assign`.
    if (location.hash) {
      location.assign(location.hash);
    }
  }, [user]);

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
