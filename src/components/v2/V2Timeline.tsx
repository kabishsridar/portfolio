"use client";

import { Award, BookOpen, GraduationCap, Sparkles, CheckCircle2, Shield } from "lucide-react";
import V2TiltCard from "./V2TiltCard";
import { profileData } from "@/data/profile";

export default function V2Timeline() {
  const milestones = [
    {
      year: "2025–2029",
      title: "SRM Institute of Science and Technology",
      tag: "B.TECH (CSE - AI & ML)",
      color: "border-tactical-green text-tactical-green",
      desc: "Specializing in deployable deep neural networks, edge silicon computing, real-time computer vision, and industrial automation logic. CGPA: 8.7 / 10.0.",
    },
    {
      year: "2024",
      title: "Noob Hackfest — MVP Finalist Award",
      tag: "24-HR COMPETITION",
      color: "border-tactical-amber text-tactical-amber",
      desc: "Architected and demoed EMO-REX: high-concurrency emotion analysis with Redis in-memory lookup caching and PostgreSQL analytics.",
    },
    {
      year: "2024–PRESENT",
      title: "Edge Silicon & Computer Vision Engineering",
      tag: "SYSTEMS BUILDER",
      color: "border-tactical-ivory text-tactical-ivory",
      desc: "Architecting deterministic multi-threaded vision pipelines with OpenCV, FreeRTOS microcontrollers, and ABB AC500 PLC industrial automation.",
    },
  ];

  return (
    <section id="v2-timeline" className="relative w-full bg-tactical-base py-24 border-b border-tactical-border overflow-hidden">
      {/* Background micro-grid */}
      <div className="absolute inset-0 bg-tactical-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-tactical-border pb-6 font-mono-tech">
          <div>
            <div className="flex items-center space-x-2 text-xs text-tactical-green tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STACK 04 // VERIFIED DOSSIER</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-tactical-ivory tracking-tight uppercase">
              RESEARCH, AWARDS &amp; <span className="text-tactical-green">ACADEMICS</span>
            </h2>
          </div>
          <p className="text-xs text-tactical-muted max-w-md">
            Peer-reviewed authorship, competitive hackathon outcomes, and verified engineering credentials.
          </p>
        </div>

        {/* Milestone Cards with Kinetic 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono-tech">
          {milestones.map((m, idx) => (
            <V2TiltCard
              key={idx}
              tiltMaxAngle={10}
              glareOpacity={0.2}
              className="border border-tactical-border bg-tactical-surface/90 backdrop-blur-xl p-6 sm:p-7 space-y-4 shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
            >
              <div className="flex items-center justify-between border-b border-tactical-border pb-3">
                <span className={`px-2 py-0.5 border text-[10px] font-bold tracking-wider ${m.color}`}>
                  {m.tag}
                </span>
                <span className="text-xs text-tactical-dim">{m.year}</span>
              </div>

              <h3 className="text-xl font-bold text-tactical-ivory">
                {m.title}
              </h3>

              <p className="text-xs text-tactical-muted leading-relaxed">
                {m.desc}
              </p>

              <div className="pt-2 border-t border-tactical-border/60 flex items-center justify-between text-[10px] text-tactical-dim">
                <span>VERIFIED RECORD</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-tactical-green" />
              </div>
            </V2TiltCard>
          ))}
        </div>

        {/* Industry Certifications Grid */}
        <div className="border border-tactical-border bg-tactical-surface/70 p-6 sm:p-8 font-mono-tech space-y-6">
          <div className="flex items-center justify-between border-b border-tactical-border pb-3 text-xs">
            <span className="text-tactical-green font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              PROFESSIONAL CERTIFICATION LEDGER
            </span>
            <span className="text-tactical-dim text-[10px]">ALL BADGES AUTHENTICATED</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {profileData.certifications.map((cert) => (
              <div
                key={cert.title}
                className="p-3 border border-tactical-border/60 bg-tactical-base/80 space-y-1 hover:border-tactical-green/50 transition-colors"
              >
                <div className="flex items-center justify-between text-[9px] text-tactical-dim">
                  <span>{cert.category}</span>
                  <CheckCircle2 className="w-3 h-3 text-tactical-green" />
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
