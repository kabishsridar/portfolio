"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink, Cpu, Eye, Zap, CheckCircle } from "lucide-react";
import { projects } from "@/data/projects";

export default function V3SynapseSelectedWork() {
  return (
    <section id="selected-work" className="relative py-28 bg-[#07070d] overflow-hidden border-t border-purple-900/20">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-[11px] font-mono text-purple-300 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Selected <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">Deployments</span>.
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light">
            Every project represents end-to-end engineering: mathematical modeling, hardware prototyping, edge deployment, and industrial verification.
          </p>
        </div>

        {/* Selected Work Grid matching Atmospheric Gradient Cards from portfolio_idea_1.webm */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const isFlagship = project.id === "gap-measurement";
            return (
              <div
                key={project.id}
                className={`group relative rounded-3xl p-8 bg-gradient-to-b from-[#0e0e1a] to-[#080811] border ${
                  isFlagship ? "border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.15)]" : "border-white/10 hover:border-purple-500/30"
                } transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5`}
              >
                {/* Accent ambient glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-600/10 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                <div>
                  {/* Top tags */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-950/80 text-purple-300 border border-purple-500/30">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-purple-400 mb-4">
                    {project.tagline}
                  </div>

                  <p className="text-sm text-neutral-300/80 font-light leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {project.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-neutral-400">
                        <CheckCircle className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded text-[11px] font-mono bg-black/40 text-neutral-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Row */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-purple-300 hover:text-white transition-colors group/link"
                  >
                    <span>Inspect Full Explanation</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>

                  {project.externalWebsite && (
                    <a
                      href={project.externalWebsite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{project.externalWebsite.label}</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
