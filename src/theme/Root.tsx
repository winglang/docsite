import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import RequireAuth from "../components/RequireAuth";

export default function Root({ children }) {
  const { siteConfig } = useDocusaurusContext();
  const redirectUrl = `${siteConfig.url}${siteConfig.baseUrl}`;

  return (
    <Auth0Provider
      domain="dev-vw3zp0luf7vo4d8k.us.auth0.com"
      clientId="sy9hH8oeXyc6mdGIeD1zmfUtAPEtKtqN"
      redirectUri={redirectUrl}
    >
      <RequireAuth>{children}</RequireAuth>
    </Auth0Provider>
  );
}
