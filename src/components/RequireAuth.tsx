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
    loginWithRedirect({
      redirectUri: `${location.protocol}//${location.host}/login/callback`,
    });
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
