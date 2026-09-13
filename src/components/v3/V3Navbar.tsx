"use client";

import { useEffect, useState } from "react";
import { Terminal, Zap, ShieldCheck } from "lucide-react";

interface V3NavbarProps {
  onToggleTerminal: () => void;
  terminalOpen: boolean;
}

export default function V3Navbar({ onToggleTerminal, terminalOpen }: V3NavbarProps) {
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
    <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-tactical-border/70 bg-transparent backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between font-mono-tech text-xs">

        {/* Left: Identity */}
        <div className="flex items-center space-x-3">
          <a
            href="#v3-hero"
            className="flex items-center space-x-2 text-tactical-ivory hover:text-blue-400 transition-colors group"
          >
            <span className="w-2.5 h-2.5 bg-blue-500 inline-block group-hover:scale-125 transition-transform" />
            <span className="font-black tracking-wider uppercase text-sm">
              KABISH SRIDAR
            </span>
          </a>
          <span className="hidden sm:inline text-blue-400 font-semibold text-[10px] px-2 py-0.5 border border-blue-500/30 bg-blue-500/10">
            V3 // HYPER-SCROLL
          </span>
        </div>

        {/* Center: Live Telemetry */}
        <div className="hidden lg:flex items-center space-x-4 text-[11px] text-tactical-muted">
          <span>{time || "00:00:00 IST"}</span>
          <span className="text-tactical-dim">|</span>
          <span className="text-tactical-green">10.7905° N, 78.7047° E</span>
          <span className="text-tactical-dim">|</span>
          <span className="text-tactical-amber">SRMIST AI & ML</span>
        </div>

        {/* Right: Anchors & Terminal Trigger */}
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-4 text-[11px] uppercase tracking-wider text-tactical-muted">
            <a href="#v3-projects" className="hover:text-blue-400 transition-colors">
              // WORK
            </a>
            <a href="#v3-radar" className="hover:text-blue-400 transition-colors">
              // RADAR
            </a>
            <a href="#v3-academic" className="hover:text-blue-400 transition-colors">
              // DOSSIER
            </a>
            <a href="#v3-contact" className="hover:text-blue-400 transition-colors">
              // TRANSMIT
            </a>
          </nav>

          <button
            onClick={onToggleTerminal}
            className={`flex items-center space-x-1.5 px-3 py-1.5 border transition-all text-[11px] uppercase tracking-wider font-semibold ${
              terminalOpen
                ? "border-blue-500 bg-blue-500/20 text-blue-400"
                : "border-tactical-border hover:border-blue-500 text-tactical-ivory bg-transparent"
            }`}
            title="Toggle Terminal Emulator (Ctrl + ~)"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>CLI</span>
          </button>
        </div>

      </div>
    </header>
  );
}