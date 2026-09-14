"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText, Cpu, ArrowUpRight, Sparkles } from "lucide-react";
import VersionSwitcher from "@/components/VersionSwitcher";

interface V3SynapseNavbarProps {
  onOpenResume: () => void;
}

export default function V3SynapseNavbar({ onOpenResume }: V3SynapseNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
      {/* Brand logo pill */}
      <div className="pointer-events-auto flex items-center space-x-3 bg-[#0a0a14]/80 backdrop-blur-xl border border-purple-500/20 px-4 py-2 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-fuchsia-400 p-0.5 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.6)]">
          <div className="w-full h-full bg-[#0a0a14] rounded-full flex items-center justify-center">
            <span className="text-xs font-black text-white font-mono tracking-tighter">KS</span>
          </div>
        </div>
        <div className="flex flex-col pr-2">
          <span className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
            KABISH SRIDAR
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping inline-block" />
          </span>
          <span className="text-[9px] uppercase tracking-widest text-purple-300/70 font-mono">
            Edge AI & Metrology
          </span>
        </div>
      </div>

      {/* Floating Center Navigation Pill (inspired by reference video: Surfaces, Neural, Metrology, Dossier) */}
      <nav className="pointer-events-auto hidden md:flex items-center space-x-1 bg-[#0a0a14]/80 backdrop-blur-xl border border-purple-500/20 px-3 py-1.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-xs font-medium text-neutral-300">
        <a
          href="#vision"
          className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-purple-500/15 transition-all"
        >
          Vision
        </a>
        <a
          href="#kinetic-carousel"
          className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-purple-500/15 transition-all"
        >
          Systems
        </a>
        <a
          href="#metrology"
          className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-purple-500/15 transition-all"
        >
          Metrology
        </a>
        <a
          href="#selected-work"
          className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-purple-500/15 transition-all"
        >
          Selected Work
        </a>
        <a
          href="#credentials"
          className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-purple-500/15 transition-all"
        >
          Credentials
        </a>
      </nav>

      {/* Right Controls: Version Switcher + Resume Action */}
      <div className="pointer-events-auto flex items-center space-x-3">
        <div className="hidden sm:block">
          <VersionSwitcher />
        </div>

        <button
          onClick={onOpenResume}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_28px_rgba(147,51,234,0.8)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <FileText className="w-3.5 h-3.5 text-purple-200" />
          <span>Resume</span>
        </button>
      </div>
    </header>
  );
}
