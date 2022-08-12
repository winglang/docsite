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
          We will notify you when you've been giving access to the preview.
        </p>
      </div>
    </div>
  )
}
