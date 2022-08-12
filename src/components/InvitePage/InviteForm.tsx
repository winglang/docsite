import styles from "@site/src/components/InvitePage/styles.module.css";
import React from "react";
import clsx from "clsx";

export default function InviteForm(props) {
  return (
    <div className={clsx('hero hero--primary', styles.centered)}>
      <div className={styles.hero}>
        <h1 className=''>We're in Preview mode!</h1>
        <p>Wing is currently invite only. If you have been invited, please go ahead and log in with GitHub to access the
          documents.</p>
      </div>
    </div>
  )
}
