import styles from "@site/src/components/InvitePage/styles.module.css";
import React from "react";
import { InviteFormButton } from "@site/src/components/InviteFormButton";

export function InviteOnly() {
  return (
    <div className={styles.centered}>
      <div className={styles.hero}>
        <p>
          Thank you for showing interest in Wing!
        </p>
        <p>
          Wing is currently in preview mode. If you'd like to get an early peek, please fill out an invite request using the button below.
        </p>
        <InviteFormButton/>
      </div>
    </div>
  )
}
