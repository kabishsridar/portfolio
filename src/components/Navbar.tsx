"use client";

import { useEffect, useState } from "react";
import { Terminal as TerminalIcon, ShieldCheck, Activity } from "lucide-react";

interface NavbarProps {
  onToggleTerminal: () => void;
  terminalOpen: boolean;
}

export default function Navbar({ onToggleTerminal, terminalOpen }: NavbarProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-tactical-border/70 bg-tactical-base/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between font-mono-tech text-xs">
        {/* Left: Identity Callout & Coordinates */}
        <div className="flex items-center space-x-4">
          <a
            href="#hero"
            className="flex items-center space-x-2 text-tactical-ivory hover:text-tactical-amber transition-colors group"
          >
            <span className="w-2 h-2 bg-tactical-amber group-hover:scale-125 transition-transform" />
            <span className="font-bold tracking-widest uppercase text-sm">
              KABISH SRIDAR
            </span>
            <span className="text-tactical-dim hidden sm:inline">// 0x4B</span>
          </a>

          <div className="hidden lg:flex items-center space-x-2 text-tactical-muted pl-4 border-l border-tactical-border">
            <span className="text-tactical-amber text-[10px]">LOC:</span>
            <span className="text-[11px]">10.7905° N, 78.7047° E</span>
          </div>
        </div>

        {/* Center: System Telemetry Indicator */}
        <div className="hidden md:flex items-center space-x-6 text-[11px] text-tactical-muted">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tactical-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tactical-green"></span>
            </span>
            <span className="text-tactical-green font-semibold">SYS_ONLINE</span>
          </div>

          <div className="flex items-center space-x-1.5 text-tactical-dim">
            <Activity className="w-3.5 h-3.5 text-tactical-amber" />
            <span className="text-tactical-ivory">{time || "00:00:00 IST"}</span>
          </div>

          <div className="flex items-center space-x-1.5 text-tactical-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-tactical-amber" />
            <span>SRMIST AI/ML</span>
          </div>
        </div>

        {/* Right: Section Navigation & Terminal Trigger */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          <nav className="hidden sm:flex items-center space-x-4 text-[11px] tracking-wider text-tactical-muted uppercase">
            <a href="#projects" className="hover:text-tactical-amber transition-colors">
              // PROJECTS
            </a>
            <a href="#arsenal" className="hover:text-tactical-amber transition-colors">
              // ARSENAL
            </a>
            <a href="#credentials" className="hover:text-tactical-amber transition-colors">
              // CREDENTIALS
            </a>
            <a href="#contact" className="hover:text-tactical-amber transition-colors">
              // COMM
            </a>
          </nav>

          {/* Terminal Launcher */}
          <button
            onClick={onToggleTerminal}
            className={`flex items-center space-x-1.5 px-3 py-1.5 border transition-all text-[11px] uppercase tracking-wider font-semibold ${
              terminalOpen
                ? "border-tactical-green bg-tactical-green/10 text-tactical-green"
                : "border-tactical-border hover:border-tactical-amber bg-tactical-surface text-tactical-ivory hover:text-tactical-amber"
            }`}
            title="Toggle Hardware Terminal (Hotkey: Ctrl + ~)"
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>CLI</span>
            <span className="hidden xl:inline text-[9px] text-tactical-dim font-normal">
              [^~]
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
