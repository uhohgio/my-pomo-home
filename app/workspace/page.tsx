/** LOOP:
 * 
 * Paths
 *  Start -> Prep Time
 *  Prep Time (skippable) -> Start Pomodoro
 *  Start Pomodoro -> Pause Pomodoro
 *  Start Pomodoro -> Short Break
 *  Start Pomodoro -> Long Break
 *  Start Pomodoro -> Stop
 *  Short Break -> Pause Break
 *  Short Break -> Pomodoro
 *  Short Break -> Stop
 *  Long Break -> Pause Break
 *  Long Break -> Pomodoro
 *  Long Break -> Stop
 *  Paused -> Pomodoro
 *  Paused -> (Short or Long) Break
 *  Paused -> Stop
 *  Stopped -> Start
 *  
 * Intended Loop -> Start -> Pomo 1 -> SB -> Pomo 2 -> LB -> Pomo 3 -> SB -> Pomo 4 -> Finish! (adjustable w/ custom settings ofc)
 */

"use client";
import styles from "../ui/home.module.css";
import ControlPanel from "../components/controlPanel";

export default function Workspace() {
  
  return (
        /* Little pomodoro box space, needs styles and function */
        <div className={`${styles.mainSection}`}>
          <section className={`${styles.focusPanel} font-sans`}>
            {/* This will be the cute custom space */}
            <p>Hello</p>
          </section>
          {/* Timer and settings space */}
          <ControlPanel />
        </div>
  );
}
