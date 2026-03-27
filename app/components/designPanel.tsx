"use client";
import React from "react";
import styles from "../ui/designspaceLayout.module.css";
import AccountSettings from "./accountSettings";
import DesignSettings from "./designSettings";

export default function DesignPanel() {
  const [showAccount, setShowAccount] = React.useState(false);


  return (
    <div className={styles.designPanel}>
      <div className={styles.designNavBar}>
        <button onClick={() => setShowAccount(true)} className={styles.designNavBtn}>
          Your Account
        </button>
        <button onClick={() => setShowAccount(false)} className={styles.designNavBtn}>
          Design Settings
        </button>
      </div>
      {showAccount && (
          <AccountSettings />
        )}
      {!showAccount && (
          <DesignSettings />
      )}
      {/* (I'd Love to also add a site store here) */}
    </div>
  );
}