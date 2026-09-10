"use client";

import { useEffect, useState } from "react";
import { Terminal, Activity, ArrowUpRight } from "lucide-react";

interface V2NavbarProps {
  onToggleTerminal: () => void;
  terminalOpen: boolean;
}

export default function V2Navbar({ onToggleTerminal, terminalOpen }: V2NavbarProps) {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setScrollPercent(max > 0 ? Math.round((current / max) * 100) : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-tactical-border/70 bg-tactical-base/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between font-mono-tech text-xs">
        
        {/* Identity & Status */}
        <div className="flex items-center space-x-3">
          <a
            href="#v2-hero"
            className="flex items-center space-x-2 text-tactical-ivory hover:text-tactical-amber transition-colors group"
          >
            <span className="w-2.5 h-2.5 bg-tactical-amber inline-block group-hover:rotate-45 transition-transform duration-300" />
            <span className="font-extrabold tracking-wider uppercase text-sm">
              KABISH SRIDAR
            </span>
          </a>
          <span className="hidden sm:inline text-tactical-dim text-[11px]">
            [AI/ML • EMBEDDED]
          </span>
        </div>

        {/* Center: Real-Time Scroll Progress Indicator */}
        <div className="hidden md:flex items-center space-x-3 px-3 py-1 border border-tactical-border/70 bg-tactical-surface/60 text-[11px]">
          <span className="text-tactical-dim">SCR_DEPTH:</span>
          <div className="w-16 h-1 bg-tactical-base border border-tactical-border overflow-hidden">
            <div
              className="h-full bg-tactical-amber transition-all duration-150"
              style={{ width: `${scrollPercent}%` }}
            />
          </div>
          <span className="text-tactical-amber font-bold w-9 text-right">
            {scrollPercent}%
          </span>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-4">
          <nav className="hidden lg:flex items-center space-x-5 text-[11px] uppercase tracking-wider text-tactical-muted">
            <a href="#v2-projects" className="hover:text-tactical-amber transition-colors">
              // WORK
            </a>
            <a href="#v2-arsenal" className="hover:text-tactical-amber transition-colors">
              // RADAR
            </a>
            <a href="#v2-timeline" className="hover:text-tactical-amber transition-colors">
              // DOSSIER
            </a>
            <a href="#v2-contact" className="hover:text-tactical-amber transition-colors">
              // TRANSMIT
            </a>
          </nav>

          <button
            onClick={onToggleTerminal}
            className={`flex items-center space-x-1.5 px-3 py-1.5 border transition-all text-[11px] uppercase tracking-wider font-semibold ${
              terminalOpen
                ? "border-tactical-green bg-tactical-green/15 text-tactical-green"
                : "border-tactical-border hover:border-tactical-amber text-tactical-ivory bg-tactical-surface"
            }`}
            title="Toggle Terminal Emulator (Ctrl + ~)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI</span>
          </button>
        </div>

      </div>
    </header>
  );
}
