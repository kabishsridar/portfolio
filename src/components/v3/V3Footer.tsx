"use client";

import { ArrowUp, Terminal, Zap } from "lucide-react";

export default function V3Footer({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-transparent border-t border-tactical-border py-12 font-mono-tech text-xs text-tactical-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-10 md:pl-24 space-y-6">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-tactical-border/60 pb-6">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-blue-500 inline-block" />
            <span className="font-black text-tactical-ivory uppercase tracking-wider text-sm">
              KABISH SRIDAR // V3 HYPER-SCROLL
            </span>
            <span className="text-tactical-dim hidden md:inline">
              SRMIST B.TECH (AI & ML)
            </span>
          </div>

          <div className="flex items-center space-x-5 text-[11px]">
            <button
              onClick={onOpenTerminal}
              className="flex items-center space-x-1.5 text-blue-400 hover:underline font-semibold"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>TERMINAL [CTRL + ~]</span>
            </button>
            <span className="text-tactical-dim">|</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-blue-400 hover:text-tactical-ivory transition-colors font-bold"
            >
              <span>WARP TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-tactical-dim">
          <p>
            ENGINEERED WITH 5-STAGE THREE.JS 3D SCROLL CAMERA FLIGHT, PINNED HORIZONTAL RAIL, AND PCB LASER TRACE.
          </p>
          <div className="flex items-center space-x-3">
            <span className="text-blue-400 font-semibold">VERSION: 3.0.0-HYPER</span>
            <span>COORDINATES: [10.7905° N, 78.7047° E]</span>
          </div>
        </div>

      </div>
    </footer>
  );
}