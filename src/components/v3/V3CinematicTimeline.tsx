"use client";

import { Award, BookOpen, GraduationCap, Zap, CheckCircle2, Shield } from "lucide-react";
import { profileData } from "@/data/profile";

export default function V3CinematicTimeline() {
  const cards = [
    {
      year: "2025–2029",
      title: "SRM Institute of Science and Technology",
      badge: "B.TECH (CSE - AI & ML)",
      color: "border-blue-400 text-blue-400",
      desc: "Specializing in deployable deep neural networks, edge silicon computing, real-time computer vision, and industrial automation logic. CGPA: 8.7 / 10.0.",
    },
    {
      year: "2024",
      title: "KYC Datathon 2.0 — MVP Finalist Award",
      badge: "DATATHON FINALIST",
      color: "border-tactical-green text-tactical-green",
      desc: "Designed and demoed high-concurrency verification and facial analysis with high-throughput in-memory state buffering.",
    },
    {
      year: "2024–PRESENT",
      title: "Edge Silicon & Computer Vision Engineering",
      badge: "SYSTEMS BUILDER",
      color: "border-tactical-amber text-tactical-amber",
      desc: "Architecting deterministic multi-threaded vision pipelines with OpenCV, FreeRTOS microcontrollers, and ABB AC500 PLC industrial automation.",
    },
  ];

  return (
    <section id="v3-timeline" className="relative w-full bg-tactical-base/95 py-24 border-b border-tactical-border overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-10 md:pl-24 space-y-16 font-mono-tech">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-tactical-border pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs text-blue-400 tracking-widest uppercase mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>STACK 04 // VERIFIED CREDENTIALS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-tactical-ivory tracking-tight uppercase">
              RESEARCH &amp; <span className="text-blue-400">ACADEMICS</span>
            </h2>
          </div>
          <p className="text-xs text-tactical-muted max-w-md">
            Peer-reviewed authorship, competitive hackathon outcomes, and verified engineering credentials.
          </p>
        </div>

        {/* Milestone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div
              key={i}
              className="border border-tactical-border bg-tactical-surface/90 backdrop-blur-xl p-6 sm:p-7 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-tactical-border pb-3">
                <span className={`px-2 py-0.5 border text-[10px] font-bold ${c.color}`}>
                  {c.badge}
                </span>
                <span className="text-xs text-tactical-dim">{c.year}</span>
              </div>

              <h3 className="text-xl font-bold text-tactical-ivory">
                {c.title}
              </h3>

              <p className="text-xs text-tactical-muted leading-relaxed">
                {c.desc}
              </p>

              <div className="pt-2 border-t border-tactical-border flex items-center justify-between text-[10px] text-tactical-dim">
                <span>STATUS: VERIFIED</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-tactical-green" />
              </div>
            </div>
          ))}
        </div>

        {/* Industry Certifications Ledger */}
        <div className="border border-tactical-border bg-tactical-surface/70 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-tactical-border pb-3 text-xs">
            <span className="text-blue-400 font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              AUTHENTICATED CERTIFICATION LEDGER
            </span>
            <span className="text-tactical-dim text-[10px]">ALL BADGES VERIFIED</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {profileData.certifications.map((cert) => (
              <div
                key={cert.title}
                className="p-3 border border-tactical-border/60 bg-tactical-base/80 space-y-1 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center justify-between text-[9px] text-tactical-dim">
                  <span>{cert.category}</span>
                  <CheckCircle2 className="w-3 h-3 text-blue-400" />
                </div>
                <span className="font-bold text-tactical-ivory block truncate">
                  {cert.title}
                </span>
                <span className="text-[10px] text-tactical-muted block">
                  {cert.issuer}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
