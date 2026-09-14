"use client";

import { Award, BookOpen, GraduationCap, CheckCircle, ShieldAlert, FileText } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Credentials() {
  return (
    <section id="credentials" className="relative w-full bg-tactical-base border-b border-tactical-border py-20 overflow-hidden">
      {/* Micro-grid background */}
      <div className="absolute inset-0 bg-tactical-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-tactical-border pb-6 font-mono-tech">
          <div>
            <div className="flex items-center space-x-2 text-xs text-tactical-amber tracking-widest uppercase mb-2">
              <span className="w-2 h-2 bg-tactical-amber inline-block" />
              <span>SECTION 04 // VERIFIED CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-tactical-ivory tracking-tight">
              RESEARCH, AWARDS &amp; ACADEMICS
            </h2>
          </div>
          <div className="text-xs text-tactical-muted max-w-md">
            Peer-reviewed research authorship, competitive hackathon finalist awards, and industry-standard systems certifications.
          </div>
        </div>

        {/* Top 2 Hero Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono-tech">
          
          {/* Card 1: Academic Excellence & Systems Engineering */}
          <div className="tactical-crosshair border border-blue-500/50 bg-tactical-surface/90 p-6 sm:p-7 space-y-4 hover:border-blue-500 transition-colors">
            <div className="flex items-center justify-between border-b border-tactical-border pb-3">
              <span className="px-2.5 py-1 bg-blue-500/20 border border-blue-500 text-blue-400 text-xs font-bold tracking-wider">
                ACADEMIC EXCELLENCE
              </span>
              <span className="text-tactical-dim text-xs">SRMIST // 2025–2029</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-tactical-ivory">
                B.Tech in Computer Science &amp; Engineering (AI &amp; ML)
              </h3>
              <p className="text-xs text-blue-400 font-semibold">
                SRM Institute of Science and Technology — CGPA: 8.7 / 10.0
              </p>
            </div>

            <p className="text-xs sm:text-sm text-tactical-muted leading-relaxed">
              Specializing in low-latency edge inference, physical hardware-software co-design, real-time computer vision engines, and deterministic industrial PLC automation.
            </p>

            <div className="pt-2 flex items-center justify-between text-[11px] text-tactical-dim border-t border-tactical-border">
              <span>CURRENT STANDING: SEMESTER IV</span>
              <span className="text-tactical-green">[VERIFIED ENROLLMENT]</span>
            </div>
          </div>

          {/* Card 2: KYC Datathon 2.0 MVP Finalist */}
          <div className="tactical-crosshair border border-tactical-green/50 bg-tactical-surface/90 p-6 sm:p-7 space-y-4 hover:border-tactical-green transition-colors">
            <div className="flex items-center justify-between border-b border-tactical-border pb-3">
              <span className="px-2.5 py-1 bg-tactical-green/20 border border-tactical-green text-tactical-green text-xs font-bold tracking-wider">
                DATATHON COMPETITION
              </span>
              <span className="text-tactical-dim text-xs">KYC DATATHON 2.0 // 2024</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-tactical-ivory">
                EMO-REX: Real-time Multi-Modal Verification
              </h3>
              <p className="text-xs text-tactical-green font-semibold">
                MVP Finalist Award
              </p>
            </div>

            <p className="text-xs sm:text-sm text-tactical-muted leading-relaxed">
              Architected and demoed a high-concurrency real-time verification and emotion tracker leveraging OpenCV, DeepFace, and high-throughput in-memory state buffering within strict datathon constraints.
            </p>

            <div className="pt-2 flex items-center justify-between text-[11px] text-tactical-dim border-t border-tactical-border">
              <span>OUTCOME: MVP FINALIST</span>
              <span className="text-tactical-green">[DEMOED LIVE MVP]</span>
            </div>
          </div>

        </div>

        {/* Bottom Split: Education & Professional Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono-tech">
          
          {/* Education Block (5 Cols) */}
          <div className="lg:col-span-5 border border-tactical-border bg-tactical-surface/70 p-6 space-y-4">
            <div className="flex items-center space-x-2 text-xs text-tactical-amber border-b border-tactical-border pb-3">
              <GraduationCap className="w-4 h-4" />
              <span className="font-bold uppercase tracking-wider">ACADEMIC RECORD</span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs text-tactical-dim block">INSTITUTION</span>
                <span className="text-base font-bold text-tactical-ivory block">
                  {profileData.education.institution}
                </span>
                <span className="text-xs text-tactical-muted">Tiruchirappalli, Tamil Nadu, India</span>
              </div>

              <div>
                <span className="text-xs text-tactical-dim block">DEGREE &amp; MAJOR</span>
                <span className="text-sm font-semibold text-tactical-amber block">
                  {profileData.education.degree}
                </span>
                <span className="text-xs text-tactical-ivory">
                  {profileData.education.specialization}
                </span>
              </div>

              <div className="pt-2 border-t border-tactical-border/60 flex justify-between text-xs">
                <span className="text-tactical-muted">TIMELINE:</span>
                <span className="text-tactical-green font-semibold">
                  {profileData.education.timeline} (Graduating {profileData.education.graduation})
                </span>
              </div>
            </div>
          </div>

          {/* Industry Certifications List (7 Cols) */}
          <div className="lg:col-span-7 border border-tactical-border bg-tactical-surface/70 p-6 space-y-4">
            <div className="flex items-center space-x-2 text-xs text-tactical-green border-b border-tactical-border pb-3">
              <BookOpen className="w-4 h-4" />
              <span className="font-bold uppercase tracking-wider">
                VERIFIED INDUSTRY CERTIFICATIONS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {profileData.certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="p-3 border border-tactical-border/60 bg-tactical-base/80 space-y-1 hover:border-tactical-amber/50 transition-colors"
                >
                  <div className="flex items-center justify-between text-[9px] text-tactical-dim">
                    <span>{cert.category}</span>
                    <CheckCircle className="w-3 h-3 text-tactical-green" />
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

      </div>
    </section>
  );
}
