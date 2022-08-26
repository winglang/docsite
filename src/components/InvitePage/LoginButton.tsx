import { useAuth0 } from "@auth0/auth0-react";
import styles from "@site/src/components/InvitePage/styles.module.css";
import React from "react";
import clsx from "clsx";
const GitHubIcon = require('@site/static/img/github.svg').default
export function LoginButton(props) {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={clsx('hero hero--secondary', styles.loginContainer, styles.centered)}>
      <h1>Log in</h1>
      <button className={clsx("login__btn", styles.loginButton)}
              onClick={() => loginWithRedirect({ appState: window.location.href })}
              style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '1rem'}}
      >
        <GitHubIcon style={{width: '50px', height: '50px', margin: '.5rem', color: 'var(--ifm-hero-background-color)'}} />
        <span style={{fontSize: '1.4rem', color: 'var(--ifm-hero-background-color)'}}>GitHub</span>

      </button>
      <p>* By logging in you're consenting to be contacted by Monada regarding access to Wing.</p>
    </div>
  )
}
