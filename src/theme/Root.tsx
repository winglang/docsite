import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import RequireAuth from "../components/RequireAuth";

export default function Root({ children }) {
  const { siteConfig } = useDocusaurusContext();
  const redirectUrl = `${siteConfig.url}${siteConfig.baseUrl}`;

  return (
    <Auth0Provider
      domain={siteConfig.customFields.DEV_ENV ? "dev-vw3zp0luf7vo4d8k.us.auth0.com" : "wingdocs.us.auth0.com"}
      clientId={siteConfig.customFields.DEV_ENV ? "sy9hH8oeXyc6mdGIeD1zmfUtAPEtKtqN" : "fkBS9Y4FbIOg3UkYtUzxDIzE264IVBnG"}
      redirectUri={redirectUrl}
    >
      <RequireAuth>{children}</RequireAuth>
    </Auth0Provider>
  );
}
