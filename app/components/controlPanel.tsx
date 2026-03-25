"use client";
import styles from "../ui/home.module.css";
import React, { useCallback, useEffect } from "react";
import { Play, Pause, Square, RefreshCwOff, RefreshCw, Volume2, VolumeOff } from 'lucide-react';
import { autoCloseAlert } from "../lib/autoCloseAlert";
import { useTimerStore } from "../stores/useTimerStore";
import { formatTime } from "../lib/formatTime";
import { useSessionStore } from "../stores/useSessionStore";

const MODES = {
  POMODORO: 'Pomodoro',
  SHORT_BREAK: 'Short Break',
  LONG_BREAK: 'Long Break',
} as const;

type MODE = typeof MODES[keyof typeof MODES];




export default function ControlPanel() {
  
    const timer = useTimerStore();
    const session = useSessionStore();
    const [draftDurations, setDraftDurations] = React.useState(session.durations);
    const [editingDurations, setEditingDurations] = React.useState(false);
    const [autoContinue, setAutoContinue] = React.useState(true);
    const [musicOn, setMusicOn] = React.useState(false);
    const [alarmOn, setAlarmOn] = React.useState(true);
    const [musicVolume, setMusicVolume] = React.useState(70);
    const [alarmVolume, setAlarmVolume] = React.useState(70);
    const [seeSettings, setSeeSettings] = React.useState(false);


    const handleStart = () => {
        if (timer.mode == null) {
          timer.setMode(MODES.POMODORO);
        }
        timer.start();
        session.startSession(); // Start session
      }
      const handlePause = () => {
        timer.pause(); // Pause timer
        // pause timer
      }
      const handleStop = () => {
        //order matters here to prevent weird edge cases of stopping session but not timer or vice versa
        session.stopSession(); // End session
        timer.reset(); // Reset timer
        
      }
    
      const handleModeChange = (mode: MODE) => {
        timer.setMode(mode);
        timer.setDurations();
        console.log(timer.mode, timer.duration);
      }
    
      const handleAutoStart = useCallback(() => {
          if (timer.mode === MODES.POMODORO) {
            session.countPomodoro();
            if ((session.pomodoroCount + 1) % 4 === 0) {
              timer.setMode(MODES.LONG_BREAK);
            } else {
              timer.setMode(MODES.SHORT_BREAK);
            }
          } else if (timer.mode === MODES.SHORT_BREAK) {
            timer.setMode(MODES.POMODORO);
          } else if (timer.mode === MODES.LONG_BREAK) {
            timer.setMode(MODES.POMODORO);
          } else {
            timer.setMode(MODES.POMODORO);
          }
          timer.start();
      }, [timer, session]);
    
      const handleUpdateDurations = () => {
        if (editingDurations) {
          setEditingDurations(false);
          session.setDurations(draftDurations);
          setDraftDurations(session.durations);
          timer.setDurations(); // give the timer a little refresh
          setSeeSettings(false);
          console.log(session.durations);
        } else {
          setEditingDurations(true);
        }
      }
    
      const handleMusicToggle = () => {
        setMusicOn(!musicOn);
        autoCloseAlert(`Music is now ${!musicOn ? "enabled" : "muted"}.`);
      }
    
      const handleAlarmToggle = () => {
        setAlarmOn(!alarmOn);
        autoCloseAlert(`Alarm is now ${!alarmOn ? "enabled" : "muted"}.`);
      }

      const handleAutoContinueToggle = () => {
        setAutoContinue(!autoContinue);
        autoCloseAlert(`Auto Continue is now ${!autoContinue ? "enabled" : "disabled"}.`);
      }
      const choosePomodoroPreset = (preset: string) => {
        switch (preset) {
          case 'beginner': 
            session.setDurations({
              [MODES.POMODORO]: 10 * 60, // Convert to seconds
              [MODES.SHORT_BREAK]: 5 * 60, // Convert to seconds
              [MODES.LONG_BREAK]: 10 * 60, // Convert to seconds
            });
            break;
          case 'default':
            session.setDurations({
              [MODES.POMODORO]: 25 * 60, // Convert to seconds
              [MODES.SHORT_BREAK]: 5 * 60, // Convert to seconds
              [MODES.LONG_BREAK]: 15 * 60, // Convert to seconds
            });
            break;
          case 'lockIn':
            session.setDurations({
              [MODES.POMODORO]: 40 * 60, // Convert to seconds
              [MODES.SHORT_BREAK]: 10 * 60, // Convert to seconds
              [MODES.LONG_BREAK]: 20 * 60, // Convert to seconds
            });
            break;
          default:
            break;
        }
        setDraftDurations(session.durations);
        timer.setDurations(); // give the timer a little refresh
        setSeeSettings(false);
        console.log(session.durations);
      };

    
      useEffect(() => {
        if (timer.seconds === 0 && timer.status === 'ticking') {
          timer.pause(); // Pause the timer when it reaches 0
          handleAutoStart(); // Automatically start the next session
        } else if (timer.seconds === 0 && timer.status === 'paused') {
          handleAutoStart(); // Automatically start the next session if timer is paused at 0
        }
      }, [timer, handleAutoStart]);

    if (seeSettings) { return (
            <section className={`${styles.controlPanel}`}>
              <h1>Settings</h1>
              <h3 className="w-full text-center">Timer Presets:</h3>
              <div className={styles.modeButtons}>
                <button onClick={() => choosePomodoroPreset('beginner')} className={styles.modeBtn}>Beginner 10/5/10 </button>
                <button onClick={() => choosePomodoroPreset('default')} className={styles.modeBtn}>Default 25/5/15</button>
                <button onClick={() => choosePomodoroPreset('lockIn')} className={styles.modeBtn}>Lock In 40/10/20</button>
              </div>
              <div className="flex w-full flex-col items-center gap-4">
              {editingDurations ? (
                <div className="flex flex-col gap-2">
                  <p>Enter time in minutes:</p>
                  {Object.entries(draftDurations).map(([mode, duration]) => (
                    <div key={mode} className="flex flex-row gap-2 items-center">
                      <span>{mode}</span>
                      <input
                        type="number"
                         // Display in minutes
                                    onChange={(e) => setDraftDurations({
                                      ...draftDurations,
                                      [mode]: Math.max(1, Math.ceil(Number(e.target.value) * 60)), // Convert back to seconds, minimum 1 second
                        })}
                        className={styles.input}
                      />
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="flex w-full flex-row justify-center gap-5">
              <button className={styles.modeBtn} onClick={handleUpdateDurations}>{ editingDurations ? "Save Timer" : "Custom Timer" }</button> 
              <button className={styles.modeBtn} aria-label="toggle auto continue" onClick={handleAutoContinueToggle}>{ autoContinue ? <RefreshCw /> : <RefreshCwOff /> }</button>
              </div>
            </div>
            <h3 className="w-full text-center">Audio:</h3>
            <h2 className="w-full text-left">Music:</h2>
            <div className="flex w-full flex-wrap justify-center gap-5">
              <button className={styles.modeBtn} aria-label="toggle music" onClick={handleMusicToggle}>{ musicOn ? <Volume2 /> : <VolumeOff /> }</button>
               <div className={styles.volumeControl}>
                <label htmlFor="music-volume-slider" className={styles.volumeLabel}>
                  Volume: {musicOn ? `${musicVolume}%` : "Muted"}
                </label>
                <input
                  id="music-volume-slider"
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(Number(e.target.value))}
                  disabled={!musicOn}
                  className={styles.volumeSlider}
                />
              </div>
            </div>
            <h2 className="w-full text-left">Alarm:</h2>
            <div className="flex w-full flex-wrap justify-center gap-5">
              <button className={styles.modeBtn} aria-label="toggle alarm sound" onClick={handleAlarmToggle}>{ alarmOn ? <Volume2 /> : <VolumeOff /> }</button>
               <div className={styles.volumeControl}>
                <label htmlFor="alarm-volume-slider" className={styles.volumeLabel}>
                  Volume: {alarmOn ? `${alarmVolume}%` : "Muted"}
                </label>
                <input
                  id="alarm-volume-slider"
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={alarmVolume}
                  onChange={(e) => setAlarmVolume(Number(e.target.value))}
                  disabled={!alarmOn}
                  className={styles.volumeSlider}
                />
              </div>
            </div>
           
              <div className="flex w-full flex-wrap justify-center gap-2">
                <button className={styles.modeBtn} onClick={() => setSeeSettings(false)}>Back to Timer</button>
              </div>
            </section>
          )} else { 
            return (
                <section className={`${styles.controlPanel}`}>
                    <h1>{timer.mode ? timer.mode : "Start a Pomodoro!" } </h1>
                    <h3 className={styles.timer}>{formatTime(timer.seconds)}</h3>
                    <div className={styles.timerButtons}>
                      <button onClick={!timer.isRunning ? handleStart : handlePause} className={styles.startBtn}>{!timer.isRunning ? <Play /> : <Pause /> }</button>
                      <button className={styles.startBtn} onClick={timer.isRunning ? handleStop : () => {}}><Square /></button>
                    </div>
                    <h3 className="w-full text-center">Current Pomodoro Count: {session.pomodoroCount}</h3>
                    <div className={styles.modeButtons}>
                      <button onClick={() => handleModeChange(MODES.POMODORO)} className={styles.modeBtn}>Pomodoro ({formatTime(session.durations[MODES.POMODORO])})</button>
                      <button onClick={() => handleModeChange(MODES.SHORT_BREAK)} className={styles.modeBtn}>Short Break ({formatTime(session.durations[MODES.SHORT_BREAK])})</button>
                      <button onClick={() => handleModeChange(MODES.LONG_BREAK)} className={styles.modeBtn}>Long Break ({formatTime(session.durations[MODES.LONG_BREAK])})</button>
                    </div>
                    <button className={styles.modeBtn} onClick={() => setSeeSettings(true)}>Settings</button>
                    
                </section>); 
          }
}