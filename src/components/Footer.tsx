"use client";

import { ArrowUp, Terminal, Shield } from "lucide-react";

export default function Footer({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-tactical-base border-t border-tactical-border py-10 font-mono-tech text-xs text-tactical-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-tactical-border/60 pb-6">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 bg-tactical-amber inline-block" />
            <span className="font-bold text-tactical-ivory uppercase tracking-wider">
              KABISH SRIDAR // 0x4B
            </span>
            <span className="text-tactical-dim hidden md:inline">
              SRMIST B.TECH CSE (AI/ML)
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <button
              onClick={onOpenTerminal}
              className="flex items-center space-x-1.5 text-tactical-green hover:underline"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>TERMINAL [CTRL + ~]</span>
            </button>
            <span className="text-tactical-dim">|</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-tactical-muted hover:text-tactical-ivory transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-tactical-dim">
          <p>
            ENGINEERED &amp; DEPLOYED UNDER TACTICAL HARDWARE LABORATORY AESTHETIC.
          </p>
          <div className="flex items-center space-x-3">
            <span className="text-tactical-amber">SYS_BUILD: v2.4.0</span>
            <span>COORDINATES: [10.7905° N, 78.7047° E]</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
