import { create } from 'zustand';
import { useSessionStore } from './useSessionStore';

interface TimerState {
  seconds: number;
  isRunning: boolean;
  mode: MODE;
  duration: number;
  status: string;
  setMode: (arg0: MODE) => void; 
  setDurations: () => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
}

const MODES = {
  POMODORO: 'Pomodoro',
  SHORT_BREAK: 'Short Break',
  LONG_BREAK: 'Long Break',
} as const;

type MODE = typeof MODES[keyof typeof MODES];
type Durations = Record<MODE, number>;


// We use a variable outside to store the interval ID
let intervalId: ReturnType<typeof setInterval> | null = null;

const getDurations = (): Durations => useSessionStore.getState().durations as Durations;


export const useTimerStore = create<TimerState>((set, get) => {
  const durations = getDurations();
  return {
    seconds: durations[MODES.POMODORO],
    isRunning: false,
    mode: MODES.POMODORO,
    duration: durations[MODES.POMODORO],
    status: 'stopped',

  setMode: (newMode: MODE) => {
    const durations = getDurations();
    set({
    mode: newMode,
    duration: durations[newMode],
    seconds: durations[newMode],
    status: 'stopped',
  });
},

  setDurations: () => {
    const newDurations = getDurations();
    set({
      duration: newDurations[get().mode],
      seconds: newDurations[get().mode],
    });
  },

  
  start: () => {
    if (get().isRunning) return; // Prevent multiple intervals
    
    intervalId = setInterval(() => {
      get().tick();
    }, 1000);
    
    set({ isRunning: true, status: 'ticking' });
  },
  
  pause: () => {
    if (intervalId) clearInterval(intervalId);
    set({ status:  'paused' , isRunning: false });
  },
  
  reset: () => {
    if (intervalId) clearInterval(intervalId);
    const mode = get().mode;
    set({ seconds: getDurations()[mode], status: 'stopped', isRunning: false });
  },
  
  tick: () => set((state) => ({ 
    seconds: state.seconds > 0 ? state.seconds - 1 : 0,
  })),

}});
