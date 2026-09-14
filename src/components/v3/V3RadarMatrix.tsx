"use client";

import { useState } from "react";
import { Cpu, Server, Terminal, Zap, Activity } from "lucide-react";
import V3CounterMetric from "./V3CounterMetric";
import V3TiltCard from "./V3TiltCard";

export default function V3RadarMatrix() {
  const [activeTab, setActiveTab] = useState(0);

  const domains = [
    {
      title: "Computer Vision & Edge Intelligence",
      tag: "RADAR_01",
      icon: Cpu,
      accent: "text-tactical-amber",
      skills: [
        { name: "OpenCV (Sub-pixel Contouring & Homography)", level: 95, detail: "18 FPS metrology stream" },
        { name: "YOLOv8 Edge Object Detection", level: 92, detail: "Real-time edge inference" },
        { name: "PyTorch & DeepFace Modeling", level: 88, detail: "Facial vector tracking" },
        { name: "Sauvola Adaptive Binarization", level: 94, detail: "Deep OCR preprocessing" },
      ],
    },
    {
      title: "Embedded Silicon & Industrial Automation",
      tag: "RADAR_02",
      icon: Server,
      accent: "text-tactical-green",
      skills: [
        { name: "ABB AC500 PLC (Structured Text)", level: 90, detail: "10ms cyclic scan task" },
        { name: "Modbus TCP/IP Protocol Bus", level: 88, detail: "SCADA register streaming" },
        { name: "C / C++ Real-time Embedded", level: 92, detail: "Sub-millisecond interrupts" },
        { name: "Raspberry Pi & PiCamera v2/v3", level: 95, detail: "0.1 mm edge metrology" },
      ],
    },
    {
      title: "Systems, Backend & Infrastructure",
      tag: "RADAR_03",
      icon: Terminal,
      accent: "text-blue-400",
      skills: [
        { name: "Linux Systems & Kernel Passthrough", level: 94, detail: "V4L2 hardware passthrough" },
        { name: "Docker Multi-stage Architecture", level: 90, detail: "100% environment parity" },
        { name: "In-Memory State Buffering", level: 88, detail: "High-throughput asynchronous ring" },
        { name: "FastAPI & Embedded SQLite", level: 92, detail: "Secure lightweight database vault" },
      ],
    },
  ];

  const current = domains[activeTab];

  return (
    <section id="v3-radar" className="relative w-full bg-transparent py-24 border-b border-tactical-border overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-10 md:pl-24 space-y-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-tactical-border pb-6 font-mono-tech">
          <div>
            <div className="flex items-center space-x-2 text-xs text-blue-400 tracking-widest uppercase mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>STACK 03 // 3D HARDWARE & AI RADAR</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-tactical-ivory tracking-tight uppercase">
              TECHNICAL <span className="text-blue-400">ARSENAL</span>
            </h2>
          </div>
          <p className="text-xs text-tactical-muted max-w-md">
            Audited engineering efficiencies across embedded silicon, programmable logic controllers, and edge neural networks.
          </p>
        </div>

        {/* Domain Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-tech text-xs">
          {domains.map((d, i) => {
            const Icon = d.icon;
            const isSelected = activeTab === i;
            return (
              <button
                key={d.tag}
                onClick={() => setActiveTab(i)}
                className={`p-5 border transition-all text-left flex items-start justify-between ${
                  isSelected
                    ? "border-blue-500 bg-transparent shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                    : "border-tactical-border bg-transparent text-tactical-muted hover:text-tactical-ivory"
                }`}
              >
                <div>
                  <span className="text-[10px] text-tactical-dim block uppercase">
                    {d.tag}
                  </span>
                  <span className={`text-sm font-bold block pt-1 ${isSelected ? "text-tactical-ivory" : ""}`}>
                    {d.title}
                  </span>
                </div>
                <Icon className={`w-5 h-5 ${isSelected ? d.accent : "text-tactical-dim"}`} />
              </button>
            );
          })}
        </div>

        {/* Skill Telemetry Meters - Inside Tilt Card */}
        <V3TiltCard className="border border-tactical-border/50 bg-transparent backdrop-blur-xl p-6 sm:p-8 font-mono-tech space-y-6 shadow-[0_15px_35px_rgba(0,0,0,0.8)] group hover:border-tactical-amber/50 transition-colors">
          <div className="flex flex-wrap items-center justify-between border-b border-tactical-border pb-3 text-xs">
            <span className="text-tactical-ivory font-bold uppercase flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              BENCHMARK DIAGNOSTIC: {current.title}
            </span>
            <span className="text-blue-400 text-[11px]">[ALL NODES ONLINE]</span>
          </div>

          <div className="space-y-6 pt-2">
            {current.skills.map((s) => (
              <div key={s.name} className="space-y-2">
                <div className="flex flex-wrap justify-between items-baseline text-xs gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-tactical-ivory font-bold">{s.name}</span>
                    <span className="text-tactical-dim hidden sm:inline">//</span>
                    <span className="text-tactical-muted text-[11px] hidden sm:inline">{s.detail}</span>
                  </div>
                  <span className="text-blue-400 font-bold text-sm">
                    <V3CounterMetric target={s.level} suffix="% EFFICIENCY" />
                  </span>
                </div>

                <div className="h-2.5 w-full bg-transparent border border-tactical-border overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-tactical-border via-blue-500 to-blue-400 transition-all duration-700 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-tactical-border flex flex-wrap items-center justify-between text-[11px] text-tactical-dim">
            <span>TYPE 'skills' IN TERMINAL EMULATOR FOR CLI SPECS</span>
            <span className="text-tactical-green">DETERMINISTIC VERIFICATION COMPLETE</span>
          </div>
        </V3TiltCard>

      </div>
    </section>
  );
}