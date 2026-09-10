"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Cpu, ExternalLink, GitBranch, Layers, Sparkles, Zap } from "lucide-react";
import { projects, Project } from "@/data/projects";
import V2TiltCard from "./V2TiltCard";
import V2ProjectModal from "./V2ProjectModal";

export default function V2ProjectStack() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  const categories = ["ALL", "VISION", "AUTOMATION", "SYSTEMS"];

  const filteredProjects = projects.filter((p) => {
    if (filter === "ALL") return true;
    if (filter === "VISION") return p.category.includes("Vision") || p.category.includes("Deep");
    if (filter === "AUTOMATION") return p.category.includes("Automation");
    if (filter === "SYSTEMS") return p.category.includes("Systems");
    return true;
  });

  return (
    <section id="v2-projects" className="relative w-full bg-tactical-base py-24 border-b border-tactical-border overflow-hidden">
      {/* Background micro-grid */}
      <div className="absolute inset-0 bg-tactical-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header with Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-tactical-border pb-6 font-mono-tech">
          <div>
            <div className="flex items-center space-x-2 text-xs text-tactical-green tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STACK 02 // KINETIC PROJECT ARCHITECTURE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-tactical-ivory tracking-tight uppercase">
              HARDWARE &amp; AI <span className="text-tactical-green">SCHEMATICS</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 border transition-all uppercase tracking-wider font-semibold ${
                  filter === cat
                    ? "border-tactical-green bg-tactical-green/15 text-tactical-green font-bold shadow-[0_0_12px_rgba(0,255,102,0.3)]"
                    : "border-tactical-border bg-tactical-surface text-tactical-muted hover:text-tactical-ivory"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stacked Sticky Project Cards */}
        <div className="relative space-y-8">
          {filteredProjects.map((project, idx) => {
            const zIndex = 10 + idx;
            return (
              <div
                key={project.id}
                className="sticky top-24 transition-transform duration-300"
                style={{ zIndex }}
              >
                <V2TiltCard
                  tiltMaxAngle={6}
                  glareOpacity={0.18}
                  className="border border-tactical-border bg-tactical-surface/95 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-mono-tech">
                    
                    {/* Left Details (7 Cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      
                      {/* Top Code & Status */}
                      <div className="flex flex-wrap items-center space-x-3 text-xs">
                        <span className="text-tactical-amber font-bold tracking-wider">
                          {project.code}
                        </span>
                        <span className="text-tactical-dim">|</span>
                        <span className="text-tactical-muted uppercase text-[11px]">
                          {project.category}
                        </span>
                        <span className="px-2 py-0.5 border border-tactical-green/40 bg-tactical-green/10 text-tactical-green text-[10px] font-bold">
                          {project.status}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black text-tactical-ivory tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base text-tactical-green font-medium pt-1">
                          {project.tagline}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-tactical-muted leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Metric Callout */}
                      <div className="p-3 border border-tactical-amber/50 bg-tactical-amber/10 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-tactical-amber uppercase block font-semibold">
                            BENCHMARK RESULT
                          </span>
                          <span className="text-xl font-black text-tactical-ivory">
                            {project.keyMetric}
                          </span>
                        </div>
                        <span className="text-right text-[11px] text-tactical-muted max-w-xs">
                          {project.keyMetricLabel}
                        </span>
                      </div>

                      {/* Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 border border-tactical-border/80 bg-tactical-base text-tactical-muted text-[10px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Deep Inspect Trigger */}
                      <div className="pt-2">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="flex items-center space-x-2 px-4 py-2.5 bg-tactical-green text-tactical-base font-extrabold text-xs uppercase hover:bg-tactical-ivory transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)] group"
                        >
                          <span>DEEP INSPECT BLUEPRINT</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>

                    </div>

                    {/* Right Schematics Capsule (5 Cols) */}
                    <div className="lg:col-span-5 border border-tactical-border bg-tactical-base/90 p-5 space-y-3">
                      
                      <div className="flex items-center justify-between border-b border-tactical-border pb-2 text-[10px]">
                        <span className="text-tactical-amber font-bold">SCHEMATIC PREVIEW</span>
                        <span className="text-tactical-dim">0{idx + 1} // 06</span>
                      </div>

                      {/* Architecture Steps */}
                      <div className="space-y-2 text-[11px]">
                        <div className="p-2 border border-tactical-border/60 bg-tactical-surface">
                          <span className="text-[9px] text-tactical-dim block">INPUT STREAM</span>
                          <span className="text-tactical-ivory font-semibold truncate block">
                            {project.architecture.input}
                          </span>
                        </div>
                        <div className="p-2 border border-tactical-border/60 bg-tactical-surface">
                          <span className="text-[9px] text-tactical-amber block">PROCESSING CORE</span>
                          <span className="text-tactical-ivory font-semibold truncate block">
                            {project.architecture.processing}
                          </span>
                        </div>
                        <div className="p-2 border border-tactical-border/60 bg-tactical-surface">
                          <span className="text-[9px] text-tactical-green block">OUTPUT TELEMETRY</span>
                          <span className="text-tactical-ivory font-semibold truncate block">
                            {project.architecture.output}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-tactical-border/60 flex items-center justify-between text-[10px] text-tactical-muted">
                        <span>STATUS: DEPLOYABLE</span>
                        <span className="text-tactical-green font-bold">100% REPRODUCIBLE</span>
                      </div>

                    </div>

                  </div>
                </V2TiltCard>
              </div>
            );
          })}
        </div>

      </div>

      {/* Deep-Dive Blueprint Modal Drawer */}
      <V2ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
