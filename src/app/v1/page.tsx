"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import VersionSwitcher from "@/components/VersionSwitcher";
import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/ProjectShowcase";
import TechMatrix from "@/components/TechMatrix";
import Credentials from "@/components/Credentials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";
import { Terminal as TerminalIcon } from "lucide-react";

export default function V1Page() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Global hotkey listener: Ctrl + ~ or Ctrl + `
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
      {/* Floating Version Switcher */}
      <VersionSwitcher />

      {/* Top HUD Navigation */}
      <Navbar
        onToggleTerminal={() => setTerminalOpen((prev) => !prev)}
        terminalOpen={terminalOpen}
      />

      {/* Main Sections */}
      <Hero onOpenTerminal={() => setTerminalOpen(true)} />
      <ProjectShowcase />
      <TechMatrix />
      <Credentials />
      <ContactSection />

      {/* Industrial Cybernetics Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Interactive Slide-Out Hardware Terminal */}
      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Floating HUD Terminal Pill Trigger (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setTerminalOpen((prev) => !prev)}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-none border font-mono-tech text-xs tracking-wider transition-all duration-200 shadow-lg ${
            terminalOpen
              ? "bg-tactical-green/15 text-tactical-green border-tactical-green"
              : "bg-tactical-surface/90 text-tactical-ivory border-tactical-border hover:border-tactical-amber hover:text-tactical-amber backdrop-blur-md"
          }`}
          title="Toggle Hardware Terminal (Ctrl + ~)"
        >
          <span className="w-2 h-2 rounded-full bg-tactical-amber animate-pulse" />
          <TerminalIcon className="w-4 h-4" />
          <span className="font-semibold uppercase">CLI TERMINAL</span>
          <span className="text-[10px] text-tactical-dim hidden sm:inline">[^~]</span>
        </button>
      </div>
    </main>
  );
}
