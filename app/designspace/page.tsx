"use client";
import styles from "../ui/home.module.css";
import ControlPanel from "../components/controlPanel";

export default function Workspace() {
  
  return (
        /* Little pomodoro box space, needs styles and function */
        <div className={`${styles.mainSection}`}>
          <section className={`${styles.focusPanel} font-sans`}>
            {/* This will be the cute custom space */}
            <p>View Current Design here!</p>
          </section>
          {/* Timer and settings space */}
          <ControlPanel />
        </div>
  );
}
