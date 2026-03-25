'use client';
import { useTimerStore } from "../stores/useTimerStore";
import {formatTime}  from "../lib/formatTime"


export default function TimerDisplay () {
  const { seconds, mode } = useTimerStore();

  return (
    <div className={`timer-container`}>
      {/* Dynamic Label based on Mode */}
      <span className="mode-label">
        {mode}
      </span>

      {/* Formatted Time */}
      <h1 className="time-left">
        {formatTime(seconds)}
      </h1>
    </div>
  );
};
