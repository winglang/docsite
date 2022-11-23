import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "@theme/Loading";

export default function () {
  const { user } = useAuth0();
  useEffect(() => {
    if (!user) {
      return;
    }

    const intendedURL = localStorage.getItem("intendedURL");

    localStorage.removeItem("intendedURL");

    location.assign(intendedURL ?? "/");
  }, [user]);

  return (
    <Loading
      isLoading
      pastDelay
      timedOut={false}
      retry={() => {}}
      error={undefined}
    />
  );
}
