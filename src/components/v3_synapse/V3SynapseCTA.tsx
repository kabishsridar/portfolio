"use client";

import { ArrowRight, Mail, Globe, FileText, Sparkles, ExternalLink } from "lucide-react";
import { profileData } from "@/data/profile";

export default function V3SynapseCTA({ onOpenResume }: { onOpenResume: () => void }) {
  return (
    <section id="credentials" className="relative pt-24 pb-32 bg-[#06060b] overflow-hidden border-t border-purple-900/30">
      {/* Deep curved purple metallic stage backdrop (matching the bottom purple bowl/stage of portfolio_idea_1.webm) */}
      <div className="absolute inset-x-0 bottom-0 h-[480px] bg-gradient-to-t from-purple-900/40 via-indigo-950/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-t from-purple-700/30 via-fuchsia-900/20 to-transparent blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Curved Metallic Container */}
        <div className="rounded-3xl bg-gradient-to-b from-[#130d24] via-[#0d0a1a] to-[#080712] border border-purple-500/40 p-8 sm:p-14 backdrop-blur-2xl shadow-[0_20px_80px_rgba(147,51,234,0.25)] text-center relative overflow-hidden">
          {/* Subtle glow orb */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-[11px] font-mono text-purple-300 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AVAILABLE FOR TECHNICAL COLLABORATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Ready to construct <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-fuchsia-300 bg-clip-text text-transparent">
              high-reliability systems?
            </span>
          </h2>

          <p className="mt-6 text-neutral-300/80 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Reach out directly for edge computer vision algorithms, optical metrology calibration, or industrial automation firmware.
          </p>

          {/* Action buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profileData.contact.email}`}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-[0_0_30px_rgba(147,51,234,0.5)] flex items-center gap-2 group"
            >
              <Mail className="w-4 h-4" />
              <span>Contact via Email</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onOpenResume}
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all backdrop-blur-md flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-purple-300" />
              <span>Open PDF Resume</span>
            </button>
          </div>

          {/* Social Links Row */}
          <div className="mt-14 pt-8 border-t border-purple-500/20 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-400">
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4 text-purple-400" />
              <span>GitHub ({profileData.contact.githubHandle})</span>
            </a>
            <span className="text-neutral-600">•</span>
            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4 text-purple-400" />
              <span>LinkedIn</span>
            </a>
            <span className="text-neutral-600">•</span>
            <a
              href="https://om90.in/devices/elongation-detector"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-300 transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-4 h-4 text-purple-400" />
              <span>OM90 Portal</span>
            </a>
          </div>
        </div>

        {/* Footer info line */}
        <div className="mt-12 text-center text-xs font-mono text-neutral-500">
          <p>© {new Date().getFullYear()} Kabish Sridar — Edge Computer Vision & Metrology Engineer.</p>
          <p className="mt-1 text-[11px] text-neutral-600">
            SRM Institute of Science and Technology • Version 3 Kinetic Synapse Engine
          </p>
        </div>
      </div>
    </section>
  );
}
