"use client";

import { useState, useEffect } from "react";
import VersionSwitcher from "@/components/VersionSwitcher";
import V3FullPageCanvas from "@/components/v3/V3FullPageCanvas";
import V3LaserCircuit from "@/components/v3/V3LaserCircuit";
import V3ScrollProgressHUD from "@/components/v3/V3ScrollProgressHUD";
import V3Navbar from "@/components/v3/V3Navbar";
import V3Hero from "@/components/v3/V3Hero";
import V3HorizontalShowcase from "@/components/v3/V3HorizontalShowcase";
import V3HardwareLab from "@/components/v3/V3HardwareLab";
import V3RadarMatrix from "@/components/v3/V3RadarMatrix";
import V3AcademicDossier from "@/components/v3/V3AcademicDossier";
import V3TransmissionPortal from "@/components/v3/V3TransmissionPortal";
import V3Footer from "@/components/v3/V3Footer";
import Terminal from "@/components/Terminal";
import { Terminal as TerminalIcon } from "lucide-react";

export default function Home() {
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
      {/* Persistent Full-Page Three.js 3D Camera Flight Canvas */}
      <V3FullPageCanvas />

      {/* Scroll-Drawn Glowing PCB Laser Trace Line */}
      <V3LaserCircuit />

      {/* Floating Scroll Progress Telemetry HUD */}
      <V3ScrollProgressHUD />

      {/* Floating 3-Way Version Switcher */}
      <VersionSwitcher />

      {/* V3 Kinetic Navbar */}
      <V3Navbar
        onToggleTerminal={() => setTerminalOpen((prev) => !prev)}
        terminalOpen={terminalOpen}
      />

      {/* V3 Cinematic Hero with Counting Metrics, Photo Capsule & 3D Holographic Avatar */}
      <V3Hero onOpenTerminal={() => setTerminalOpen(true)} />

      {/* V3 Pinned Horizontal Super-Scroll Schematics Gallery */}
      <V3HorizontalShowcase />

      {/* V3 Interactive Hardware Telemetry Cockpit & Digital Storage Oscilloscope */}
      <V3HardwareLab />

      {/* V3 Hardware & AI Skill Radar */}
      <V3RadarMatrix />

      {/* V3 Academic Curriculum, IEEE Publication & Credentials Dossier */}
      <V3AcademicDossier />

      {/* V3 Direct Packet Transmission Portal */}
      <V3TransmissionPortal />

      {/* V3 Cybernetic Footer */}
      <V3Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Interactive Slide-Out Terminal Emulator */}
      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Floating HUD Terminal Pill Trigger */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setTerminalOpen((prev) => !prev)}
          className={`flex items-center space-x-2 px-3.5 py-2 border font-mono-tech text-xs tracking-wider transition-all duration-200 shadow-xl ${
            terminalOpen
              ? "bg-blue-500/20 text-blue-400 border-blue-500 font-bold"
              : "bg-tactical-surface/90 text-tactical-ivory border-tactical-border hover:border-blue-500 hover:text-blue-400 backdrop-blur-md"
          }`}
          title="Toggle Hardware Terminal (Ctrl + ~)"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <TerminalIcon className="w-4 h-4 text-blue-400" />
          <span className="font-bold uppercase">CLI TERMINAL</span>
          <span className="text-[10px] text-tactical-dim hidden sm:inline">[^~]</span>
        </button>
      </div>
    </main>
  );
}
