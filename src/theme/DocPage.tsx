import React from 'react';

import '../css/login.css';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "@theme/Loading";
import DocPage from '@theme-original/DocPage';
// Default implementation, that you can customize
export default function DocPageWrapper(props) {

  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <Loading></Loading>
  }
  console.log({isLoading, isAuthenticated});
  return (
    <React.Fragment>
      {isAuthenticated ? (
        <DocPage {...props}/>
      ) : (
        <div className="login">
          <div className="login__container">
            <button className="login__btn login__google" onClick={()=>loginWithRedirect({appState: window.location.href})}>
              Login with GitHub
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
