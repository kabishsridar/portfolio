"use client";

import { useState } from "react";
import { Cpu, Terminal, Layers, Server, Shield, Activity } from "lucide-react";

interface SkillCategory {
  title: string;
  categoryCode: string;
  icon: typeof Cpu;
  accent: string;
  skills: Array<{ name: string; level: number; note: string }>;
}

export default function TechMatrix() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const categories: SkillCategory[] = [
    {
      title: "Vision & Edge Intelligence",
      categoryCode: "DOMAIN // 01",
      icon: Cpu,
      accent: "text-tactical-amber",
      skills: [
        { name: "OpenCV", level: 95, note: "Sub-pixel contours, homography & optical metrology" },
        { name: "YOLOv8", level: 90, note: "Real-time edge inference & ONNX runtime" },
        { name: "PyTorch & DeepFace", level: 88, note: "Facial vector tracking & lightweight models" },
        { name: "TensorFlow", level: 82, note: "CNN architectures & classification pipelines" },
        { name: "Image Preprocessing", level: 92, note: "Adaptive CLAHE, dual-Sobel & perspective transforms" },
      ],
    },
    {
      title: "Embedded & Industrial Silicon",
      categoryCode: "DOMAIN // 02",
      icon: Server,
      accent: "text-tactical-green",
      skills: [
        { name: "C / C++", level: 92, note: "Sub-millisecond interrupts, FreeRTOS & hardware registers" },
        { name: "ABB AC500 PLC", level: 88, note: "IEC 61131-3 Structured Text & Automation Builder" },
        { name: "ESP32 & Arduino", level: 94, note: "Dual-core FreeRTOS task partition & sensor arrays" },
        { name: "Modbus TCP/IP", level: 85, note: "Industrial bus communication & SCADA telemetry" },
        { name: "Raspberry Pi 4", level: 95, note: "Linux GPIO, PiCamera v2 & headless edge rigs" },
      ],
    },
    {
      title: "Systems, Backend & DevOps",
      categoryCode: "DOMAIN // 03",
      icon: Terminal,
      accent: "text-tactical-ivory",
      skills: [
        { name: "Linux & Bash", level: 94, note: "Kali, Debian, V4L2 device mounting & automation" },
        { name: "Docker & Compose", level: 90, note: "Multi-stage builds, device passthrough & zero drift" },
        { name: "Redis Caching", level: 88, note: "In-memory key-value cache cutting DB latency 40%" },
        { name: "PostgreSQL & SQLite", level: 92, note: "Dual-tier persistence pattern & ACID guarantees" },
        { name: "FastAPI & Python", level: 90, note: "Async ASGI event loops & microservices" },
      ],
    },
  ];

  const current = categories[activeTab];

  return (
    <section id="arsenal" className="relative w-full bg-tactical-base border-b border-tactical-border py-20 overflow-hidden">
      {/* Background micro-grid */}
      <div className="absolute inset-0 bg-tactical-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-tactical-border pb-6 font-mono-tech">
          <div>
            <div className="flex items-center space-x-2 text-xs text-tactical-amber tracking-widest uppercase mb-2">
              <span className="w-2 h-2 bg-tactical-amber inline-block" />
              <span>SECTION 03 // TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-tactical-ivory tracking-tight">
              HARDWARE &amp; SOFTWARE MATRIX
            </h2>
          </div>
          <div className="text-xs text-tactical-muted max-w-md">
            Verified engineering capabilities verified across embedded microcontrollers, industrial PLCs, computer vision pipelines, and resilient backend systems.
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono-tech text-xs">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveTab(idx)}
                className={`p-4 border transition-all text-left flex items-start justify-between ${
                  isActive
                    ? "border-tactical-amber bg-tactical-surface shadow-[0_0_15px_rgba(255,85,0,0.15)]"
                    : "border-tactical-border bg-tactical-surface/50 hover:border-tactical-border-bright text-tactical-muted hover:text-tactical-ivory"
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[10px] text-tactical-dim block">
                    {cat.categoryCode}
                  </span>
                  <span
                    className={`font-bold text-sm block ${
                      isActive ? "text-tactical-ivory" : "text-tactical-muted"
                    }`}
                  >
                    {cat.title}
                  </span>
                </div>
                <IconComponent
                  className={`w-5 h-5 ${
                    isActive ? cat.accent : "text-tactical-dim"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Tactical Telemetry Diagnostic Panel */}
        <div className="tactical-crosshair border border-tactical-border bg-tactical-surface/90 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-tactical-border pb-4 font-mono-tech text-xs">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 bg-tactical-green inline-block animate-pulse" />
              <span className="text-tactical-ivory font-bold uppercase tracking-wider">
                SUBSYSTEM: {current.title}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-tactical-dim text-[11px]">
              <span>CALIBRATED BENCHMARK</span>
              <span className="text-tactical-amber">[LEVEL 03 CLEARANCE]</span>
            </div>
          </div>

          {/* Skill Diagnostic Bars */}
          <div className="space-y-5 font-mono-tech">
            {current.skills.map((skill) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex flex-wrap justify-between items-baseline text-xs gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-tactical-ivory font-bold">{skill.name}</span>
                    <span className="text-tactical-dim hidden sm:inline">//</span>
                    <span className="text-tactical-muted text-[11px] hidden sm:inline">
                      {skill.note}
                    </span>
                  </div>
                  <span className="text-tactical-amber font-semibold">
                    {skill.level}% EFFICIENCY
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-tactical-base border border-tactical-border overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-tactical-border-bright via-tactical-amber to-tactical-amber transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <p className="text-[11px] text-tactical-dim sm:hidden">{skill.note}</p>
              </div>
            ))}
          </div>

          {/* Quick Command Prompt Hint */}
          <div className="pt-4 border-t border-tactical-border flex flex-wrap items-center justify-between text-[11px] font-mono-tech text-tactical-dim gap-2">
            <span>TO QUERY SPECIFIC COMMANDS: OPEN TERMINAL (CTRL + ~) AND TYPE 'skills'</span>
            <span className="text-tactical-green">DIAGNOSTIC: ALL SYSTEMS STABLE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
