import { create } from "zustand";

interface SessionState {
    pomodoroCount: number;
    working: boolean;
    totalFocusTime: number; // in seconds
    durations: {
        [key: string]: number;
    };
    startSession: () => void;
    countFocusTime: () => void;
    countPomodoro: () => void;
    setDurations: (newDurations: { [key: string]: number }) => void;
    // setWorking: (isWorking: boolean) => void;
    stopSession: () => void;
    resetSession: () => void;
}

// We use a variable outside to store the interval ID
let intervalId: NodeJS.Timeout | null = null;

export const useSessionStore = create<SessionState>((set, get) => ({
    pomodoroCount: 0,
    totalFocusTime: 0,
    working: false,
    durations: {
        'Pomodoro': 25 * 60,
        'Short Break': 5 * 60,
        'Long Break': 15 * 60,
    },
    startSession: () => {
        if (get().working) return; // Prevent starting a new session if already working
        intervalId = setInterval(() => {
            get().countFocusTime();
        }, 1000);
        set({ working: true });
    },
    stopSession: () => {
        if (intervalId) clearInterval(intervalId);
        set({ working: false });
    },
    // setWorking: (isWorking: boolean) => set({ working: isWorking }),
    countPomodoro: () => set((state) => ({
        pomodoroCount: state.pomodoroCount + 1,
    })),
    countFocusTime: () => set((state) => ({
        totalFocusTime: state.totalFocusTime + 1,
    })),
    setDurations: (newDurations: { [key: string]: number }) => set({ durations: newDurations }),
    resetSession: () => set({ pomodoroCount: 0, totalFocusTime: 0, working: false }),
}));