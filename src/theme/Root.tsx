import React from 'react';
import { Auth0Provider } from "@auth0/auth0-react";
import BrowserOnly from "@docusaurus/core/lib/client/exports/BrowserOnly";

export default function Root({ children }) {
  return (
    <BrowserOnly>
      {
        () => <Auth0Provider
          domain="dev-9zrd68w6.us.auth0.com"
          clientId="ME2IgEK7qDBkMaFrf3lyb1DnvJyF7CKm"
          redirectUri={window.location.href}
        >
          {children}
        </Auth0Provider>
      }
    </BrowserOnly>
  )
}
