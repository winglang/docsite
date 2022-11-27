import React, { useEffect } from "react";
import Loading from "@theme/Loading";
import { useAuth } from "@site/src/hooks/useAuth";

export default function () {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }

    const intendedURL = localStorage.getItem("intendedURL");

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
