"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Cpu,
  CheckCircle2,
  Activity,
  Layers,
  Terminal,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Share2
} from "lucide-react";
import { Project } from "@/data/projects";

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <main className="min-h-screen bg-[#0a0c10] text-[#e6edf3] font-sans selection:bg-emerald-500 selection:text-black py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <Link
            href="/v4#projects"
            className="inline-flex items-center space-x-2 text-xs font-medium text-neutral-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects Matrix</span>
          </Link>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              {project.status}
            </span>
            <span className="text-[11px] font-mono text-neutral-400 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
              {project.code}
            </span>
          </div>
        </div>

        {/* Header Block */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-mono font-medium">
            <span>{project.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-neutral-300 font-normal leading-relaxed">
            {project.tagline}
          </p>

          {/* Key Metric Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-emerald-300 font-mono uppercase tracking-wider block font-medium">
                Verified Benchmark Telemetry
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white">
                {project.keyMetric}
              </span>
            </div>
            <div className="text-right text-xs text-neutral-300 max-w-sm sm:text-right">
              {project.keyMetricLabel}
            </div>
          </div>
        </div>

        {/* Dedicated Live External Deployment Portal (For Elongation Detector / Gap Measurement) */}
        {project.externalWebsite && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/15 via-emerald-500/15 to-transparent border border-blue-500/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-blue-400 text-xs font-semibold">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="uppercase tracking-wider">Official Dedicated Device Website</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
                LIVE PRODUCTION
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                {project.externalWebsite.label}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
                {project.externalWebsite.description}
              </p>
            </div>

            <div>
              <a
                href={project.externalWebsite.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(59,130,246,0.35)] group"
              >
                <span>Visit Device Portal ({project.externalWebsite.url.replace("https://", "")})</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        )}

        {/* Project In-Depth Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span>Problem &amp; Engineering Solution</span>
          </h2>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-sm text-neutral-300 leading-relaxed space-y-4">
            <p>{project.summary}</p>
          </div>
        </div>

        {/* 4-Stage Architectural Pipeline */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Layers className="w-5 h-5 text-teal-300" />
            <span>System Pipeline &amp; Data Flow Architecture</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2">
              <span className="text-[10px] text-neutral-500 font-bold block">01 // INGESTION</span>
              <p className="text-white font-medium">{project.architecture.input}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-emerald-500/20 bg-emerald-500/[0.03] space-y-2">
              <span className="text-[10px] text-emerald-400 font-bold block">02 // COMPUTATION</span>
              <p className="text-white font-medium">{project.architecture.processing}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-cyan-500/20 bg-cyan-500/[0.03] space-y-2">
              <span className="text-[10px] text-cyan-400 font-bold block">03 // HARDWARE / STORAGE</span>
              <p className="text-white font-medium">{project.architecture.hardwareOrStorage}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-purple-500/20 bg-purple-500/[0.03] space-y-2">
              <span className="text-[10px] text-purple-400 font-bold block">04 // ATTESTATION &amp; OUTPUT</span>
              <p className="text-white font-medium">{project.architecture.output}</p>
            </div>
          </div>
        </div>

        {/* Technical Specifications Matrix */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <span>Hardware &amp; Software Specifications</span>
          </h2>

          <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-white/[0.02]">
            <table className="w-full text-left text-xs">
              <tbody className="divide-y divide-white/[0.06]">
                {project.specs.map((spec, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-5 text-neutral-400 font-medium w-1/3">
                      {spec.label}
                    </td>
                    <td className="py-3 px-5 text-neutral-200 font-mono">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Engineering Highlights */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Key Engineering Distinctions</span>
          </h2>

          <div className="space-y-3">
            {project.highlights.map((h, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-start space-x-3 text-xs sm:text-sm text-neutral-300 leading-relaxed"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
            Verified Technologies Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA & Footer Return */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/v4#projects"
            className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.12] transition-all flex items-center space-x-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>

          <Link
            href="/v4#contact"
            className="px-6 py-2.5 rounded-full text-xs font-semibold bg-emerald-400 text-neutral-950 hover:bg-emerald-300 transition-all flex items-center space-x-2 shadow-sm"
          >
            <span>Inquire About Collaboration</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
