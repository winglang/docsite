import React from 'react';
import { Auth0Provider } from "@auth0/auth0-react";
import BrowserOnly from "@docusaurus/core/lib/client/exports/BrowserOnly";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Root({ children }) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <BrowserOnly>
      {
        () => <Auth0Provider
          domain="dev-9zrd68w6.us.auth0.com"
          clientId="ME2IgEK7qDBkMaFrf3lyb1DnvJyF7CKm"
          redirectUri={`${siteConfig.url}${siteConfig.baseUrl}docs/getting-started`}
        >
          {children}
        </Auth0Provider>
      }
    </BrowserOnly>
  )
}
