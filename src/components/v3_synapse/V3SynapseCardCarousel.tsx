"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu, Eye, Layers, ChevronLeft, ChevronRight, Activity } from "lucide-react";

export default function V3SynapseCardCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselItems = [
    {
      id: "gap-measurement",
      title: "OM90 Metrology Engine",
      subtitle: "Autonomous Sub-Millimeter Vision",
      category: "Computer Vision & Optical Metrology",
      description: "Sub-millimeter edge vision inspection system with strict 0.1 mm tolerance on Raspberry Pi & PiCamera v2/v3.",
      stats: [
        { label: "Accuracy", value: "0.1 mm" },
        { label: "Throughput", value: "30 FPS" },
        { label: "Hardware", value: "Raspberry Pi" }
      ],
      color: "from-purple-900/60 to-indigo-900/60",
      accent: "text-purple-400",
      border: "border-purple-500/40",
      tag: "FLAGSHIP METROLOGY",
      liveUrl: "https://om90.in/devices/elongation-detector"
    },
    {
      id: "emo-rex",
      title: "EMO-REX Companion Bot",
      subtitle: "Affective Robotic System",
      category: "Embedded Robotics & Emotion AI",
      description: "Autonomous companion robot featuring real-time facial expression analysis, multi-servo kinetic articulation, and low-latency audio processing on edge compute.",
      stats: [
        { label: "Inference", value: "38 ms" },
        { label: "Actuation", value: "6 DOF" },
        { label: "Controller", value: "ESP32 & Pi" }
      ],
      color: "from-fuchsia-950/60 to-purple-950/60",
      accent: "text-fuchsia-400",
      border: "border-fuchsia-500/40",
      tag: "EMBEDDED ROBOTICS"
    },
    {
      id: "rasi-smart-panel",
      title: "Rasi Smart Panel",
      subtitle: "Industrial Telemetry & SCADA",
      category: "Industrial Automation",
      description: "Mission-critical industrial monitoring dashboard bridging ABB AC500 PLC registers with real-time operational telemetry across Modbus TCP/IP.",
      stats: [
        { label: "PLC Target", value: "ABB AC500" },
        { label: "Protocol", value: "Modbus TCP" },
        { label: "Uptime", value: "99.98%" }
      ],
      color: "from-indigo-950/60 to-blue-950/60",
      accent: "text-indigo-400",
      border: "border-indigo-500/40",
      tag: "INDUSTRIAL SCADA"
    },
    {
      id: "bldc-controller",
      title: "Precision BLDC ESC",
      subtitle: "Field-Oriented Motor Control",
      category: "Power Electronics & Firmware",
      description: "Sensorless BLDC motor speed controller driven by STM32/ESP32 PWM feedback algorithms with back-EMF zero-crossing detection.",
      stats: [
        { label: "Peak Current", value: "30A" },
        { label: "PWM Freq", value: "24 kHz" },
        { label: "Firmware", value: "C / C++" }
      ],
      color: "from-violet-950/60 to-indigo-950/60",
      accent: "text-violet-400",
      border: "border-violet-500/40",
      tag: "FIRMWARE & HARDWARE"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <section id="kinetic-carousel" className="relative py-28 bg-[#07070d] overflow-hidden border-t border-purple-900/20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header (matching the 3D rotating carousel section in reference video) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-[11px] font-mono text-purple-300 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>3D KINETIC PERSPECTIVE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Intelligence that <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">deploys</span>.
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-xl font-light">
              From sub-millimeter metrology to high-reliability PLC industrial networks, explore flagship systems engineered for deterministic real-world performance.
            </p>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Project"
              className="w-12 h-12 rounded-full border border-purple-500/30 bg-[#0c0c16] hover:bg-purple-900/40 text-white flex items-center justify-center transition-all shadow-lg active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Project"
              className="w-12 h-12 rounded-full border border-purple-500/30 bg-[#0c0c16] hover:bg-purple-900/40 text-white flex items-center justify-center transition-all shadow-lg active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Kinetic Perspective Cards Container */}
        <div className="relative min-h-[460px] flex items-center justify-center perspective-[1200px]">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {carouselItems.map((item, index) => {
              const isCurrent = index === activeIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative rounded-2xl bg-gradient-to-b ${item.color} p-6 border ${
                    isCurrent ? `${item.border} shadow-[0_0_40px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/40` : "border-white/10 hover:border-purple-500/30"
                  } backdrop-blur-xl flex flex-col justify-between transition-all duration-300 cursor-pointer min-h-[420px] hover:-translate-y-2`}
                >
                  {/* Top Meta */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider font-semibold bg-black/60 border border-white/10 text-neutral-300">
                        {item.tag}
                      </span>
                      <Link
                        href={`/projects/${item.id}`}
                        className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-purple-500 text-white flex items-center justify-center transition-colors"
                        title="View System Breakdown"
                      >
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-xs text-purple-300 font-mono mt-1 mb-4">
                      {item.subtitle}
                    </div>

                    <p className="text-xs text-neutral-300/80 leading-relaxed font-light mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Metrics & Bottom Specs */}
                  <div>
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 bg-black/40 rounded-lg px-2.5 mb-4">
                      {item.stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="text-[9px] font-mono text-neutral-400 uppercase">
                            {stat.label}
                          </div>
                          <div className={`text-xs font-mono font-bold ${item.accent} mt-0.5 truncate`}>
                            {stat.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href={`/projects/${item.id}`}
                        className="text-xs font-mono text-purple-300 hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
                      >
                        Deep Dive &rarr;
                      </Link>

                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <Activity className="w-3 h-3" /> Live Link
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
