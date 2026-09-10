"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Terminal, Download, ArrowDownRight, Cpu, Radio, Award } from "lucide-react";
import LidarCanvas from "./LidarCanvas";
import Hero3DModel from "./Hero3DModel";
import { profileData } from "@/data/profile";

interface HeroProps {
  onOpenTerminal: () => void;
}

export default function Hero({ onOpenTerminal }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (titleLettersRef.current.length > 0) {
      gsap.fromTo(
        titleLettersRef.current,
        {
          y: 40,
          opacity: 0,
          rotateX: -45,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.025,
          ease: "back.out(1.7)",
          delay: 0.2,
        }
      );
    }
  }, []);

  const heroName = "KABISH SRIDAR";

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-tactical-base border-b border-tactical-border"
    >
      {/* 3D Lidar Point-Cloud Canvas Background */}
      <LidarCanvas />

      {/* Subtle Micro-Grid & Gradient Vignette Overlay */}
      <div className="absolute inset-0 bg-tactical-grid opacity-25 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-tactical-base/70 via-transparent to-tactical-base pointer-events-none z-10" />

      {/* Top Telemetry Strip */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="border border-tactical-border bg-tactical-surface/80 backdrop-blur-sm p-3 sm:p-4 flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs text-tactical-muted">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-2 h-2 bg-tactical-amber animate-pulse" />
            <span className="text-tactical-ivory font-semibold tracking-wider">
              OPERATIONAL LAB:
            </span>
            <span>HARDWARE / COMPUTER VISION RIG</span>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <span>
              <strong className="text-tactical-ivory font-medium">SYS:</strong> SRMIST CSE (AI & ML)
            </span>
            <span className="text-tactical-dim">|</span>
            <span>
              <strong className="text-tactical-ivory font-medium">BATCH:</strong> 2025–2029
            </span>
            <span className="text-tactical-dim">|</span>
            <span className="text-tactical-green flex items-center gap-1">
              <Radio className="w-3 h-3 animate-beacon" />
              DEPLOYABLE
            </span>
          </div>
        </div>
      </div>

      {/* Main Center Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left 8 Cols: Display Titling & Positioning */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 border border-tactical-amber/40 bg-tactical-amber/5 text-tactical-amber font-mono-tech text-xs tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>AI/ML ENGINEER & EMBEDDED SYSTEMS BUILDER</span>
            </div>

            {/* Split Character Brutalist Header */}
            <div className="overflow-hidden">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-tactical-ivory leading-none flex flex-wrap">
                {heroName.split("").map((char, index) => (
                  <span
                    key={index}
                    ref={(el) => {
                      if (el) titleLettersRef.current[index] = el;
                    }}
                    className={`inline-block ${char === " " ? "w-4 sm:w-6" : ""}`}
                  >
                    {char}
                  </span>
                ))}
              </h1>
            </div>

            {/* Mission Statement */}
            <p className="text-lg sm:text-2xl text-tactical-ivory/90 font-medium max-w-3xl leading-relaxed">
              Bridging <span className="text-tactical-amber">deep neural networks</span> with{" "}
              <span className="text-tactical-green">edge silicon</span>, micro-controllers, and real-time computer vision pipelines.
            </p>

            <p className="text-sm sm:text-base text-tactical-muted max-w-2xl font-mono-tech leading-normal">
              Specialized in low-latency edge inference, sub-millimeter optical metrology, containerized CV deployment, and PLC industrial automation.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4 font-mono-tech text-xs">
              <a
                href="#projects"
                className="flex items-center space-x-2 px-6 py-3.5 bg-tactical-amber text-tactical-base font-bold tracking-wider uppercase hover:bg-tactical-ivory transition-all shadow-[0_0_20px_rgba(255,85,0,0.3)] group"
              >
                <span>INSPECT SCHEMATICS // 06</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={onOpenTerminal}
                className="flex items-center space-x-2 px-5 py-3.5 border border-tactical-border bg-tactical-surface hover:border-tactical-green hover:text-tactical-green transition-all tracking-wider uppercase text-tactical-ivory font-medium"
              >
                <Terminal className="w-4 h-4 text-tactical-green" />
                <span>TERMINAL [CTRL + ~]</span>
              </button>

              <a
                href={`${process.env.NODE_ENV === "production" ? "/portfolio" : ""}/Kabish_Sridar_Resume.pdf`}
                download="Kabish_Sridar_Resume.pdf"
                className="flex items-center space-x-2 px-4 py-3.5 border border-tactical-border/80 text-tactical-muted hover:text-tactical-ivory hover:border-tactical-border transition-colors tracking-wider uppercase"
                title="Download verified resume PDF"
              >
                <Download className="w-4 h-4" />
                <span>DOSSIER</span>
              </a>
            </div>

            {/* Credential Quick Callouts */}
            <div className="pt-4 flex flex-wrap items-center gap-3 font-mono-tech text-[11px] text-tactical-muted">
              <div className="flex items-center space-x-1.5 px-2.5 py-1 border border-tactical-border/60 bg-tactical-surface/50">
                <Award className="w-3.5 h-3.5 text-tactical-amber" />
                <span className="text-tactical-ivory">IEEE Conference Co-Author</span>
              </div>
              <div className="flex items-center space-x-1.5 px-2.5 py-1 border border-tactical-border/60 bg-tactical-surface/50">
                <Award className="w-3.5 h-3.5 text-tactical-green" />
                <span className="text-tactical-ivory">Noob Hackfest Finalist</span>
              </div>
              <div className="flex items-center space-x-1.5 px-2.5 py-1 border border-tactical-border/60 bg-tactical-surface/50">
                <Cpu className="w-3.5 h-3.5 text-tactical-amber" />
                <span>30 FPS Edge CV / Rasi PLC ST</span>
              </div>
            </div>

          </div>

          {/* Right 4 Cols: Tactical Dossier Card / Visual Identity */}
          <div className="lg:col-span-4">
            <div className="tactical-crosshair border border-tactical-border bg-tactical-surface/90 backdrop-blur-md p-5 space-y-4">
              
              {/* Card Header Telemetry */}
              <div className="flex items-center justify-between pb-3 border-b border-tactical-border font-mono-tech text-[10px] text-tactical-muted">
                <span className="text-tactical-amber font-bold">DOSSIER // 0x4B</span>
                <span className="text-tactical-green">[AUTHENTICATED]</span>
              </div>

              {/* Interactive 3D Model Viewport */}
              <Hero3DModel />

              {/* Telemetry Metrics Table */}
              <div className="space-y-2 font-mono-tech text-[11px]">
                <div className="flex justify-between py-1 border-b border-tactical-border/40">
                  <span className="text-tactical-muted">LOCATION</span>
                  <span className="text-tactical-ivory text-right">Namakkal / Trichy, IN</span>
                </div>
                <div className="flex justify-between py-1 border-b border-tactical-border/40">
                  <span className="text-tactical-muted">CORE DISCIPLINE</span>
                  <span className="text-tactical-amber text-right">AI/ML + Embedded Silicon</span>
                </div>
                <div className="flex justify-between py-1 border-b border-tactical-border/40">
                  <span className="text-tactical-muted">INFERENCE LATENCY</span>
                  <span className="text-tactical-green text-right">30 FPS Edge Stream</span>
                </div>
                <div className="flex justify-between py-1 border-b border-tactical-border/40">
                  <span className="text-tactical-muted">BATCH PRECISION</span>
                  <span className="text-tactical-green text-right">±0.1% Rasi Feeds PLC</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-tactical-muted">SECURITY LEVEL</span>
                  <span className="text-tactical-ivory text-right">{profileData.telemetry.securityClearance}</span>
                </div>
              </div>

              {/* Scanline subtle overlay */}
              <div className="pt-2 text-center">
                <span className="text-[9px] font-mono-tech text-tactical-dim tracking-widest uppercase">
                  TAMIL NADU, INDIA // SYSTEM ONLINE
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Crossbar Coordinate Telemetry */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="border-t border-tactical-border/80 pt-4 flex flex-wrap items-center justify-between text-[11px] font-mono-tech text-tactical-muted">
          <div className="flex items-center space-x-4">
            <span className="text-tactical-amber">[LAT: 10.7905° N]</span>
            <span className="text-tactical-amber">[LON: 78.7047° E]</span>
            <span className="hidden sm:inline text-tactical-dim">ELEVATION: 88M</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-tactical-dim">SCROLL TO INSPECT PROJECTS</span>
            <ArrowDownRight className="w-3.5 h-3.5 text-tactical-amber animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
