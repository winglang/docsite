import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styles from './styles.module.css';

export default function InviteForm(props) {
  return (
    <div className={styles.centered}>
      <div className={styles.hero}>
        <h1>We're in Preview mode!</h1>
        <p>Wing is currently invite only. If you have been invited, please go ahead and log in with GitHub to access the
          documents.</p>
      </div>
    </div>
  )
}

export function LoginButton(props) {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.centered}>
      <button className="login__btn login__github"
              onClick={() => loginWithRedirect({ appState: window.location.href })}>
        Log in with GitHub
      </button>
    </div>
  )
}

export function InviteOnly() {
  return (
    <div className={styles.centered}>
      <div className={styles.hero}>
        <p>
          Thank you for showing interest in Wing!
        </p>
        <p>
          We will notify you when you've been giving access to the preview.
        </p>
      </div>
    </div>
  )
}
