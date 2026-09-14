"use client";

import { useState, useEffect } from "react";
import VersionSwitcher from "@/components/VersionSwitcher";
import ResumeModal from "@/components/ResumeModal";
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
  const [resumeOpen, setResumeOpen] = useState(false);
  const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === "~" || e.key === "`")) || (e.key === "`" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName))) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="relative min-h-screen bg-transparent text-tactical-ivory">
      {/* Persistent Full-Page Three.js 3D Camera Flight Canvas - Orange Torus Knot Centerpiece */}
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

      {/* V3 Hero Section - No background, transparent */}
      <V3Hero
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Resume PDF Popup Viewer Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        resumeUrl={`${basePath}/Kabish_Sridar_Resume.pdf`}
      />

      {/* V3 Horizontal Project Showcase - Sleek sliding */}
      <V3HorizontalShowcase />

      {/* V3 Hardware Lab Benchmarks */}
      <V3HardwareLab />

      {/* V3 Radar Skills Matrix */}
      <V3RadarMatrix />

      {/* V3 Academic Dossier */}
      <V3AcademicDossier />

      {/* V3 Transmission Portal Contact */}
      <V3TransmissionPortal />

      {/* V3 Footer */}
      <V3Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Global Terminal Overlay */}
      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Floating Terminal Toggle Hint */}
      <div className="fixed bottom-6 right-6 z-30 hidden md:block">
        <button
          onClick={() => setTerminalOpen(!terminalOpen)}
          className="group flex items-center gap-2 px-3 py-2 bg-tactical-surface/80 backdrop-blur-xl border border-tactical-border text-tactical-ivory text-xs font-mono-tech rounded transition-all hover:border-tactical-amber hover:bg-tactical-amber/10"
          title="Terminal (Ctrl+`)"
        >
          <TerminalIcon className="w-4 h-4 text-tactical-amber" />
          <span>TERMINAL</span>
          <kbd className="px-1.5 py-0.5 bg-tactical-base border border-tactical-border text-[9px] font-mono rounded">Ctrl+`</kbd>
        </button>
      </div>
    </main>
  );
}