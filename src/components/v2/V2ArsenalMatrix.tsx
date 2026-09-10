"use client";

import { useState } from "react";
import { Cpu, Server, Terminal, Sparkles, Activity, ShieldCheck } from "lucide-react";
import V2TiltCard from "./V2TiltCard";

export default function V2ArsenalMatrix() {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const domains = [
    {
      name: "Computer Vision & Edge AI",
      tag: "DOMAIN_01",
      icon: Cpu,
      color: "text-tactical-amber",
      skills: [
        { title: "OpenCV (Sub-pixel & Homography)", val: 95, benchmark: "18 FPS metrology stream" },
        { title: "YOLOv8 Object Detection", val: 92, benchmark: "Real-time edge inference" },
        { title: "PyTorch & Deep Neural Models", val: 88, benchmark: "CRNN, DeepFace & CNNs" },
        { title: "Image Binarization (Sauvola)", val: 94, benchmark: "Adaptive OCR preprocessing" },
      ],
    },
    {
      name: "Embedded Silicon & Industrial PLC",
      tag: "DOMAIN_02",
      icon: Server,
      color: "text-tactical-green",
      skills: [
        { title: "ABB AC500 PLC (Structured Text)", val: 90, benchmark: "10ms cyclic scan task" },
        { title: "Modbus TCP/IP Protocol", val: 88, benchmark: "Industrial SCADA register bus" },
        { title: "C / C++ Embedded Programming", val: 92, benchmark: "Hardware timers & interrupts" },
        { title: "Raspberry Pi 4 & PiCamera", val: 95, benchmark: "Headless Linux edge rigs" },
      ],
    },
    {
      name: "Systems, Backend & Infrastructure",
      tag: "DOMAIN_03",
      icon: Terminal,
      color: "text-tactical-ivory",
      skills: [
        { title: "Linux Systems & Kali/Debian", val: 94, benchmark: "V4L2 hardware passthrough" },
        { title: "Docker & Container Architecture", val: 90, benchmark: "Multi-stage zero-drift builds" },
        { title: "Redis In-Memory Caching", val: 88, benchmark: "40% latency reduction" },
        { title: "FastAPI & PostgreSQL / SQLite", val: 92, benchmark: "Dual-tier secure database vault" },
      ],
    },
  ];

  const current = domains[activeCategory];

  return (
    <section id="v2-arsenal" className="relative w-full bg-tactical-base py-24 border-b border-tactical-border overflow-hidden">
      {/* Background micro-grid */}
      <div className="absolute inset-0 bg-tactical-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-tactical-border pb-6 font-mono-tech">
          <div>
            <div className="flex items-center space-x-2 text-xs text-tactical-amber tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STACK 03 // TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-tactical-ivory tracking-tight uppercase">
              HARDWARE &amp; SOFTWARE <span className="text-tactical-amber">RADAR</span>
            </h2>
          </div>
          <p className="text-xs text-tactical-muted max-w-md">
            Quantifiable engineering benchmarks across edge computing, industrial automation, and deep neural vision stacks.
          </p>
        </div>

        {/* Domain Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-tech text-xs">
          {domains.map((dom, i) => {
            const Icon = dom.icon;
            const isSelected = activeCategory === i;
            return (
              <button
                key={dom.name}
                onClick={() => setActiveCategory(i)}
                className={`p-5 border transition-all text-left flex items-start justify-between ${
                  isSelected
                    ? "border-tactical-green bg-tactical-surface shadow-[0_0_20px_rgba(0,255,102,0.15)]"
                    : "border-tactical-border bg-tactical-surface/50 text-tactical-muted hover:text-tactical-ivory"
                }`}
              >
                <div>
                  <span className="text-[10px] text-tactical-dim block uppercase">
                    {dom.tag}
                  </span>
                  <span className={`text-sm font-bold block pt-1 ${isSelected ? "text-tactical-ivory" : ""}`}>
                    {dom.name}
                  </span>
                </div>
                <Icon className={`w-5 h-5 ${isSelected ? dom.color : "text-tactical-dim"}`} />
              </button>
            );
          })}
        </div>

        {/* Interactive Benchmark Tilt Card */}
        <V2TiltCard
          tiltMaxAngle={8}
          glareOpacity={0.2}
          className="border border-tactical-border bg-tactical-surface/90 backdrop-blur-xl p-6 sm:p-8 font-mono-tech shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
        >
          <div className="flex flex-wrap items-center justify-between border-b border-tactical-border pb-4 gap-4 text-xs">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 bg-tactical-green inline-block animate-pulse" />
              <span className="text-tactical-ivory font-bold uppercase tracking-wider">
                SUBSYSTEM: {current.name}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-[11px] text-tactical-dim">
              <span>BENCHMARK AUDITED</span>
              <span className="text-tactical-amber">[LEVEL 03 CLEARANCE]</span>
            </div>
          </div>

          {/* Skill Proficiency Gauges */}
          <div className="space-y-6 pt-6">
            {current.skills.map((skill) => (
              <div key={skill.title} className="space-y-2">
                <div className="flex flex-wrap justify-between items-baseline text-xs gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-tactical-ivory font-bold">{skill.title}</span>
                    <span className="text-tactical-dim hidden sm:inline">//</span>
                    <span className="text-tactical-muted text-[11px] hidden sm:inline">
                      {skill.benchmark}
                    </span>
                  </div>
                  <span className="text-tactical-green font-bold">
                    {skill.val}% EFFICIENCY
                  </span>
                </div>

                <div className="h-2 w-full bg-tactical-base border border-tactical-border overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-tactical-border-bright via-tactical-green to-tactical-green transition-all duration-500"
                    style={{ width: `${skill.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-tactical-border flex flex-wrap items-center justify-between text-[11px] text-tactical-dim">
            <span>QUERY TERMINAL WITH &apos;skills&apos; FOR COMPLETE INVENTORY</span>
            <span className="text-tactical-green">ALL SYSTEMS REPRODUCIBLE</span>
          </div>
        </V2TiltCard>

      </div>
    </section>
  );
}
