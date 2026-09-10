"use client";

import { useState, useEffect } from "react";
import VersionSwitcher from "@/components/VersionSwitcher";
import V2Navbar from "@/components/v2/V2Navbar";
import V2Hero from "@/components/v2/V2Hero";
import V2Marquee from "@/components/v2/V2Marquee";
import V2ProjectStack from "@/components/v2/V2ProjectStack";
import V2ArsenalMatrix from "@/components/v2/V2ArsenalMatrix";
import V2Timeline from "@/components/v2/V2Timeline";
import V2Contact from "@/components/v2/V2Contact";
import V2Footer from "@/components/v2/V2Footer";
import Terminal from "@/components/Terminal";
import { Terminal as TerminalIcon } from "lucide-react";

export default function V2Page() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "~" || e.key === "`")) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="relative min-h-screen bg-tactical-base text-tactical-ivory">
      {/* Floating HUD Version Switcher */}
      <VersionSwitcher />

      {/* V2 Minimalist Kinetic Navbar */}
      <V2Navbar
        onToggleTerminal={() => setTerminalOpen((prev) => !prev)}
        terminalOpen={terminalOpen}
      />

      {/* V2 Hero with Scroll-Reactive 3D Wireframe Lattice */}
      <V2Hero onOpenTerminal={() => setTerminalOpen(true)} />

      {/* V2 Velocity-Skew Infinite Marquee */}
      <V2Marquee />

      {/* V2 Pinned Stacked Project Schematics */}
      <V2ProjectStack />

      {/* V2 Hardware & AI Skill Radar */}
      <V2ArsenalMatrix />

      {/* V2 Kinetic Dossier & Research Timeline */}
      <V2Timeline />

      {/* V2 Direct Packet Transmission Portal */}
      <V2Contact />

      {/* V2 Kinetic Footer */}
      <V2Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Slide-out Terminal Emulator */}
      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Floating HUD Terminal Trigger (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setTerminalOpen((prev) => !prev)}
          className={`flex items-center space-x-2 px-3.5 py-2 border font-mono-tech text-xs tracking-wider transition-all duration-200 shadow-xl ${
            terminalOpen
              ? "bg-tactical-green/20 text-tactical-green border-tactical-green font-bold"
              : "bg-tactical-surface/90 text-tactical-ivory border-tactical-border hover:border-tactical-green hover:text-tactical-green backdrop-blur-md"
          }`}
          title="Toggle Hardware Terminal (Ctrl + ~)"
        >
          <span className="w-2 h-2 rounded-full bg-tactical-green animate-pulse" />
          <TerminalIcon className="w-4 h-4" />
          <span className="font-bold uppercase">CLI TERMINAL</span>
          <span className="text-[10px] text-tactical-dim hidden sm:inline">[^~]</span>
        </button>
      </div>
    </main>
  );
}
