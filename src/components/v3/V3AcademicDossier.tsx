"use client";

import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Award,
  FileText,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Download,
  ShieldCheck,
  Code2,
  Atom,
  X
} from "lucide-react";
import { profileData, CourseworkItem } from "@/data/profile";
import V3TiltCard from "./V3TiltCard";
import V3TextDecrypt from "./V3TextDecrypt";

export default function V3AcademicDossier() {
  const [courseFilter, setCourseFilter] = useState<"ALL" | "AI/ML" | "Algorithms" | "Systems" | "Math">("ALL");
  const [expandedPaper, setExpandedPaper] = useState(false);
  const [showSpecSheet, setShowSpecSheet] = useState(false);

  const filteredCourses = courseFilter === "ALL"
    ? profileData.education.coursework
    : profileData.education.coursework.filter((c) => c.category === courseFilter);

  return (
    <section id="v3-academic" className="relative w-full bg-transparent py-24 border-b border-tactical-border overflow-hidden font-mono-tech">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-10 md:pl-24 space-y-16">

        {/* Section Header with Decrypt Effect */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-tactical-border pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs text-blue-400 tracking-widest uppercase mb-2">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>ACADEMIC STACK 05 // CURRICULUM & ENGINEERING</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-tactical-ivory tracking-tight uppercase">
              ACADEMIC <span className="text-blue-400"><V3TextDecrypt text="DOSSIER" /></span> & CURRICULUM
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSpecSheet(true)}
              className="px-4 py-2.5 border border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-tactical-base transition-all text-xs font-bold uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>INSPECT FULL SPEC SHEET</span>
            </button>
            <a
              href="/Kabish_Sridar_Resume.pdf"
              download="Kabish_Sridar_Resume.pdf"
              className="px-4 py-2.5 border border-tactical-border bg-transparent text-tactical-ivory hover:border-tactical-green hover:text-tactical-green transition-all text-xs font-bold uppercase flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>RESUME PDF</span>
            </a>
          </div>
        </div>

        {/* Top Split: SRMIST Degree Details & Engineering Architecture Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left 5 Cols: SRMIST Degree Credentials */}
          <div className="lg:col-span-5">
            <V3TiltCard className="h-full border border-tactical-border/50 bg-transparent backdrop-blur-xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.8)] group hover:border-tactical-amber/50 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-tactical-border pb-3">
                  <span className="px-2 py-0.5 border border-blue-400/50 bg-blue-500/10 text-blue-400 text-[10px] font-bold">
                    {profileData.education.timeline} // {profileData.education.currentSemester}
                  </span>
                  <span className="text-tactical-green text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ACCREDITED
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-2xl font-black text-tactical-ivory">
                    {profileData.education.institution}
                  </h3>
                  <p className="text-xs text-blue-400 font-semibold">
                    {profileData.education.campus}
                  </p>
                  <p className="text-sm text-tactical-muted font-bold pt-1">
                    {profileData.education.degree} — {profileData.education.specialization}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 border border-tactical-border/70 bg-transparent">
                    <span className="text-[9px] text-tactical-dim block uppercase">CGPA INDEX</span>
                    <span className="text-lg font-black text-tactical-green">
                      {profileData.education.cgpaEstimate}
                    </span>
                  </div>
                  <div className="p-3 border border-tactical-border/70 bg-transparent">
                    <span className="text-[9px] text-tactical-dim block uppercase">GRADUATION</span>
                    <span className="text-lg font-black text-tactical-amber">
                      MAY 2029
                    </span>
                  </div>
                </div>

                <p className="text-xs text-tactical-muted leading-relaxed">
                  Focusing on low-level firmware synchronization, deterministic operating systems (FreeRTOS), real-time edge computer vision inference, and industrial PLC control.
                </p>
              </div>

              <div className="pt-4 border-t border-tactical-border/70 flex items-center justify-between text-[10px] text-tactical-dim">
                <span>VERIFIED ENROLLMENT</span>
                <span className="text-tactical-green">SRMIST ID: CONFIRMED</span>
              </div>
            </V3TiltCard>
          </div>

          {/* Right 7 Cols: Applied Systems Engineering & Research Showcase */}
          <div className="lg:col-span-7">
            <V3TiltCard className="h-full border border-tactical-amber/40 bg-transparent backdrop-blur-xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(255,170,0,0.08)] group hover:border-tactical-amber/50 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-tactical-border pb-3">
                  <span className="px-2 py-0.5 border border-tactical-amber bg-tactical-amber/10 text-tactical-amber text-[10px] font-bold">
                    APPLIED RESEARCH & SYSTEMS ARCHITECTURE
                  </span>
                  <span className="text-xs text-tactical-dim">2024 — PRESENT</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-tactical-ivory leading-snug">
                  Edge AI Silicon & Deterministic Industrial Systems
                </h3>

                <p className="text-xs text-blue-400 font-bold">
                  SRMIST Department of Computer Science & Engineering (AI & ML)
                </p>

                <p className="text-xs text-tactical-muted leading-relaxed">
                  Architecting deployable neural networks and deterministic firmware logic for industrial and real-time computing applications. Researching low-latency state synchronization with in-memory buffer layers to eliminate storage bottlenecks during multi-face edge tracking.
                </p>

                {/* Key Highlights Pill Grid */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] text-tactical-amber uppercase font-bold block">
                    ENGINEERING DOMAINS:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
                    <div className="p-2 border border-tactical-border bg-transparent text-tactical-ivory">
                      High-concurrency in-memory state buffering for real-time edge vision
                    </div>
                    <div className="p-2 border border-tactical-border bg-transparent text-tactical-ivory">
                      ABB AC500 PLC batching logic with IEC 61131-3 Structured Text
                    </div>
                    <div className="p-2 border border-tactical-border bg-transparent text-tactical-ivory">
                      Sub-millisecond dual-core FreeRTOS task partition & telemetry
                    </div>
                  </div>
                </div>

                {/* Expandable Architecture Drawer */}
                {expandedPaper && (
                  <div className="p-3.5 border border-tactical-border bg-transparent space-y-2 text-xs">
                    <span className="text-[10px] text-blue-400 font-bold uppercase block">
                      LAB ARCHITECTURE PIPELINE:
                    </span>
                    <ol className="list-decimal list-inside space-y-1 text-tactical-muted text-[11px]">
                      <li><span className="text-tactical-ivory">Edge Hardware Sensor / Video Frame Capture (USB / RTSP)</span></li>
                      <li><span className="text-tactical-ivory">OpenCV & DeepFace / YOLOv8 Real-time Inference Engine</span></li>
                      <li><span className="text-tactical-ivory">In-Memory State Buffer Layer (Sub-1.5ms Lookup)</span></li>
                      <li><span className="text-tactical-ivory">Deterministic PLC Modbus TCP/IP Actuation & Local Telemetry Logging</span></li>
                    </ol>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-tactical-border flex items-center justify-between">
                <button
                  onClick={() => setExpandedPaper((p) => !p)}
                  className="text-xs font-bold text-tactical-amber hover:text-tactical-ivory flex items-center gap-1 transition-colors"
                >
                  <span>{expandedPaper ? "COLLAPSE PIPELINE" : "VIEW COMPLETE PIPELINE"}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expandedPaper ? "rotate-90" : ""}`} />
                </button>

                <span className="text-[10px] text-tactical-dim font-mono-tech">
                  FOCUS: AI/ML & EMBEDDED HARDWARE
                </span>
              </div>
            </V3TiltCard>
          </div>

        </div>

        {/* Academic Coursework Filterable Matrix */}
        <div className="border border-tactical-border/50 bg-transparent backdrop-blur-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-tactical-border pb-4">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-tactical-green" />
              <span className="font-bold text-tactical-ivory uppercase text-sm">
                CORE CURRICULUM & ENGINEERING COURSEWORK
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {(["ALL", "AI/ML", "Algorithms", "Systems", "Math"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setCourseFilter(tab)}
                  className={`px-3 py-1 border text-[10px] font-bold uppercase transition-all ${
                    courseFilter === tab
                      ? "border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                      : "border-tactical-border bg-transparent text-tactical-muted hover:text-tactical-ivory"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCourses.map((course) => (
              <div
                key={course.code}
                className="p-4 border border-tactical-border/70 bg-transparent space-y-3 hover:border-blue-500 transition-colors group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-blue-400 font-bold">{course.code}</span>
                    <span className={`px-1.5 py-0.5 border text-[9px] font-bold ${
                      course.gradeOrStatus === "ACTIVE"
                        ? "border-tactical-amber/50 text-tactical-amber bg-tactical-amber/10"
                        : "border-tactical-green/50 text-tactical-green bg-tactical-green/10"
                    }`}>
                      {course.gradeOrStatus}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-tactical-ivory group-hover:text-blue-300 transition-colors">
                    {course.name}
                  </h4>
                </div>

                <div className="pt-2 border-t border-tactical-border/50 flex flex-wrap gap-1">
                  {course.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 bg-transparent text-[9px] text-tactical-dim border border-tactical-border/50"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathon Honours & Competitive Distinctions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-tactical-border pb-3 text-xs">
            <span className="font-bold text-tactical-ivory uppercase flex items-center gap-2">
              <Award className="w-4 h-4 text-tactical-amber" />
              COMPETITIVE HONOURS & HACKATHON OUTCOMES
            </span>
            <span className="text-tactical-dim text-[10px]">VERIFIED COMMENDATIONS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileData.achievements.map((item, idx) => (
              <V3TiltCard
                key={idx}
                className="border border-tactical-border/50 bg-transparent backdrop-blur-xl p-6 space-y-3 flex flex-col justify-between group hover:border-tactical-amber/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 border border-tactical-green/50 bg-tactical-green/10 text-tactical-green text-[10px] font-bold">
                      {item.badge}
                    </span>
                    <span className="text-xs text-tactical-dim">{item.year}</span>
                  </div>

                  <h4 className="text-lg font-bold text-tactical-ivory">
                    {item.title}
                  </h4>
                  <p className="text-xs text-blue-400 font-bold">
                    {item.organization}
                  </p>
                  <p className="text-xs text-tactical-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-tactical-border/70 flex items-center justify-between text-[10px] text-tactical-dim">
                  <span>ACHIEVEMENT INDEX: #0{idx + 1}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-tactical-green" />
                </div>
              </V3TiltCard>
            ))}
          </div>
        </div>

      </div>

      {/* Engineering Spec Sheet Modal Preview */}
      {showSpecSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-mono-tech">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-tactical-base border border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.3)] flex flex-col overflow-hidden">

            {/* Modal Header */}
            <div className="p-4 border-b border-tactical-border bg-tactical-surface flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-black text-tactical-ivory uppercase tracking-wider">
                  ENGINEERING SPEC SHEET // KABISH SRIDAR
                </span>
              </div>
              <button
                onClick={() => setShowSpecSheet(false)}
                className="text-tactical-muted hover:text-tactical-ivory p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-tactical-muted">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-tactical-border pb-6">
                <div>
                  <span className="text-[10px] text-tactical-dim uppercase block">PRIMARY IDENTITY</span>
                  <span className="text-base font-bold text-tactical-ivory block">Kabish Sridar</span>
                  <span className="text-[10px] text-blue-400 font-mono">0x4B // TAC-OPS</span>
                </div>
                <div>
                  <span className="text-[10px] text-tactical-dim uppercase block">INSTITUTION</span>
                  <span className="font-bold text-tactical-ivory block">SRMIST (AI & ML)</span>
                  <span className="text-[10px] text-tactical-dim">2025 — 2029 (Year 2)</span>
                </div>
                <div>
                  <span className="text-[10px] text-tactical-dim uppercase block">DIRECT COMMS</span>
                  <span className="font-bold text-tactical-green block">kabishsridar6@gmail.com</span>
                  <span className="text-[10px] text-tactical-dim">+91 95249 30380</span>
                </div>
              </div>

              {/* Skills Arsenal */}
              <div className="space-y-3">
                <span className="text-[11px] text-tactical-ivory font-bold uppercase block">
                  TECHNICAL ARSENAL ACCORDING TO DOMAIN:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 border border-tactical-border bg-transparent space-y-2">
                    <span className="text-blue-400 font-bold text-[10px] uppercase block">AI & COMPUTER VISION</span>
                    <p className="text-[11px] text-tactical-ivory">PyTorch, OpenCV, DeepFace, YOLOv8, ONNX Runtime, NumPy, Real-time 0.1 mm Metrology</p>
                  </div>
                  <div className="p-3 border border-tactical-border bg-transparent space-y-2">
                    <span className="text-tactical-green font-bold text-[10px] uppercase block">EMBEDDED SILICON & INDUSTRIAL</span>
                    <p className="text-[11px] text-tactical-ivory">ABB AC500 PLC, Structured Text (IEC 61131-3), ESP32 FreeRTOS, Raspberry Pi, PiCamera v2/v3, Modbus TCP/IP, I2C/SPI</p>
                  </div>
                  <div className="p-3 border border-tactical-border bg-transparent space-y-2">
                    <span className="text-tactical-amber font-bold text-[10px] uppercase block">LANGUAGES & RUNTIMES</span>
                    <p className="text-[11px] text-tactical-ivory">Python, C++17/20, C, HTML, CSS, JavaScript, SQL, Bash, Structured Text</p>
                  </div>
                  <div className="p-3 border border-tactical-border bg-transparent space-y-2">
                    <span className="text-purple-400 font-bold text-[10px] uppercase block">INFRASTRUCTURE & PROTOCOLS</span>
                    <p className="text-[11px] text-tactical-ivory">Docker Containers, FastAPI, Linux IPC, Next.js, Git CI/CD</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-tactical-border flex items-center justify-between">
                <span className="text-[10px] text-tactical-dim">CONFIRMED ACCURACY // SRI RAMASWAMY MEMORIAL INSTITUTE</span>
                <a
                  href="/Kabish_Sridar_Resume.pdf"
                  download="Kabish_Sridar_Resume.pdf"
                  className="px-4 py-2 bg-blue-500 text-tactical-base font-bold text-xs uppercase hover:bg-tactical-ivory transition-colors flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD VERIFIED PDF</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}