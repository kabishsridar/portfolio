"use client";

import { useState } from "react";
import V3SynapseNavbar from "@/components/v3_synapse/V3SynapseNavbar";
import V3SynapseHero from "@/components/v3_synapse/V3SynapseHero";
import V3SynapseCardCarousel from "@/components/v3_synapse/V3SynapseCardCarousel";
import V3SynapseStatement from "@/components/v3_synapse/V3SynapseStatement";
import V3SynapseSelectedWork from "@/components/v3_synapse/V3SynapseSelectedWork";
import V3SynapseCTA from "@/components/v3_synapse/V3SynapseCTA";
import ResumeModal from "@/components/ResumeModal";

export default function Version3SynapsePage() {
  const [resumeOpen, setResumeOpen] = useState(false);

  const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  return (
    <main className="min-h-screen bg-[#07070d] text-neutral-100 selection:bg-purple-600 selection:text-white font-sans antialiased">
      {/* Floating Navbar */}
      <V3SynapseNavbar onOpenResume={() => setResumeOpen(true)} />

      {/* Hero Section with Live 0.1 mm Optical Metrology Console Card */}
      <V3SynapseHero onOpenResume={() => setResumeOpen(true)} />

      {/* 3D Perspective Kinetic Card Carousel matching portfolio_idea_1.webm */}
      <V3SynapseCardCarousel />

      {/* "Beyond Every Limit" Big Typography Statement with 4-point Sparkle Star */}
      <V3SynapseStatement />

      {/* Selected Deployments with Atmospheric Glow Cards & OM90 Portal Link */}
      <V3SynapseSelectedWork />

      {/* Curved Bottom Metallic Purple CTA Stage */}
      <V3SynapseCTA onOpenResume={() => setResumeOpen(true)} />

      {/* PDF Resume Pop-up Modal with View and Download Actions */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        resumeUrl={`${basePath}/Kabish_Sridar_Resume.pdf`}
      />
    </main>
  );
}
