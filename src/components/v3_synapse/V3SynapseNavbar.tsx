"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FileText, Sparkles, ArrowRight } from "lucide-react";
import VersionSwitcher from "@/components/VersionSwitcher";

const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

interface V3SynapseNavbarProps {
  onOpenResume: () => void;
}

export default function V3SynapseNavbar({ onOpenResume }: V3SynapseNavbarProps) {
  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
      {/* Brand logo pill */}
      <div className="pointer-events-auto flex items-center space-x-3 bg-[#0a0a14]/85 backdrop-blur-2xl border border-purple-500/25 px-3 py-1.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-purple-400/60 shadow-[0_0_12px_rgba(168,85,247,0.6)]">
          <Image
            src={`${basePath}/kabish.jpg`}
            alt="Kabish Sridar"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col pr-2">
          <span className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
            KABISH SRIDAR
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping inline-block" />
          </span>
          <span className="text-[9px] uppercase tracking-widest text-purple-300/80 font-mono">
            Edge AI & Metrology
          </span>
        </div>
      </div>

      {/* Floating Center Navigation Pill (matching reference video top pill) */}
      <nav className="pointer-events-auto hidden md:flex items-center space-x-1 bg-[#0a0a14]/85 backdrop-blur-2xl border border-purple-500/25 px-4 py-2 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)] text-xs font-medium text-neutral-300">
        <span className="text-purple-400 font-bold mr-2 text-sm">✦</span>
        <a
          href="#stage-hero"
          className="px-3 py-1 rounded-full hover:text-white hover:bg-purple-500/20 transition-all"
        >
          Surfaces
        </a>
        <a
          href="#stage-carousel"
          className="px-3 py-1 rounded-full hover:text-white hover:bg-purple-500/20 transition-all"
        >
          Neural
        </a>
        <a
          href="#stage-statement"
          className="px-3 py-1 rounded-full hover:text-white hover:bg-purple-500/20 transition-all"
        >
          Studio
        </a>
        <a
          href="#stage-work"
          className="px-3 py-1 rounded-full hover:text-white hover:bg-purple-500/20 transition-all"
        >
          Changelog
        </a>
        <a
          href="#stage-cta"
          className="px-3 py-1 rounded-full hover:text-white hover:bg-purple-500/20 transition-all"
        >
          Deploy
        </a>
      </nav>

      {/* Right Controls: Version Switcher + Resume Action */}
      <div className="pointer-events-auto flex items-center space-x-3">
        <div className="hidden sm:block">
          <VersionSwitcher />
        </div>

        <button
          onClick={onOpenResume}
          className="flex items-center space-x-1.5 bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_24px_rgba(255,255,255,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <FileText className="w-3.5 h-3.5 text-neutral-900" />
          <span>Get Started</span>
        </button>
      </div>
    </header>
  );
}
