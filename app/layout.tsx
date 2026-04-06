import type { Metadata } from "next";
import { Geist, Geist_Mono, Margarine } from "next/font/google";
import "./ui/globals.css";
import TimerDisplay from './lib/timer.jsx';
import NavButton from "./components/NavButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const margarine = Margarine({
  variable: "--font-display", 
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyPomoHome",
  description: "Pomodoro productivity app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${margarine.variable} antialiased min-h-dvh flex flex-col overflow-x-hidden`}
      >
        <div className="font-display sticky top-0 z-10 bg-(--color-background) border-b-2 border-(--color-accent) h-[12vh] min-h-16 max-h-30 w-full px-3 sm:px-6 flex items-center gap-3 sm:gap-4 overflow-hidden">
          <h1 className="font-semibold tracking-tight text-(--color-accent) m-0 text-lg sm:text-2xl md:text-3xl whitespace-nowrap min-w-0 max-w-[45vw]">
            My Pomo Home
          </h1>
          <div className="min-w-0 flex-1 flex justify-center">
            <TimerDisplay />
          </div>
          {/* Page swap buttons, need to be styled and functional */}
          <NavButton />
        </div>
        <div className="flex-1 min-h-0 w-full flex flex-col justify-start items-center bg-foreground font-sans overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
