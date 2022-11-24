import {Auth0Provider} from "@auth0/auth0-react";
import RequireAuth from "@site/src/components/RequireAuth";
import React, {PropsWithChildren} from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export const Login = ({redirectUrl, children}: PropsWithChildren<{redirectUrl: string}>) => {
    const { siteConfig } = useDocusaurusContext();

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