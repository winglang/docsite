import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Layout from "@theme/Layout";
import InviteForm from "@site/src/components/InvitePage/InviteForm";
import { InviteOnly } from "@site/src/components/InvitePage/InviteOnly";
import { LoginButton } from "@site/src/components/InvitePage/LoginButton";
import styles from './styles.module.css';
export function InvitePage(props) {
  const { isAuthenticated } = useAuth0();

  return (<Layout>

    {!isAuthenticated ?
      <div className={styles.split}>
        <InviteForm/>
        <LoginButton/>
      </div>
      :
      <InviteOnly/>
    }
  </Layout>);
}
