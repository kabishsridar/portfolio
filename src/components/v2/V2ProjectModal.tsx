"use client";

import { useEffect } from "react";
import { X, CheckCircle2, GitBranch, Cpu, Activity, ShieldCheck, Zap } from "lucide-react";
import { Project } from "@/data/projects";

interface V2ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function V2ProjectModal({ project, onClose }: V2ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-tactical-base/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-tactical-surface border border-tactical-green shadow-[0_0_50px_rgba(0,255,102,0.2)] flex flex-col font-mono-tech overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-tactical-base border-b border-tactical-border">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-tactical-green animate-ping" />
            <span className="text-tactical-ivory font-bold text-sm tracking-wider uppercase">
              {project.code} // ARCHITECTURAL DOSSIER
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-tactical-muted hover:text-tactical-green border border-tactical-border hover:border-tactical-green transition-all"
            title="Close Drawer (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs text-tactical-ivory">
          
          {/* Header Title & Tagline */}
          <div className="space-y-2 border-b border-tactical-border pb-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-0.5 bg-tactical-green/15 text-tactical-green border border-tactical-green/50 text-[10px] font-bold">
                {project.status}
              </span>
              <span className="text-tactical-muted uppercase text-[11px]">
                {project.category}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-tactical-ivory tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-tactical-amber font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Key Metric Spotlight */}
          <div className="p-4 border border-tactical-amber/50 bg-tactical-amber/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-tactical-amber uppercase block">
                BENCHMARK METRIC
              </span>
              <span className="text-2xl font-black text-tactical-ivory">
                {project.keyMetric}
              </span>
            </div>
            <span className="text-right text-xs text-tactical-muted max-w-xs">
              {project.keyMetricLabel}
            </span>
          </div>

          {/* Architecture Pipeline Breakdown */}
          <div className="space-y-2 border border-tactical-border bg-tactical-base p-4">
            <div className="flex items-center space-x-2 text-tactical-green font-bold text-xs pb-2 border-b border-tactical-border">
              <GitBranch className="w-4 h-4" />
              <span>DETERMINISTIC PIPELINE FLOW</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="p-2.5 border border-tactical-border/60 bg-tactical-surface">
                <span className="text-[9px] text-tactical-dim block">01 // INGESTION</span>
                <span className="font-semibold text-tactical-ivory">{project.architecture.input}</span>
              </div>
              <div className="p-2.5 border border-tactical-border/60 bg-tactical-surface">
                <span className="text-[9px] text-tactical-amber block">02 // INFERENCE</span>
                <span className="font-semibold text-tactical-ivory">{project.architecture.processing}</span>
              </div>
              <div className="p-2.5 border border-tactical-border/60 bg-tactical-surface">
                <span className="text-[9px] text-tactical-green block">03 // STORAGE/ACT</span>
                <span className="font-semibold text-tactical-ivory">{project.architecture.hardwareOrStorage}</span>
              </div>
              <div className="p-2.5 border border-tactical-border/60 bg-tactical-surface">
                <span className="text-[9px] text-tactical-dim block">04 // TELEMETRY</span>
                <span className="font-semibold text-tactical-ivory">{project.architecture.output}</span>
              </div>
            </div>
          </div>

          {/* Engineering Highlights */}
          <div className="space-y-2">
            <h3 className="text-xs text-tactical-amber font-bold uppercase tracking-wider">
              KEY ENGINEERING MILESTONES:
            </h3>
            <ul className="space-y-2 text-tactical-muted">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start space-x-2 text-xs leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-tactical-green shrink-0 mt-0.5" />
                  <span className="text-tactical-ivory/90">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Technical Specifications */}
          <div className="space-y-2">
            <h3 className="text-xs text-tactical-green font-bold uppercase tracking-wider">
              HARDWARE &amp; RUNTIME SPECIFICATIONS:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.specs.map((spec, i) => (
                <div key={i} className="p-2.5 border border-tactical-border/60 bg-tactical-surface flex justify-between">
                  <span className="text-tactical-dim text-[10px] uppercase">{spec.label}</span>
                  <span className="text-tactical-ivory font-semibold text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack Badges */}
          <div className="pt-2 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="px-2.5 py-1 border border-tactical-border bg-tactical-base text-tactical-muted text-[11px]">
                {s}
              </span>
            ))}
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 bg-tactical-base border-t border-tactical-border flex items-center justify-between text-[11px] text-tactical-dim">
          <span>KABISH SRIDAR // PORTFOLIO V2 KINETIC</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-tactical-green text-tactical-base font-bold text-xs uppercase hover:bg-tactical-ivory transition-colors"
          >
            DISMISS
          </button>
        </div>

      </div>
    </div>
  );
}
