import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import RequireAuth from "../components/RequireAuth";

export default function Root({ children }) {
  const { siteConfig } = useDocusaurusContext();
  const redirectUrl = `${siteConfig.url}${siteConfig.baseUrl}login/callback`;

  return (
    <Auth0Provider
      domain={siteConfig.customFields.AUTH0_DOMAIN as string}
      clientId={siteConfig.customFields.AUTH0_CLIENT_ID as string}
      redirectUri={redirectUrl}
    >
      <RequireAuth>{children}</RequireAuth>
    </Auth0Provider>
  );
}
