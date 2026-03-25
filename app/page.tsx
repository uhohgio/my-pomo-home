"use client";

import Workspace from "./workspace/page";

export default function Home() {
  
  return (
  <div className="flex flex-col h-[85vh] w-screen justify-center items-center bg-foreground font-sans">
    {/* Main area */}
      <Workspace />
  </div>
);
}
