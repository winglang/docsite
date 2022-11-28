import React, { PropsWithChildren, useEffect, useState } from "react";
import Loading from "@theme/Loading";
import { useAuth } from "../hooks/useAuth";

export default function RequireAuth(props: PropsWithChildren) {
  const { loginWithRedirect, logout, isAuthenticated, error, isLoading, user } =
    useAuth();

  // Keep track of the previous "isLoading" status so we can identify
  // when it changes from true to false.
  const [wasLoading, setWasLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      setWasLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    // Once it stops loading, handle the auth redirect.
    if (wasLoading && !isLoading) {
      const intendedURL = `${location.pathname}${location.hash}`;
      if (!intendedURL.startsWith("/login/callback")) {
        localStorage.setItem("intendedURL", intendedURL);
      }
      loginWithRedirect();
    }
  }, [wasLoading, isLoading, isAuthenticated, error]);

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
  }, [isAuthenticated, isLoading]);

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
      {!isLoading && isAuthenticated && props.children}
    </>
  );
}
