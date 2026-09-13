"use client";

import { useState } from "react";
import { Cpu, Server, Activity, ShieldCheck, Zap, Radio, Power, Terminal, Sliders } from "lucide-react";
import V3CounterMetric from "./V3CounterMetric";
import V3Oscilloscope from "./V3Oscilloscope";
import V3TiltCard from "./V3TiltCard";
import V3TextDecrypt from "./V3TextDecrypt";

export default function V3HardwareLab() {
  const [activeUnit, setActiveUnit] = useState<number>(0);
  const [interlockActive, setInterlockActive] = useState(true);
  const [clockFrequency, setClockFrequency] = useState<"16MHz" | "240MHz" | "1.5GHz">("240MHz");

  const units = [
    {
      name: "ABB AC500 PLC (PM573)",
      class: "INDUSTRIAL SILICON",
      accent: "text-tactical-amber",
      border: "border-tactical-amber",
      status: "ONLINE // 10ms SCAN",
      metrics: [
        { label: "Execution Standard", val: "IEC 61131-3 (ST)" },
        { label: "Modbus TCP/IP Bus", val: "192.168.1.10:502" },
        { label: "SMPS DC Voltage", val: "24.18 V Regulated" },
        { label: "I/O Task Scan", val: "10.0 ms Deterministic" },
      ],
      log: "Cyclic scan completed. Rasi Feeds Silo 1-3 batch gates synchronized. Hardware watchdog: NOMINAL.",
    },
    {
      name: "Raspberry Pi 4 Model B (8GB)",
      class: "EDGE VISION RIG",
      accent: "text-tactical-green",
      border: "border-tactical-green",
      status: "HEADLESS LINUX // 42°C",
      metrics: [
        { label: "V4L2 Device Passthrough", val: "/dev/video0 (PiCam v2)" },
        { label: "Metrology Stream", val: "18 FPS (±0.04mm)" },
        { label: "Core SoC Temp", val: "42.6°C Ambient" },
        { label: "Memory Footprint", val: "142 MB Alpine Slim" },
      ],
      log: "PiCamera macro telephoto lens calibrated. Homography matrix locked. Edge gap clearance: 0.84 mm.",
    },
    {
      name: "ESP32-WROOM-32 (Dual Core)",
      class: "MICROCONTROLLER",
      accent: "text-blue-400",
      border: "border-blue-500",
      status: "FREERTOS // 240MHz",
      metrics: [
        { label: "Core 0 Task", val: "Sub-ms IR Sensor Interrupt" },
        { label: "Core 1 Task", val: "Wi-Fi & Cloud Telemetry" },
        { label: "Actuation Reaction", val: "<500ms Solenoid Clamp" },
        { label: "Clock Frequency", val: "240 MHz Dual-Core" },
      ],
      log: "Dual-core FreeRTOS scheduler armed. Non-contact optical IR refraction verified. Cloud channel ready.",
    },
    {
      name: "Edge Tensor Neural Engine",
      class: "ONNX / TENSORRT",
      accent: "text-purple-400",
      border: "border-purple-500",
      status: "GPU ACCELERATED",
      metrics: [
        { label: "Emotion Inference", val: "30.2 FPS (DeepFace)" },
        { label: "Thali Calorie mAP", val: "93.8% (YOLOv8)" },
        { label: "Cursive OCR Acc", val: "92.4% (CRNN + CTC)" },
        { label: "Redis State Cache", val: "1.2 ms State Lookup" },
      ],
      log: "Neural tensor execution threads optimal. In-memory Redis state layer reducing DB read cycles by 40%.",
    },
  ];

  const current = units[activeUnit];

  return (
    <section id="v3-hardware" className="relative w-full bg-transparent py-24 border-b border-tactical-border overflow-hidden font-mono-tech">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-10 md:pl-24 space-y-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-tactical-border pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs text-blue-400 tracking-widest uppercase mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>LABORATORY 03 // EMBEDDED SILICON DIAGNOSTICS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-tactical-ivory tracking-tight uppercase">
              HARDWARE <span className="text-blue-400"><V3TextDecrypt text="TELEMETRY" /></span> & OSCILLOSCOPE
            </h2>
          </div>

          {/* Clock Speed Multiplier Switcher */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-tactical-dim uppercase font-bold text-[10px]">CLOCK BUS:</span>
            {(["16MHz", "240MHz", "1.5GHz"] as const).map((clk) => (
              <button
                key={clk}
                onClick={() => setClockFrequency(clk)}
                className={`px-2.5 py-1 border text-[10px] font-bold uppercase transition-all ${
                  clockFrequency === clk
                    ? "border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                    : "border-tactical-border bg-transparent text-tactical-muted hover:text-tactical-ivory"
                }`}
              >
                {clk}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Unit Interactive Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {units.map((unit, idx) => {
            const isSelected = activeUnit === idx;
            return (
              <button
                key={unit.name}
                onClick={() => setActiveUnit(idx)}
                className={`p-4 border transition-all text-left flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? "border-blue-500 bg-transparent shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                    : "border-tactical-border bg-transparent text-tactical-muted hover:text-tactical-ivory"
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-tactical-dim uppercase">{unit.class}</span>
                  <span className="w-2 h-2 rounded-full bg-tactical-green animate-pulse" />
                </div>
                <div>
                  <span className="font-bold text-sm text-tactical-ivory block">
                    {unit.name}
                  </span>
                  <span className={`text-[10px] block pt-1 font-semibold ${unit.accent}`}>
                    {unit.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 2-Column Split: Telemetry Specs & Real-Time Canvas Oscilloscope */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left 6 Cols: Unit Specs & Diagnostic Buffer */}
          <div className="lg:col-span-6 space-y-6">
            <V3TiltCard className="border border-tactical-border/50 bg-transparent backdrop-blur-xl p-6 sm:p-7 space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.8)] group hover:border-tactical-amber/50 transition-colors">
              <div className="flex flex-wrap items-center justify-between border-b border-tactical-border pb-4 gap-4 text-xs">
                <div className="flex items-center space-x-3">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span className="font-black text-tactical-ivory uppercase tracking-wider text-sm">
                    UNIT SPEC: {current.name}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-[11px]">
                  <button
                    onClick={() => setInterlockActive(!interlockActive)}
                    className={`flex items-center space-x-1.5 px-3 py-1 border transition-all uppercase text-[10px] font-bold ${
                      interlockActive
                        ? "border-tactical-green bg-tactical-green/15 text-tactical-green"
                        : "border-red-500 bg-red-500/15 text-red-400 animate-pulse"
                    }`}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>SAFETY: {interlockActive ? "ARMED" : "BYPASSED"}</span>
                  </button>
                </div>
              </div>

              {/* 4 Metric Readouts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.metrics.map((m, i) => (
                  <div key={i} className="p-3.5 border border-tactical-border/70 bg-transparent space-y-1">
                    <span className="text-[10px] text-tactical-dim block uppercase">{m.label}</span>
                    <span className="text-sm font-bold text-tactical-ivory block">{m.val}</span>
                  </div>
                ))}
              </div>

              {/* Real-Time Hardware Diagnostic Log */}
              <div className="p-4 border border-tactical-border/80 bg-transparent space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] text-tactical-dim pb-1 border-b border-tactical-border/50">
                  <span className="flex items-center gap-1.5 text-tactical-amber font-bold">
                    <Terminal className="w-3.5 h-3.5" /> LIVE BUS DIAGNOSTIC BUFFER
                  </span>
                  <span className="text-tactical-green">LATENCY: &lt;1.2ms</span>
                </div>
                <p className="text-tactical-ivory/90 font-mono text-[11px] leading-relaxed">
                  &gt; {current.log}
                </p>
              </div>
            </V3TiltCard>
          </div>

          {/* Right 6 Cols: Live Interactive Digital Storage Oscilloscope */}
          <div className="lg:col-span-6">
            <V3Oscilloscope />
          </div>

        </div>

      </div>
    </section>
  );
}