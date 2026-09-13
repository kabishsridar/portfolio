"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, CheckCircle2, GitBranch, Sparkles, Zap, Sliders, Play, Eye } from "lucide-react";
import { projects, Project } from "@/data/projects";
import V2ProjectModal from "../v2/V2ProjectModal";
import V3TiltCard from "./V3TiltCard";
import V3TextDecrypt from "./V3TextDecrypt";
import V3EmotionSim from "./V3EmotionSim";

export default function V3HorizontalShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSim, setActiveSim] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 120;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      const st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${getScrollAmount() * 1.4}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      return () => {
        st.kill();
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="v3-projects"
      ref={containerRef}
      className="relative w-full min-h-screen bg-transparent border-b border-tactical-border overflow-hidden flex flex-col justify-between py-12 md:py-0"
    >
      {/* Top Header Strip with Decrypt Effect */}
      <div className="relative z-20 px-4 sm:px-8 md:pl-24 py-4 border-b border-tactical-border bg-transparent backdrop-blur-md flex items-center justify-between font-mono-tech text-xs">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 bg-blue-500 inline-block animate-ping" />
          <span className="font-black tracking-widest text-tactical-ivory uppercase">
            SUPER-SCROLL 02 // <V3TextDecrypt text="HORIZONTAL SCHEMATICS RAIL" />
          </span>
        </div>
        <div className="text-blue-400 text-[11px] hidden sm:block">
          [VERTICAL SCROLL CONVERTED TO MULTI-LAYER 3D TILT PARALLAX]
        </div>
      </div>

      {/* Horizontal Rail Track */}
      <div className="relative z-10 flex-1 flex items-center my-auto overflow-hidden py-8">
        <div
          ref={trackRef}
          className="flex items-stretch space-x-8 px-8 md:pl-28 shrink-0 font-mono-tech"
        >
          {projects.map((p, idx) => (
            <V3TiltCard
              key={p.id}
              maxTilt={8}
              className="relative w-[340px] sm:w-[480px] md:w-[560px] border border-tactical-border/50 bg-transparent backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:border-tactical-amber/50 transition-colors duration-300"
            >
              {/* Giant Background Parallax Index Number */}
              <span className="absolute -top-6 -right-2 text-7xl sm:text-9xl font-black text-tactical-border/20 select-none pointer-events-none group-hover:text-tactical-amber/15 transition-colors">
                0{idx + 1}
              </span>

              {/* Project Category & Status */}
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-tactical-border/30 pb-3">
                  <span className="text-blue-400 font-bold tracking-wider">
                    {p.code}
                  </span>
                  <div className="flex items-center gap-2">
                    {p.id === "emo-rex" && (
                      <button
                        onClick={() => setActiveSim(activeSim === p.id ? null : p.id)}
                        className={`px-2 py-0.5 border text-[9px] font-bold uppercase transition-all flex items-center gap-1 ${
                          activeSim === p.id
                            ? "border-tactical-green bg-tactical-green/20 text-tactical-green shadow-[0_0_8px_#00ff66]"
                            : "border-tactical-border bg-transparent text-tactical-muted hover:text-tactical-ivory"
                        }`}
                      >
                        <Eye className="w-2.5 h-2.5" />
                        <span>{activeSim === p.id ? "VIEW SPECS" : "LIVE SIM"}</span>
                      </button>
                    )}
                    <span className="px-2 py-0.5 border border-tactical-green/40 bg-tactical-green/10 text-tactical-green text-[10px] font-bold">
                      {p.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-tactical-ivory tracking-tight">
                  {p.title}
                </h3>

                <p className="text-sm font-semibold text-blue-400">
                  {p.tagline}
                </p>

                {/* Conditional View: Live Sim vs Narrative */}
                {activeSim === p.id ? (
                  <div className="py-2">
                    <V3EmotionSim />
                  </div>
                ) : (
                  <p className="text-xs text-tactical-muted leading-relaxed line-clamp-3">
                    {p.summary}
                  </p>
                )}
              </div>

              {/* Benchmark Result Box */}
              <div className="relative z-10 my-3 p-3.5 border border-tactical-amber/50 bg-tactical-amber/10 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-tactical-amber uppercase block font-semibold">
                    BENCHMARK TELEMETRY
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-tactical-ivory">
                    {p.keyMetric}
                  </span>
                </div>
                <span className="text-right text-[11px] text-tactical-muted max-w-[180px]">
                  {p.keyMetricLabel}
                </span>
              </div>

              {/* 3-Step Pipeline Flow */}
              <div className="relative z-10 space-y-1.5 text-[10px] border border-tactical-border/30 bg-transparent p-3">
                <div className="flex items-center justify-between text-tactical-dim pb-1 border-b border-tactical-border/30">
                  <span className="flex items-center gap-1 text-tactical-green font-bold">
                    <GitBranch className="w-3 h-3" /> PIPELINE
                  </span>
                  <span>100% REPRODUCIBLE</span>
                </div>
                <div className="text-tactical-ivory truncate">
                  <span className="text-tactical-dim">INPUT:</span> {p.architecture.input}
                </div>
                <div className="text-tactical-ivory truncate">
                  <span className="text-blue-400">CORE:</span> {p.architecture.processing}
                </div>
                <div className="text-tactical-ivory truncate">
                  <span className="text-tactical-green">TELEMETRY:</span> {p.architecture.output}
                </div>
              </div>

              {/* Action Button & Stack Tags */}
              <div className="relative z-10 pt-4 flex items-center justify-between border-t border-tactical-border/30">
                <div className="flex flex-wrap gap-1 max-w-[240px]">
                  {p.stack.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="px-1.5 py-0.5 border border-tactical-border/30 bg-transparent text-[9px] text-tactical-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(p)}
                  className="flex items-center space-x-1 px-3 py-2 bg-blue-500 text-tactical-base font-black text-xs uppercase hover:bg-tactical-ivory transition-all shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                >
                  <span>INSPECT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </V3TiltCard>
          ))}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="relative z-20 px-4 sm:px-8 md:pl-24 py-3 border-t border-tactical-border bg-transparent flex items-center justify-between font-mono-tech text-[10px] text-tactical-muted">
        <div className="flex items-center space-x-3">
          <span className="text-blue-400 font-bold">[RAIL: 06 SCHEMATICS]</span>
          <span className="hidden sm:inline">SCROLL VERTICALLY TO SCRUB HORIZONTAL RAIL // HOVER FOR 3D PERSPECTIVE</span>
        </div>
        <div className="text-tactical-dim">
          CLICK ANY &apos;INSPECT&apos; BUTTON FOR ARCHITECTURAL BLUEPRINT
        </div>
      </div>

      {/* Modal Drawer */}
      <V2ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}