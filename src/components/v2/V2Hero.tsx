"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, Download, Terminal, Award, Cpu, ShieldCheck, Sparkles } from "lucide-react";
import V2CyberneticCore from "./V2CyberneticCore";
import V2TiltCard from "./V2TiltCard";
import Hero3DModel from "../Hero3DModel";
import { profileData } from "@/data/profile";

interface V2HeroProps {
  onOpenTerminal: () => void;
}

export default function V2Hero({ onOpenTerminal }: V2HeroProps) {
  return (
    <section
      id="v2-hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-tactical-base border-b border-tactical-border"
    >
      {/* 3D Cybernetic Wireframe Lattice Core reacting to scroll */}
      <V2CyberneticCore />

      {/* Micro-grid & Ambient Glow */}
      <div className="absolute inset-0 bg-tactical-grid opacity-20 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-tactical-base/60 to-tactical-base pointer-events-none z-10" />

      {/* Main Container */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left 8 Cols: Identity & Kinetic Headline */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Version 2 Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 border border-tactical-green/50 bg-tactical-green/10 text-tactical-green font-mono-tech text-xs tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>KINETIC ARCHITECTURE // V2 CYBERNETICS</span>
            </div>

            {/* Brutalist Hero Title */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-tactical-ivory leading-none uppercase">
                KABISH <span className="text-tactical-amber">SRIDAR</span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-tactical-muted font-mono-tech tracking-tight pt-2">
                AI/ML ENGINEER &amp; EMBEDDED SILICON ARCHITECT
              </p>
            </div>

            {/* Narrative Positioning */}
            <p className="text-base sm:text-lg text-tactical-ivory/90 max-w-2xl font-medium leading-relaxed">
              Engineering deterministic intelligence across deep neural models, real-time edge vision pipelines, and industrial PLC hardware. Co-author of IEEE medical IoT research; builder of automated factory feed batching logic.
            </p>

            {/* Action Triggers */}
            <div className="pt-2 flex flex-wrap items-center gap-4 font-mono-tech text-xs">
              <a
                href="#v2-projects"
                className="flex items-center space-x-2 px-6 py-4 bg-tactical-green text-tactical-base font-extrabold tracking-wider uppercase hover:bg-tactical-ivory transition-all shadow-[0_0_25px_rgba(0,255,102,0.35)]"
              >
                <span>SCROLL PROJECTS // 06</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>

              <button
                onClick={onOpenTerminal}
                className="flex items-center space-x-2 px-5 py-4 border border-tactical-border bg-tactical-surface hover:border-tactical-amber hover:text-tactical-amber transition-all tracking-wider uppercase text-tactical-ivory font-bold"
              >
                <Terminal className="w-4 h-4 text-tactical-amber" />
                <span>TERMINAL [^~]</span>
              </button>

              <a
                href="/Kabish_Sridar_Resume.pdf"
                download="Kabish_Sridar_Resume.pdf"
                className="flex items-center space-x-2 px-4 py-4 border border-tactical-border/70 text-tactical-muted hover:text-tactical-ivory hover:border-tactical-border transition-colors tracking-wider uppercase"
              >
                <Download className="w-4 h-4" />
                <span>DOSSIER</span>
              </a>
            </div>

            {/* Quick Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-3 font-mono-tech text-[11px] text-tactical-muted">
              <span className="px-3 py-1 border border-tactical-border/80 bg-tactical-surface/60 text-tactical-ivory">
                SRMIST B.TECH (AI &amp; ML) &apos;28
              </span>
              <span className="px-3 py-1 border border-tactical-border/80 bg-tactical-surface/60 text-tactical-amber">
                IEEE CONFERENCE AUTHOR
              </span>
              <span className="px-3 py-1 border border-tactical-border/80 bg-tactical-surface/60 text-tactical-green">
                KYC DATATHON 2.0 FINALIST
              </span>
            </div>

          </div>

          {/* Right 4 Cols: 3D Tilt Identity Capsule */}
          <div className="lg:col-span-4">
            <V2TiltCard
              tiltMaxAngle={14}
              glareOpacity={0.25}
              className="border border-tactical-border/90 bg-tactical-surface/85 backdrop-blur-xl p-5 shadow-[0_0_30px_rgba(0,0,0,0.7)]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-tactical-border font-mono-tech text-[10px] text-tactical-muted">
                <span className="text-tactical-green font-bold">SILICON CAPSULE // 0x4B</span>
                <span className="text-tactical-amber">10.79°N, 78.70°E</span>
              </div>

              {/* Interactive 3D Model Frame */}
              <div className="my-2">
                <Hero3DModel initialMode="cyber" />
              </div>

              {/* Kinetic Telemetry Table */}
              <div className="space-y-1.5 font-mono-tech text-[11px] pt-1 border-t border-tactical-border">
                <div className="flex justify-between py-1 border-b border-tactical-border/40">
                  <span className="text-tactical-dim">DISCIPLINE</span>
                  <span className="text-tactical-ivory font-semibold">AI/ML + Embedded Silicon</span>
                </div>
                <div className="flex justify-between py-1 border-b border-tactical-border/40">
                  <span className="text-tactical-dim">BATCH AUTOMATION</span>
                  <span className="text-tactical-amber font-semibold">±0.1% Rasi Feed PLC</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-tactical-dim">LOCATION</span>
                  <span className="text-tactical-green font-semibold">Namakkal / Trichy, India</span>
                </div>
              </div>
            </V2TiltCard>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Telegraph */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 border-t border-tactical-border/70 pt-4 flex items-center justify-between font-mono-tech text-[11px] text-tactical-muted">
        <div className="flex items-center space-x-4">
          <span className="text-tactical-amber">[SYS_MODE: KINETIC_V2]</span>
          <span className="hidden sm:inline text-tactical-dim">THREE.JS ROTATIONAL LATTICE</span>
        </div>
        <div className="flex items-center space-x-2 text-tactical-ivory">
          <span>SCROLL TO UNLOCK PROJECT STACK</span>
          <ArrowDown className="w-3.5 h-3.5 text-tactical-green animate-bounce" />
        </div>
      </div>
    </section>
  );
}
