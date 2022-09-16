import styles from "@site/src/components/InvitePage/styles.module.css";
import React from "react";

export function InviteOnly() {
  return (
    <div className={styles.centered}>
      <div className={styles.hero}>
        <p>
          Thank you for showing interest in Wing!
        </p>
        <p>
          We will notify you when you've been given access to the preview.
          This page will refresh each minute to see if you have been given access.
          You can keep the page open or just come back later.
        </p>
      </div>
    </div>
  )
}
