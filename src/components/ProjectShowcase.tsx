"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Cpu,
  Layers,
  Activity,
  GitBranch,
  CheckCircle2,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Gauge,
  Zap,
  Utensils,
  FileText,
  Factory,
} from "lucide-react";
import { projects, Project } from "@/data/projects";

export default function ProjectShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const activeProject = projects[activeIdx];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    if (!trigger) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const totalProjects = projects.length;

      const st = ScrollTrigger.create({
        trigger: trigger,
        start: "top top",
        end: `+=${totalProjects * 800}`,
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIdx = Math.min(
            totalProjects - 1,
            Math.floor(progress * totalProjects)
          );
          setActiveIdx(newIdx);
        },
      });

      return () => {
        st.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={triggerRef}
      className="relative min-h-screen w-full bg-tactical-base border-b border-tactical-border py-16 lg:py-0 lg:h-screen lg:flex lg:flex-col lg:justify-between overflow-hidden"
    >
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 bg-tactical-grid opacity-20 pointer-events-none" />

      {/* Top Header HUD Strip */}
      <div className="relative z-10 border-b border-tactical-border bg-tactical-surface/90 backdrop-blur-sm px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-tactical-amber inline-block" />
            <span className="font-bold tracking-widest uppercase text-tactical-ivory">
              SECTION 02 // HARDWARE &amp; AI SCHEMATICS
            </span>
            <span className="text-tactical-dim hidden md:inline">
              [PINNED TELEMETRY VIEWER]
            </span>
          </div>

          {/* Project Index Selector & Nav */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-1 mr-4">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActiveIdx(i)}
                  className={`px-2.5 py-1 text-[11px] transition-all font-mono-tech border ${
                    activeIdx === i
                      ? "bg-tactical-amber text-tactical-base font-bold border-tactical-amber shadow-[0_0_10px_rgba(255,85,0,0.4)]"
                      : "bg-tactical-surface text-tactical-muted hover:text-tactical-ivory border-tactical-border"
                  }`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : projects.length - 1))}
                className="p-1.5 border border-tactical-border bg-tactical-surface text-tactical-muted hover:text-tactical-amber hover:border-tactical-amber transition-colors"
                title="Previous Schematic"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono text-[11px] text-tactical-amber">
                {activeIdx + 1} / {projects.length}
              </span>
              <button
                onClick={() => setActiveIdx((prev) => (prev < projects.length - 1 ? prev + 1 : 0))}
                className="p-1.5 border border-tactical-border bg-tactical-surface text-tactical-muted hover:text-tactical-amber hover:border-tactical-amber transition-colors"
                title="Next Schematic"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual-Column Schematics Stage */}
      <div
        ref={containerRef}
        className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 my-auto flex-1 flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column (6 Cols): Specifications & Architecture */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            
            {/* Top Project Header */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3 font-mono-tech text-xs">
                <span className="text-tactical-amber font-bold tracking-wider">
                  {activeProject.code}
                </span>
                <span className="text-tactical-dim">|</span>
                <span className="text-tactical-muted uppercase">
                  {activeProject.category}
                </span>
                <span className="text-tactical-green px-2 py-0.5 border border-tactical-green/40 bg-tactical-green/5 text-[10px]">
                  {activeProject.status}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-tactical-ivory tracking-tight">
                {activeProject.title}
              </h2>

              <p className="text-sm sm:text-base text-tactical-ivory/90 font-medium">
                {activeProject.tagline}
              </p>

              <p className="text-xs sm:text-sm text-tactical-muted leading-relaxed font-mono-tech">
                {activeProject.summary}
              </p>
            </div>

            {/* Key Metric Callout */}
            <div className="border border-tactical-amber/50 bg-tactical-amber/10 p-3.5 flex items-center justify-between font-mono-tech">
              <div>
                <span className="text-[10px] text-tactical-amber uppercase block tracking-wider font-semibold">
                  BENCHMARK TELEMETRY
                </span>
                <span className="text-xl sm:text-2xl font-black text-tactical-ivory">
                  {activeProject.keyMetric}
                </span>
              </div>
              <div className="text-right max-w-xs text-[11px] text-tactical-ivory/80">
                {activeProject.keyMetricLabel}
              </div>
            </div>

            {/* Architecture Node Diagram */}
            <div className="border border-tactical-border bg-tactical-surface/90 p-3 space-y-2 font-mono-tech text-xs">
              <div className="flex items-center justify-between text-[10px] text-tactical-muted pb-1 border-b border-tactical-border">
                <span className="text-tactical-amber flex items-center gap-1">
                  <GitBranch className="w-3 h-3" /> ARCHITECTURE FLOW
                </span>
                <span className="text-tactical-dim">DETERMINISTIC PIPELINE</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] pt-1">
                <div className="p-2 border border-tactical-border/60 bg-tactical-base">
                  <span className="text-tactical-dim block text-[9px]">01 // INPUT</span>
                  <span className="text-tactical-ivory font-medium line-clamp-2">
                    {activeProject.architecture.input}
                  </span>
                </div>
                <div className="p-2 border border-tactical-border/60 bg-tactical-base">
                  <span className="text-tactical-amber block text-[9px]">02 // COMPUTE</span>
                  <span className="text-tactical-ivory font-medium line-clamp-2">
                    {activeProject.architecture.processing}
                  </span>
                </div>
                <div className="p-2 border border-tactical-border/60 bg-tactical-base">
                  <span className="text-tactical-green block text-[9px]">03 // STORAGE/ACT</span>
                  <span className="text-tactical-ivory font-medium line-clamp-2">
                    {activeProject.architecture.hardwareOrStorage}
                  </span>
                </div>
                <div className="p-2 border border-tactical-border/60 bg-tactical-base">
                  <span className="text-tactical-dim block text-[9px]">04 // OUTPUT</span>
                  <span className="text-tactical-ivory font-medium line-clamp-2">
                    {activeProject.architecture.output}
                  </span>
                </div>
              </div>
            </div>

            {/* Technical Specs & Stack Badges */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-tech">
                {activeProject.specs.slice(0, 4).map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex flex-col p-2 border border-tactical-border/60 bg-tactical-surface/50"
                  >
                    <span className="text-[9px] text-tactical-muted uppercase">
                      {spec.label}
                    </span>
                    <span className="text-tactical-ivory font-semibold truncate">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stack Pill Tags */}
              <div className="flex flex-wrap gap-1.5 font-mono-tech text-[10px]">
                {activeProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 border border-tactical-border bg-tactical-surface text-tactical-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (6 Cols): Interactive Visual Simulator */}
          <div className="lg:col-span-6 flex flex-col">
            <div
              className="project-viewport relative w-full h-full min-h-[380px] sm:min-h-[460px] border border-tactical-border bg-tactical-surface/90 flex flex-col justify-between overflow-hidden group tactical-crosshair"
              data-cursor="loupe"
            >
              {/* Viewport Top Bar */}
              <div className="relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-tactical-border bg-tactical-base/90 font-mono-tech text-[11px]">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-tactical-amber animate-ping" />
                  <span className="text-tactical-ivory font-bold uppercase">
                    SIMULATOR: {activeProject.simulationType.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-tactical-dim text-[10px]">
                  <span>INTERACTIVE HUD</span>
                  <Maximize2 className="w-3.5 h-3.5 text-tactical-muted" />
                </div>
              </div>

              {/* Interactive Dynamic Simulation Canvas based on Project */}
              <div className="relative z-10 flex-1 p-5 sm:p-6 flex items-center justify-center">
                {activeProject.simulationType === "emotion" && (
                  <EmotionSimulator />
                )}
                {activeProject.simulationType === "rasi" && (
                  <RasiFeedPLCSimulator />
                )}
                {activeProject.simulationType === "thali" && (
                  <ThaliCalorieSimulator />
                )}
                {activeProject.simulationType === "ocr" && (
                  <HandwritingOCRSimulator />
                )}
                {activeProject.simulationType === "profiler" && (
                  <ProfilerSimulator />
                )}
                {activeProject.simulationType === "kyc" && (
                  <KycSimulator />
                )}
              </div>

              {/* Viewport Bottom Engineering Highlights */}
              <div className="relative z-10 p-3.5 border-t border-tactical-border bg-tactical-base/95 font-mono-tech text-[11px] space-y-1.5">
                <div className="flex items-center space-x-2 text-[10px] text-tactical-amber font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>ENGINEERING HIGHLIGHT:</span>
                </div>
                <p className="text-tactical-ivory/90 text-xs leading-normal">
                  {activeProject.highlights[0]}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Progress Bar Strip */}
      <div className="relative z-10 border-t border-tactical-border/70 bg-tactical-base px-4 sm:px-8 py-2 font-mono-tech text-[10px] text-tactical-muted flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span>PROGRESS:</span>
          <div className="w-36 h-1.5 bg-tactical-surface border border-tactical-border overflow-hidden">
            <div
              className="h-full bg-tactical-amber transition-all duration-300"
              style={{
                width: `${((activeIdx + 1) / projects.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-tactical-ivory">
            {Math.round(((activeIdx + 1) / projects.length) * 100)}% COMPLETE
          </span>
        </div>

        <div className="hidden sm:block text-tactical-dim">
          TAP CARDS OR USE ARROW KEYS TO INSPECT NEXT SUBSYSTEM
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   INTERACTIVE SIMULATORS FOR EACH PROJECT
   ========================================================================= */

function EmotionSimulator() {
  const [fps, setFps] = useState(30.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Number((29.8 + Math.random() * 0.8).toFixed(1)));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const emotions = [
    { label: "Focus / Neutral", val: 86, color: "bg-tactical-green" },
    { label: "Alertness", val: 74, color: "bg-tactical-amber" },
    { label: "Joy / Engagement", val: 42, color: "bg-tactical-ivory" },
    { label: "Fatigue Risk", val: 12, color: "bg-tactical-dim" },
  ];

  return (
    <div className="w-full max-w-md space-y-4 font-mono-tech">
      <div className="relative aspect-video w-full border border-tactical-border bg-tactical-base flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-tactical-grid opacity-30" />
        <div className="relative w-36 h-44 border-2 border-tactical-green p-1 flex flex-col justify-between">
          <div className="flex justify-between text-[8px] text-tactical-green font-bold">
            <span>TRACK_ID: #042</span>
            <span>CONF: 98.4%</span>
          </div>
          <div className="flex justify-around px-4">
            <span className="w-1.5 h-1.5 rounded-full bg-tactical-amber animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-tactical-amber animate-pulse" />
          </div>
          <div className="w-8 h-1 bg-tactical-green mx-auto rounded-full" />
          <div className="flex justify-between text-[8px] text-tactical-green">
            <span>CLAHE: ON</span>
            <span className="text-tactical-amber">BUFFER: HIT (1.2ms)</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-tactical-muted">
          <span>EDGE INFERENCE VECTOR</span>
          <span className="text-tactical-green font-bold">{fps} FPS STREAM</span>
        </div>
        {emotions.map((emo) => (
          <div key={emo.label} className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-tactical-ivory">{emo.label}</span>
              <span className="text-tactical-muted">{emo.val}%</span>
            </div>
            <div className="h-1.5 w-full bg-tactical-base border border-tactical-border">
              <div
                className={`h-full ${emo.color}`}
                style={{ width: `${emo.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RasiFeedPLCSimulator() {
  const [dispensing, setDispensing] = useState(false);
  const [scaleWeight, setScaleWeight] = useState(482.5);
  const [activeSilo, setActiveSilo] = useState<"Corn" | "Soya" | "Minerals">("Corn");

  const toggleDispense = () => {
    setDispensing(!dispensing);
    if (!dispensing) {
      setScaleWeight((prev) => (prev >= 498 ? 420.0 : Number((prev + 18.2).toFixed(1))));
    }
  };

  return (
    <div className="w-full max-w-md space-y-3 font-mono-tech">
      <div className="border border-tactical-border bg-tactical-base p-3.5 space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-tactical-border">
          <span className="text-tactical-amber font-bold flex items-center gap-1.5">
            <Factory className="w-3.5 h-3.5 text-tactical-amber" />
            RASI FEEDS // BATCH DISPENSER
          </span>
          <span className="text-tactical-green text-[10px]">ABB AC500 // 10ms SCAN</span>
        </div>

        {/* Silo Selection Tabs */}
        <div className="grid grid-cols-3 gap-1.5 text-[10px]">
          {(["Corn", "Soya", "Minerals"] as const).map((silo) => (
            <button
              key={silo}
              onClick={() => setActiveSilo(silo)}
              className={`py-1 px-1.5 border text-center transition-all ${
                activeSilo === silo
                  ? "border-tactical-amber bg-tactical-amber/15 text-tactical-amber font-bold"
                  : "border-tactical-border bg-tactical-surface text-tactical-dim hover:text-tactical-ivory"
              }`}
            >
              SILO: {silo.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Live Weight Scale Indicator */}
        <div className="p-3 border border-tactical-border bg-tactical-surface space-y-1.5">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-tactical-muted">BATCH HOPPER LOAD CELL</span>
            <span className="text-tactical-green font-bold text-base">
              {scaleWeight} kg / 500.0 kg
            </span>
          </div>
          <div className="h-2.5 w-full bg-tactical-base border border-tactical-border overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                dispensing ? "bg-tactical-green animate-pulse" : "bg-tactical-amber"
              }`}
              style={{ width: `${(scaleWeight / 500) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-tactical-dim">
            <span>TOLERANCE: ±0.1%</span>
            <span>GATE: {dispensing ? "PNEUMATIC HIGH [24V]" : "SEALED [0V]"}</span>
          </div>
        </div>

        {/* Structured Text Register Readout */}
        <div className="bg-tactical-surface p-2 text-[10px] text-tactical-ivory/80 space-y-0.5 border border-tactical-border/60">
          <p className="text-tactical-dim">// IEC 61131-3 ST Sequence</p>
          <p className="text-tactical-amber">IF (Hopper_Weight &lt; Target_Formula) THEN</p>
          <p className="pl-3">Silo_Pneumatic_Gate := TRUE; Modbus_Status := 16#01;</p>
          <p className="text-tactical-amber">ELSE Silo_Pneumatic_Gate := FALSE; END_IF;</p>
        </div>
      </div>

      <button
        onClick={toggleDispense}
        className="w-full py-2.5 border border-tactical-amber bg-tactical-amber/15 hover:bg-tactical-amber hover:text-tactical-base text-tactical-amber font-bold text-xs uppercase transition-all tracking-wider"
      >
        {dispensing ? "HALT PNEUMATIC FEED VALVE" : "TRIGGER FEED DISPENSING CYCLE"}
      </button>
    </div>
  );
}

function ThaliCalorieSimulator() {
  const [selectedDish, setSelectedDish] = useState<string>("Paneer Gravy");

  const dishes: Record<string, { kcal: number; protein: string; carbs: string; fat: string; weight: string }> = {
    "Roti (2x)": { kcal: 140, protein: "5.8g", carbs: "28.4g", fat: "1.2g", weight: "70g" },
    "Dal Tadka": { kcal: 155, protein: "8.6g", carbs: "21.2g", fat: "4.5g", weight: "150g" },
    "Paneer Gravy": { kcal: 265, protein: "13.8g", carbs: "12.0g", fat: "18.4g", weight: "140g" },
    "Jeera Rice": { kcal: 185, protein: "4.2g", carbs: "38.5g", fat: "2.1g", weight: "160g" },
    "Mixed Sabzi": { kcal: 95, protein: "3.1g", carbs: "14.2g", fat: "3.4g", weight: "120g" },
  };

  const totalCalories = Object.values(dishes).reduce((acc, d) => acc + d.kcal, 0);

  return (
    <div className="w-full max-w-md space-y-3 font-mono-tech">
      {/* Visual Thali Platter Simulation with Bounding Segment Boxes */}
      <div className="relative aspect-video w-full border border-tactical-border bg-tactical-base p-3 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between text-[10px] text-tactical-muted">
          <span className="flex items-center gap-1 text-tactical-amber font-semibold">
            <Utensils className="w-3 h-3" /> INDIAN THALI SEGMENTATION
          </span>
          <span className="text-tactical-green font-bold">TOTAL: {totalCalories} kcal</span>
        </div>

        {/* Circular Platter Layout */}
        <div className="relative w-full h-32 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full border-2 border-dashed border-tactical-border flex items-center justify-center relative">
            <span className="text-[8px] text-tactical-dim uppercase">THALI RIM</span>
            {/* Bowls positioned around plate */}
            {Object.keys(dishes).map((dishName, i) => {
              const angles = [0, 72, 144, 216, 288];
              const rad = (angles[i] * Math.PI) / 180;
              const x = Math.cos(rad) * 44;
              const y = Math.sin(rad) * 44;
              const isSelected = selectedDish === dishName;
              return (
                <button
                  key={dishName}
                  onClick={() => setSelectedDish(dishName)}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  className={`absolute w-7 h-7 rounded-full text-[7px] font-bold border transition-all flex items-center justify-center ${
                    isSelected
                      ? "border-tactical-amber bg-tactical-amber text-tactical-base scale-125 shadow-[0_0_10px_rgba(255,85,0,0.6)]"
                      : "border-tactical-green/60 bg-tactical-surface text-tactical-green hover:scale-110"
                  }`}
                  title={dishName}
                >
                  B{i + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected dish bounding box telemetry */}
        <div className="flex justify-between text-[10px] text-tactical-ivory border-t border-tactical-border pt-1">
          <span>ITEM: <strong className="text-tactical-amber">{selectedDish}</strong> ({dishes[selectedDish].weight})</span>
          <span className="text-tactical-green">{dishes[selectedDish].kcal} KCAL</span>
        </div>
      </div>

      {/* Macronutrient Telemetry Breakdown */}
      <div className="grid grid-cols-3 gap-2 text-[10px]">
        <div className="p-2 border border-tactical-border bg-tactical-surface">
          <span className="text-tactical-dim block">PROTEIN</span>
          <span className="text-tactical-green font-bold text-xs">{dishes[selectedDish].protein}</span>
        </div>
        <div className="p-2 border border-tactical-border bg-tactical-surface">
          <span className="text-tactical-dim block">CARBOHYDRATES</span>
          <span className="text-tactical-amber font-bold text-xs">{dishes[selectedDish].carbs}</span>
        </div>
        <div className="p-2 border border-tactical-border bg-tactical-surface">
          <span className="text-tactical-dim block">LIPIDS / FATS</span>
          <span className="text-tactical-ivory font-bold text-xs">{dishes[selectedDish].fat}</span>
        </div>
      </div>
    </div>
  );
}

function HandwritingOCRSimulator() {
  const [threshold, setThreshold] = useState(132);

  return (
    <div className="w-full max-w-md space-y-3 font-mono-tech">
      <div className="border border-tactical-border bg-tactical-base p-3.5 space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-tactical-border">
          <span className="text-tactical-green font-bold flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            CRNN DEEP OCR PIPELINE
          </span>
          <span className="text-tactical-amber text-[10px]">CTC BEAM DECODER</span>
        </div>

        {/* Cursive Handwriting sample bounding segmentation */}
        <div className="relative aspect-video w-full bg-tactical-surface border border-tactical-border p-3 flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between text-[9px] text-tactical-dim">
            <span>INPUT: CURSIVE MANUSCRIPT</span>
            <span className="text-tactical-green">BINARIZATION: SAUVOLA</span>
          </div>

          {/* Simulated handwritten script box */}
          <div className="p-2 border-2 border-dashed border-tactical-green/60 bg-tactical-base/80 text-center space-y-1">
            <p className="font-serif italic text-tactical-ivory tracking-widest text-sm">
              &quot;Artificial Intelligence &amp; Silicon Systems&quot;
            </p>
            <div className="flex justify-center gap-1">
              {[...Array(6)].map((_, idx) => (
                <span key={idx} className="w-5 h-2 border border-tactical-amber/50 bg-tactical-amber/10 inline-block" />
              ))}
            </div>
          </div>

          <div className="flex justify-between text-[10px] text-tactical-ivory border-t border-tactical-border pt-1">
            <span>PREDICTED: <strong className="text-tactical-green">&quot;AI &amp; Silicon Systems&quot;</strong></span>
            <span className="text-tactical-amber">92.4% ACC</span>
          </div>
        </div>

        {/* Sauvola Threshold Adjustment Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-tactical-muted">
            <span>ADAPTIVE BINARIZATION THRESHOLD</span>
            <span className="text-tactical-green font-bold">{threshold} / 255</span>
          </div>
          <input
            type="range"
            min="60"
            max="220"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full accent-tactical-green bg-tactical-surface"
          />
        </div>
      </div>

      <div className="p-2 border border-tactical-border bg-tactical-surface text-[10px] text-tactical-muted text-center">
        STRUCTURED JSON / PLAINTEXT EXPORT READY VIA FASTAPI BACKEND
      </div>
    </div>
  );
}

function ProfilerSimulator() {
  const [gap, setGap] = useState(0.84);

  return (
    <div className="w-full max-w-md space-y-4 font-mono-tech">
      <div className="relative aspect-video w-full border border-tactical-border bg-tactical-base p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between text-[10px] text-tactical-muted">
          <span>OPTICAL RETICLE // 8MP TELEPHOTO</span>
          <span className="text-tactical-green">CALIBRATION: 0.1 mm</span>
        </div>

        <div className="relative w-full h-24 flex items-center justify-center">
          <div className="w-2/5 h-full bg-tactical-surface border-r-2 border-tactical-amber flex items-center justify-end pr-2 text-[10px] text-tactical-dim">
            SURFACE_A
          </div>
          <div className="w-1/5 h-full flex flex-col items-center justify-center relative">
            <div className="w-full h-px bg-tactical-amber" />
            <span className="bg-tactical-base px-1 text-tactical-amber font-bold text-xs">
              {gap} mm
            </span>
            <div className="w-full h-px bg-tactical-amber" />
          </div>
          <div className="w-2/5 h-full bg-tactical-surface border-l-2 border-tactical-amber flex items-center pl-2 text-[10px] text-tactical-dim">
            SURFACE_B
          </div>
        </div>

        <div className="flex justify-between text-[10px] text-tactical-ivory">
          <span>HOMOGRAPHY: CHECKERBOARD LOCKED</span>
          <span className="text-tactical-green">TOLERANCE: PASS</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-tactical-muted">
          <span>DYNAMIC GAP ADJUSTMENT (MM)</span>
          <span className="text-tactical-amber font-bold">{gap} mm</span>
        </div>
        <input
          type="range"
          min="0.20"
          max="2.50"
          step="0.02"
          value={gap}
          onChange={(e) => setGap(parseFloat(e.target.value))}
          className="w-full accent-tactical-amber bg-tactical-surface"
        />
      </div>
    </div>
  );
}

function KycSimulator() {
  return (
    <div className="w-full max-w-md space-y-4 font-mono-tech">
      <div className="border border-tactical-border bg-tactical-base p-4 space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-tactical-border">
          <span className="text-tactical-muted">DUAL-DB ARCHITECTURE</span>
          <span className="text-tactical-green">AES-256 VAULT READY</span>
        </div>

        <div className="space-y-2 text-[11px]">
          <div className="p-2 border border-tactical-border bg-tactical-surface flex items-center justify-between">
            <div>
              <span className="text-tactical-amber font-bold block">TIER 1: SQLITE BUFFER</span>
              <span className="text-tactical-dim text-[9px]">IN-MEMORY WAL SESSION INGEST</span>
            </div>
            <span className="text-tactical-green font-bold">&lt;12ms LATENCY</span>
          </div>

          <div className="text-center text-tactical-amber text-xs">▼ STREAM VERIFIED CREDENTIALS ▼</div>

          <div className="p-2 border border-tactical-border bg-tactical-surface flex items-center justify-between">
            <div>
              <span className="text-tactical-ivory font-bold block">TIER 2: ENCRYPTED MASTER VAULT</span>
              <span className="text-tactical-dim text-[9px]">ACID TRANSACTIONS &amp; AUDIT LOGS</span>
            </div>
            <span className="text-tactical-green font-bold">100% PERSISTENCE</span>
          </div>
        </div>
      </div>

      <div className="p-2 border border-tactical-border bg-tactical-surface text-[10px] text-tactical-muted text-center">
        ZERO ONBOARDING TIMEOUTS ACROSS CONCURRENT SESSIONS
      </div>
    </div>
  );
}
