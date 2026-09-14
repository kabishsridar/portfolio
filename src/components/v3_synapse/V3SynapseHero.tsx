"use client";

import { ArrowRight, Sparkles, Activity, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function V3SynapseHero({ onOpenResume }: { onOpenResume: () => void }) {
  const [measurement, setMeasurement] = useState(0.098);
  const [fps, setFps] = useState(29.8);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time 0.1 mm precision metrology fluctuation
      const delta = (Math.random() - 0.5) * 0.004;
      setMeasurement(prev => +(0.100 + delta).toFixed(3));
      setFps(+(29.5 + Math.random() * 0.8).toFixed(1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="vision" className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center justify-center bg-[#07070d]">
      {/* Background ambient radial gradients matching portfolio_idea_1.webm */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-purple-600/30 via-indigo-700/20 to-transparent blur-[140px] rounded-full" />
        <div className="absolute bottom-[5%] left-[10%] w-[450px] h-[450px] bg-purple-900/15 blur-[130px] rounded-full" />
        <div className="absolute top-[35%] right-[5%] w-[400px] h-[400px] bg-indigo-900/20 blur-[130px] rounded-full" />
        {/* Subtle cyber grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        {/* Top badge */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
            <span className="text-xs font-mono font-medium text-purple-200 uppercase tracking-wider">
              Autonomous Metrology & Edge Architecture
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Engineering vision systems{" "}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
              beyond the visible limit.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300/80 max-w-2xl mx-auto leading-relaxed font-light">
            I am <strong className="text-white font-medium">Kabish Sridar</strong>, specializing in sub-millimeter computer vision, industrial PLC telemetry, and embedded perception on Raspberry Pi and ESP32.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#selected-work"
              className="px-6 py-3 rounded-full bg-white text-neutral-950 font-bold text-sm hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2 group"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onOpenResume}
              className="px-6 py-3 rounded-full bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 font-semibold text-sm transition-all backdrop-blur-md"
            >
              Inspect Technical Resume
            </button>
          </div>
        </div>

        {/* Floating Glassmorphism Hero Stage (Matching portfolio_idea_1.webm Live Console Card) */}
        <div className="relative max-w-5xl mx-auto rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-purple-500/30 p-1 backdrop-blur-2xl shadow-[0_20px_70px_rgba(76,29,149,0.3)] transition-transform duration-500 hover:scale-[1.005]">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20 bg-[#0c0c16]/80 rounded-t-xl">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-3 font-mono text-xs text-neutral-400">
                OM90_TELEMETRY_ENGINE // V3.4_ACTIVE
              </span>
            </div>
            <div className="flex items-center space-x-3 text-xs font-mono text-purple-300/80">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                CALIBRATED
              </span>
              <span className="hidden sm:inline text-neutral-500">|</span>
              <span className="hidden sm:inline">0.1 mm METROLOGY</span>
            </div>
          </div>

          {/* Hero Stage Content Grid */}
          <div className="p-6 md:p-8 bg-[#090913]/90 rounded-b-xl grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Live Vision Feed / Optical Telemetry Viewport */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-black/60 rounded-xl p-5 border border-purple-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span className="font-mono text-xs text-purple-200 font-semibold tracking-wide">
                    OPTICAL GAP MONITOR
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  LIVE PiCamera v2/v3
                </span>
              </div>

              {/* Synthetic Laser Metrology Target Visual */}
              <div className="relative h-48 sm:h-56 rounded-lg bg-[#05050a] border border-purple-500/20 flex items-center justify-center overflow-hidden">
                {/* Horizontal Laser Line */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_12px_#f472b6] animate-pulse" />
                
                {/* Target reticle */}
                <div className="w-28 h-28 rounded-full border border-purple-500/30 flex items-center justify-center relative">
                  <div className="w-16 h-16 rounded-full border border-dashed border-indigo-400/50 flex items-center justify-center animate-spin" style={{ animationDuration: '18s' }}>
                    <div className="w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_8px_#e879f9]" />
                  </div>
                  {/* Caliper measurement ticks */}
                  <span className="absolute -top-3 text-[9px] font-mono text-purple-300">0.0 mm</span>
                  <span className="absolute -bottom-3 text-[9px] font-mono text-purple-300">0.1 mm Tol</span>
                </div>

                {/* Realtime Measurement Overlay */}
                <div className="absolute bottom-3 left-3 bg-black/80 px-3 py-1.5 rounded border border-purple-500/30 backdrop-blur-md">
                  <div className="text-[10px] font-mono text-neutral-400">DETECTED OFFSET</div>
                  <div className="text-sm font-mono font-bold text-emerald-400">
                    {measurement} mm <span className="text-[10px] text-neutral-400 font-normal">(±0.005)</span>
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1.5 rounded border border-purple-500/30 backdrop-blur-md text-right">
                  <div className="text-[10px] font-mono text-neutral-400">EDGE PIPELINE</div>
                  <div className="text-sm font-mono font-bold text-purple-300">
                    {fps} FPS
                  </div>
                </div>
              </div>

              {/* Edge Metrology description link */}
              <div className="mt-4 pt-3 border-t border-purple-500/10 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Custom Metrology Pipeline for OM90</span>
                <a
                  href="https://om90.in/devices/elongation-detector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 font-mono inline-flex items-center gap-1 font-semibold"
                >
                  om90.in/devices/elongation-detector &rarr;
                </a>
              </div>
            </div>

            {/* Right: Technical Stack Matrix & Metrics */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {/* Card 1: Core Precision Metrics */}
              <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-4">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold block mb-3">
                  Calibration Spec
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/40 p-2.5 rounded-lg border border-purple-500/10">
                    <div className="text-[10px] font-mono text-neutral-400">TOLERANCE</div>
                    <div className="text-xl font-mono font-extrabold text-white">0.1 mm</div>
                    <div className="text-[9px] text-purple-300/70 mt-0.5">Strict Industrial Standard</div>
                  </div>
                  <div className="bg-black/40 p-2.5 rounded-lg border border-purple-500/10">
                    <div className="text-[10px] font-mono text-neutral-400">STREAM RATE</div>
                    <div className="text-xl font-mono font-extrabold text-white">30 FPS</div>
                    <div className="text-[9px] text-purple-300/70 mt-0.5">PiCamera v2/v3 Native</div>
                  </div>
                </div>
              </div>

              {/* Card 2: Production Hardware */}
              <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-4">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-semibold block mb-2">
                  Verified Hardware Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["Raspberry Pi", "PiCamera v2/v3", "ESP32 SoC", "ABB AC500 PLC", "Ethernet / Modbus"].map((hw) => (
                    <span
                      key={hw}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-black/50 text-neutral-200 border border-indigo-500/20"
                    >
                      {hw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 3: Award Distinction */}
              <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-purple-300 uppercase tracking-wider">
                    Datathon Recognition
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    MVP Finalist — KYC Datathon 2.0
                  </div>
                  <div className="text-xs text-neutral-400">
                    Computer Vision & Intelligent Analysis
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
