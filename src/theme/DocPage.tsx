import React from 'react';

import '../css/login.css';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "@theme/Loading";
import DocPage from '@theme-original/DocPage';
import InviteForm, { InviteOnly, LoginButton } from "@site/src/components/InviteForm";
import Layout from "@theme/Layout";

const isAuthorized = (user) => {
  if (!user) {
    return false;
  }
  let roles = user["https://winglang.io/roles"];
  if (!roles) {
    return false;
  }

  return roles[0] === 'WingAlpha';
}


export default function DocPageWrapper(props) {

  const { isAuthenticated, isLoading, user } = useAuth0();
  if (isLoading) {
    return <Loading></Loading>
  }
  const userIsAuthorized = isAuthorized(user);

  return (
    <React.Fragment>
      {isAuthenticated && userIsAuthorized ? (
        <DocPage {...props}/>
      ) : (
        <Layout>
          {!isAuthenticated ? (
              <>
                <InviteForm/>
                <LoginButton/>
              </>) :
            <InviteOnly/>
          }
        </Layout>

      )}
    </React.Fragment>
  );
}
