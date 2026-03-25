import type { Metadata } from "next";
import { Geist, Geist_Mono, Margarine } from "next/font/google";
import "./ui/globals.css";
import TimerDisplay from './lib/timer.jsx';

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
        className={`${geistSans.variable} ${geistMono.variable} ${margarine.variable} antialiased bg-foreground`}
      >
        <div className="font-display flex flex-row justify-between sticky top-0 z-10 bg-background m-0 p-0 w-100% border-b-2 border-dark-brown">
          <h1 className="title max-w-xs text-3xl font-semibold tracking-tight text-dark-brown flex p-10 m-0 ">
            My Pomo Home
          </h1> 
          <TimerDisplay />
          <button className="page-swap-btn flex mr-10"> Back! </button>
        </div>
        {children}
      </body>
    </html>
  );
}
