import React, {useEffect, useState} from "react";
import { detectIncognito } from "detectincognitojs";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {Login} from "@site/src/pages/login/login";

export default function Root({ children }) {
  const { siteConfig } = useDocusaurusContext();
  const [redirectUrl, setRedirectUrl] = useState<string>();

  useEffect(() => {
    const configLogin = async () => {
      const baseUrl = `${siteConfig.url}${siteConfig.baseUrl}`;
      const incognito = await detectIncognito();
        if (incognito) {
          setRedirectUrl(baseUrl);
        } else {
          setRedirectUrl(`${baseUrl}login/callback`);
        }
    }
    configLogin();
  },[]);


  return (
      redirectUrl ? <Login redirectUrl={redirectUrl}>{children}</Login> : null
  );
}
