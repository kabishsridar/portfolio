"use client";

import { Sparkles, CheckCircle2, Shield, Award, Cpu, Eye } from "lucide-react";

export default function V3SynapseStatement() {
  const metrics = [
    {
      value: "0.1 mm",
      label: "Metrology Tolerance",
      description: "Sub-millimeter optical precision calibrated on OM90 elongation detectors."
    },
    {
      value: "30 FPS",
      label: "Continuous Vision Stream",
      description: "Real-time edge compute processing via native PiCamera v2/v3 pipelines."
    },
    {
      value: "MVP Finalist",
      label: "KYC Datathon 2.0",
      description: "Recognized for high-impact computer vision and intelligent data processing."
    },
    {
      value: "8.7 CGPA",
      label: "Academic Rigor",
      description: "SRM Institute of Science and Technology in Computer Science & Engineering."
    }
  ];

  return (
    <section id="metrology" className="relative py-32 bg-[#06060b] overflow-hidden border-t border-purple-900/20">
      {/* Background radial violet glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-purple-800/15 via-indigo-700/10 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10 text-center">
        {/* Central glowing sparkle star motif from portfolio_idea_1.webm */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-8 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-400 p-[1.5px] shadow-[0_0_50px_rgba(168,85,247,0.7)] flex items-center justify-center relative transition-transform duration-500 hover:scale-110">
          <div className="w-full h-full bg-[#090913] rounded-full flex items-center justify-center">
            {/* 4-point glowing star SVG */}
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-purple-300 drop-shadow-[0_0_10px_rgba(216,180,254,0.9)] animate-pulse"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
        </div>

        {/* Big Impact Statement ("Beyond every limit" from reference video) */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Engineered for deterministic precision.{" "}
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
            Built beyond every limit.
          </span>
        </h2>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
          Bridging physical hardware constraints with mathematical clarity. From embedded C/C++ firmware loops to real-time industrial optical metrology, reliability is non-negotiable.
        </p>

        {/* 4 Key Verified Metrics Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-purple-500/20 backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
              
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white mb-2 group-hover:text-purple-300 transition-colors">
                {metric.value}
              </div>
              <div className="text-xs font-mono font-semibold text-purple-300/90 uppercase tracking-wider mb-2">
                {metric.label}
              </div>
              <div className="text-xs text-neutral-400 font-light leading-relaxed">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
