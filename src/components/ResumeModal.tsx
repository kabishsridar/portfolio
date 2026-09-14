"use client";

import { X, Download, ExternalLink, FileText } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
}

export default function ResumeModal({ isOpen, onClose, resumeUrl }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl h-[90vh] bg-[#0c1017] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#e6edf3]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#080b11]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                Kabish Sridar — Official Resume
              </h3>
              <p className="text-[11px] text-neutral-400">
                AI/ML Engineer &amp; Embedded Hardware Systems Builder
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={resumeUrl}
              download="Kabish_Sridar_Resume.pdf"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-400 text-neutral-950 hover:bg-emerald-300 transition-colors shadow-sm"
              title="Download verified PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-colors ml-1"
              title="Close viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="relative flex-1 w-full h-full bg-[#161b22]">
          <iframe
            src={`${resumeUrl}#toolbar=0&navpanes=0`}
            className="w-full h-full border-none"
            title="Kabish Sridar Resume PDF"
          />
        </div>

        {/* Modal Footer Note */}
        <div className="px-5 py-2.5 bg-[#080b11] border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <span>SRMIST CSE (AI &amp; ML) • BATCH 2025–2029 • CGPA 8.7</span>
          <span className="text-emerald-400 font-semibold">VERIFIED RECORD</span>
        </div>

      </div>
    </div>
  );
}
