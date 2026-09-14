"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowUpRight,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Activity,
  Cpu,
  Eye,
  FileText,
  Mail,
  ShieldCheck,
  CheckCircle,
  Code2,
  Layers,
  ChevronRight,
  Sliders,
  Download
} from "lucide-react";
import VersionSwitcher from "@/components/VersionSwitcher";
import ResumeModal from "@/components/ResumeModal";
import { projects } from "@/data/projects";
import { profileData } from "@/data/profile";

const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

export default function Version3UserFriendlyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0]>(projects[0]);
  const [measurement, setMeasurement] = useState(0.098);
  const [fps, setFps] = useState(29.8);

  // Optical metrology live flicker
  useEffect(() => {
    const timer = setInterval(() => {
      const delta = (Math.random() - 0.5) * 0.004;
      setMeasurement(prev => +(0.100 + delta).toFixed(3));
      setFps(+(29.5 + Math.random() * 0.8).toFixed(1));
    }, 1100);
    return () => clearInterval(timer);
  }, []);

  // GSAP Smooth Reveal Animations (matching v2 elegance with v3 electric violet styling)
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      gsap.from(".v3-hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".v3-hero-title", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power4.out",
        delay: 0.1,
      });

      gsap.from(".v3-hero-sub", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(".v3-hero-card", {
        opacity: 0,
        scale: 0.94,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.3,
      });

      // 2. Staggered section reveals
      const sections = gsap.utils.toArray<HTMLElement>(".v3-fade-section");
      sections.forEach((sec) => {
        gsap.from(sec, {
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 35,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // 3. Project Cards Stagger
      const cards = gsap.utils.toArray<HTMLElement>(".v3-project-card");
      cards.forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 25,
          duration: 0.6,
          delay: (idx % 3) * 0.1,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "vision") return p.category.includes("Vision");
    if (activeCategory === "industrial") return p.category.includes("Industrial");
    if (activeCategory === "deep") return p.category.includes("Deep") || p.category.includes("OCR") || p.category.includes("Systems");
    return true;
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#07070d] text-neutral-100 font-sans antialiased selection:bg-purple-600 selection:text-white">
      {/* Floating Glassmorphic Pill Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 h-20 border-b border-purple-500/20 bg-[#07070d]/85 backdrop-blur-2xl transition-all flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          
          {/* Logo Brand with Kabish Photo */}
          <div className="flex items-center space-x-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <Image
                src={`${basePath}/kabish.jpg`}
                alt="Kabish Sridar"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                Kabish Sridar
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping inline-block" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-purple-300/80 font-mono">
                Edge AI & Metrology
              </span>
            </div>
          </div>

          {/* Center Smooth Navigation Anchors */}
          <div className="hidden md:flex items-center space-x-1 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/25 text-xs font-medium text-neutral-300">
            <a href="#about" className="px-3 py-1 rounded-full hover:text-white hover:bg-purple-500/20 transition-all">
              About
            </a>
            <a href="#projects" className="px-3 py-1 rounded-full hover:text-white hover:bg-purple-500/20 transition-all">
              Projects ({projects.length})
            </a>
            <a href="#metrology" className="px-3 py-1 rounded-full hover:text-white hover:bg-purple-500/20 transition-all">
              0.1 mm Metrology
            </a>
            <a href="#skills" className="px-3 py-1 rounded-full hover:text-white hover:bg-purple-500/20 transition-all">
              Tech Matrix
            </a>
            <a href="#contact" className="px-3 py-1 rounded-full hover:text-white hover:bg-purple-500/20 transition-all">
              Contact
            </a>
          </div>

          {/* Right: Version Switcher & Actions */}
          <div className="flex items-center space-x-3">
            <VersionSwitcher />

            <button
              onClick={() => setResumeOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileText className="w-3.5 h-3.5 text-purple-200" />
              <span>Resume</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
        {/* Background ambient radial gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-purple-700/25 via-indigo-800/15 to-transparent blur-[160px] rounded-full" />
          <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-purple-900/20 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Headline Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="v3-hero-badge inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>MVP Finalist @ KYC Datathon 2.0 • SRMIST AI/ML (CGPA 8.7)</span>
            </div>

            <h1 className="v3-hero-title text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Systems that <br />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                compute at the edge.
              </span>
            </h1>

            <p className="v3-hero-sub text-base sm:text-lg text-neutral-300/85 max-w-xl font-light leading-relaxed">
              I am <strong className="text-white font-medium">Kabish Sridar</strong>. Connecting deep neural networks with edge micro-controllers, sub-millimeter optical metrology, and industrial automation.
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 backdrop-blur-md">
                <span className="text-[10px] font-mono text-purple-300/80 block uppercase">Optical Spec</span>
                <span className="text-2xl font-mono font-black text-emerald-400 mt-0.5 block">0.1 mm</span>
                <span className="text-[10px] text-neutral-400">Strict Tolerance</span>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 backdrop-blur-md">
                <span className="text-[10px] font-mono text-purple-300/80 block uppercase">Inference</span>
                <span className="text-2xl font-mono font-black text-white mt-0.5 block">30 FPS</span>
                <span className="text-[10px] text-neutral-400">PiCamera v2/v3</span>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 backdrop-blur-md">
                <span className="text-[10px] font-mono text-purple-300/80 block uppercase">Industrial PLC</span>
                <span className="text-2xl font-mono font-black text-purple-300 mt-0.5 block">±0.1%</span>
                <span className="text-[10px] text-neutral-400">ABB AC500 Dosing</span>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 backdrop-blur-md">
                <span className="text-[10px] font-mono text-purple-300/80 block uppercase">Academic</span>
                <span className="text-2xl font-mono font-black text-white mt-0.5 block">8.7</span>
                <span className="text-[10px] text-neutral-400">SRMIST CGPA</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full bg-white text-neutral-950 text-xs font-bold hover:bg-neutral-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.3)] flex items-center gap-2 group"
              >
                <span>Explore Interactive Projects</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="https://om90.in/devices/elongation-detector"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all backdrop-blur-md flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                <span>Visit OM90 Metrology Portal</span>
              </a>
            </div>
          </div>

          {/* Right: Live Session Glassmorphism Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="v3-hero-card w-full max-w-md rounded-3xl bg-gradient-to-b from-white/[0.12] to-white/[0.03] border border-purple-500/30 p-6 backdrop-blur-2xl shadow-[0_20px_70px_rgba(76,29,149,0.35)] relative overflow-hidden">
              {/* Header status */}
              <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-200">
                    Live Telemetry
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                  ACTIVE
                </span>
              </div>

              {/* Profile Card Inside Console */}
              <div className="flex items-center space-x-4 p-3 rounded-2xl bg-black/60 border border-purple-500/20 mb-5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.5)] shrink-0">
                  <Image src={`${basePath}/kabish.jpg`} alt="Kabish Sridar" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Kabish Sridar</h4>
                  <p className="text-xs font-mono text-purple-300">0.1 mm Metrology Lead</p>
                  <p className="text-[11px] text-neutral-400">Raspberry Pi • PiCamera v2/v3</p>
                </div>
              </div>

              {/* Synthetic Optical Caliper Viewport */}
              <div className="rounded-xl bg-[#0a0a16] border border-purple-500/20 p-4 mb-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2">
                  <span>OPTICAL LASER RETICLE</span>
                  <span className="text-emerald-400 font-bold">0.1 mm CALIBRATED</span>
                </div>

                <div className="h-24 rounded-lg bg-black/70 relative overflow-hidden flex items-center justify-center border border-purple-500/20">
                  <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_10px_#f472b6] animate-pulse" />
                  <div className="w-16 h-16 rounded-full border border-dashed border-purple-400/40 flex items-center justify-center animate-spin" style={{ animationDuration: "14s" }}>
                    <div className="w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_6px_#f472b6]" />
                  </div>
                  <div className="absolute bottom-2 left-2 text-[10px] font-mono text-neutral-400">
                    OFFSET: <strong className="text-emerald-400">{measurement} mm</strong>
                  </div>
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono text-purple-300">
                    {fps} FPS
                  </div>
                </div>
              </div>

              {/* Bottom Context Metric */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">Hardware Telemetry</div>
                  <div className="text-[11px] font-mono text-purple-300/80">Continuous PiCamera stream</div>
                </div>
                <div className="font-mono font-bold text-purple-300">38 ms latency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase with Interactive Selection & Detail Drawer */}
      <section id="projects" className="v3-fade-section py-24 px-6 border-t border-purple-500/20 bg-[#06060c]">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Section Header & Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono">
                <Cpu className="w-3.5 h-3.5" />
                <span>INTERACTIVE SHOWCASE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Featured Deployments &amp; Schematics
              </h2>
              <p className="text-neutral-400 text-sm max-w-xl font-light">
                Click any project card to inspect its real-time specification drawer below, or open its full dedicated explanation page.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-purple-950/40 border border-purple-500/25 text-xs">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                  activeCategory === "all" ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]" : "text-neutral-400 hover:text-white"
                }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setActiveCategory("vision")}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                  activeCategory === "vision" ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]" : "text-neutral-400 hover:text-white"
                }`}
              >
                Vision &amp; Metrology
              </button>
              <button
                onClick={() => setActiveCategory("industrial")}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                  activeCategory === "industrial" ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]" : "text-neutral-400 hover:text-white"
                }`}
              >
                Industrial PLC
              </button>
              <button
                onClick={() => setActiveCategory("deep")}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                  activeCategory === "deep" ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]" : "text-neutral-400 hover:text-white"
                }`}
              >
                OCR / Systems
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => {
              const isSelected = selectedProject.id === p.id;
              const isFlagship = p.id === "gap-measurement";
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProject(p);
                    const el = document.getElementById("v3-project-drawer");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={`v3-project-card group p-7 rounded-3xl bg-gradient-to-b from-[#100c22] via-[#090814] to-black border transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 relative overflow-hidden ${
                    isSelected
                      ? "border-purple-400 bg-purple-950/20 shadow-[0_0_40px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/50"
                      : "border-white/10 hover:border-purple-500/40"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-purple-400 font-semibold">{p.code}</span>
                      <div className="flex items-center gap-1.5">
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-500 text-white text-[10px] font-black uppercase tracking-wider">
                            ACTIVE
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 text-[10px]">
                          {p.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors leading-snug">
                      {p.title}
                    </h3>

                    <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-3">
                      {p.summary}
                    </p>
                  </div>

                  <div className="pt-6 space-y-4">
                    {/* Key Benchmark Pill */}
                    <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/25 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-purple-300/80 uppercase">Key Spec</span>
                      <span className="text-xs font-mono font-black text-emerald-400">{p.keyMetric}</span>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {p.stack.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded bg-black/60 text-[10px] font-mono text-neutral-500">
                          +{p.stack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons: Display and Full Explanation */}
                    <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(p);
                          const el = document.getElementById("v3-project-drawer");
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 ${
                          isSelected
                            ? "bg-purple-600 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.7)]"
                            : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isSelected ? "Inspecting" : "Inspect Specs"}</span>
                      </button>

                      <Link
                        href={`/projects/${p.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="py-2 px-3 rounded-lg text-xs font-medium bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-white transition-all border border-purple-500/30 flex items-center space-x-1"
                        title="Open Dedicated Full Page Explanation"
                      >
                        <span>Full Page</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Interactive Architecture Drawer of Selected Project */}
          {selectedProject && (
            <div
              id="v3-project-drawer"
              key={selectedProject.id}
              className="scroll-mt-24 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#130e28] to-[#0a0715] border border-purple-500/40 space-y-6 shadow-[0_0_50px_rgba(168,85,247,0.2)] animate-in fade-in zoom-in-95 duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-purple-400 font-mono font-medium">{selectedProject.code}</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-bold uppercase">
                      ACTIVE BLUEPRINT
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-3">
                  {selectedProject.externalWebsite && (
                    <a
                      href={selectedProject.externalWebsite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs flex items-center space-x-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{selectedProject.externalWebsite.label}</span>
                    </a>
                  )}

                  <Link
                    href={`/projects/${selectedProject.id}`}
                    className="px-5 py-2 rounded-full bg-white text-neutral-950 font-bold text-xs hover:bg-neutral-200 transition-all flex items-center space-x-1.5 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  >
                    <span>Open Full Page &rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Blueprint Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-black/60 border border-purple-500/20 space-y-2">
                  <span className="text-xs font-mono text-purple-300 uppercase tracking-wider block">
                    Execution Architecture
                  </span>
                  <div className="text-xs text-neutral-300/90 space-y-1.5">
                    <p><strong className="text-white">Input:</strong> {selectedProject.architecture.input}</p>
                    <p><strong className="text-white">Processing:</strong> {selectedProject.architecture.processing}</p>
                    <p><strong className="text-white">Hardware:</strong> {selectedProject.architecture.hardwareOrStorage}</p>
                    <p><strong className="text-white">Output:</strong> {selectedProject.architecture.output}</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-purple-500/20 space-y-2">
                  <span className="text-xs font-mono text-purple-300 uppercase tracking-wider block">
                    Benchmarked Specifications
                  </span>
                  <div className="space-y-1.5">
                    {selectedProject.specs.slice(0, 4).map((s) => (
                      <div key={s.label} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                        <span className="text-neutral-400">{s.label}</span>
                        <span className="font-mono font-bold text-purple-200">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-purple-500/20 space-y-2">
                  <span className="text-xs font-mono text-purple-300 uppercase tracking-wider block">
                    Field Highlights
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-300 font-light">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* "Beyond Every Limit" Statement & Verified Metrics Section */}
      <section id="metrology" className="v3-fade-section py-28 px-6 bg-[#07070d] border-t border-purple-500/20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          
          {/* Central glowing 4-point sparkle star */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-tr from-purple-500 via-fuchsia-400 to-white p-1 shadow-[0_0_60px_rgba(168,85,247,0.7)] flex items-center justify-center">
            <div className="w-full h-full bg-[#090814] rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Engineered for precision. <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
              Built beyond every limit.
            </span>
          </h2>

          <p className="mt-4 text-base text-neutral-300 max-w-xl mx-auto font-light leading-relaxed">
            Deterministic physical engineering: 0.1 mm tolerance on the OM90 elongation detector, zero write-latency edge tracking, and robust PLC closed-loop gating.
          </p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 backdrop-blur-xl">
              <span className="text-3xl font-mono font-black text-emerald-400">0.1 mm</span>
              <span className="text-xs font-mono uppercase text-purple-300 block mt-1 font-bold">Metrology Tolerance</span>
              <p className="text-xs text-neutral-400 mt-2 font-light">Calibrated edge contouring on Raspberry Pi with PiCamera v2/v3.</p>
            </div>

            <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 backdrop-blur-xl">
              <span className="text-3xl font-mono font-black text-white">30 FPS</span>
              <span className="text-xs font-mono uppercase text-purple-300 block mt-1 font-bold">Edge Video Stream</span>
              <p className="text-xs text-neutral-400 mt-2 font-light">Real-time inference pipeline with zero storage bottleneck.</p>
            </div>

            <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 backdrop-blur-xl">
              <span className="text-3xl font-mono font-black text-purple-300">MVP Finalist</span>
              <span className="text-xs font-mono uppercase text-purple-300 block mt-1 font-bold">KYC Datathon 2.0</span>
              <p className="text-xs text-neutral-400 mt-2 font-light">National recognition for multi-subject computer vision and face parsing.</p>
            </div>

            <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 backdrop-blur-xl">
              <span className="text-3xl font-mono font-black text-white">8.7 CGPA</span>
              <span className="text-xs font-mono uppercase text-purple-300 block mt-1 font-bold">Academic Rigor</span>
              <p className="text-xs text-neutral-400 mt-2 font-light">B.Tech Computer Science &amp; Engineering (AI &amp; ML) at SRMIST.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Matrix Skills Section */}
      <section id="skills" className="v3-fade-section py-24 px-6 bg-[#06060c] border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">HARDWARE &amp; SOFTWARE MATRIX</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Verified Engineering Toolchain</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-black/60 border border-purple-500/20 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Edge Silicon &amp; Hardware</h3>
              <div className="flex flex-wrap gap-1.5">
                {["Raspberry Pi", "PiCamera v2/v3", "ESP32 SoC", "ABB AC500 PLC", "Ethernet / Modbus", "PWM Motor ESC"].map(t => (
                  <span key={t} className="px-2.5 py-1 rounded text-xs font-mono bg-purple-950/40 text-neutral-200 border border-purple-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black/60 border border-purple-500/20 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Computer Vision &amp; AI</h3>
              <div className="flex flex-wrap gap-1.5">
                {["OpenCV", "DeepFace", "CRNN + CTC Loss", "CLAHE Filtering", "Sub-Pixel Calipers", "Homography Matrix"].map(t => (
                  <span key={t} className="px-2.5 py-1 rounded text-xs font-mono bg-purple-950/40 text-neutral-200 border border-purple-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black/60 border border-purple-500/20 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Languages &amp; Runtimes</h3>
              <div className="flex flex-wrap gap-1.5">
                {["Python", "C++", "C", "HTML", "CSS", "JavaScript", "SQL", "Bash", "FastAPI", "Docker"].map(t => (
                  <span key={t} className="px-2.5 py-1 rounded text-xs font-mono bg-purple-950/40 text-neutral-200 border border-purple-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curved Metallic Purple CTA Stage with Kabish Portrait */}
      <section id="contact" className="v3-fade-section py-28 px-6 bg-[#07070d] border-t border-purple-500/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#180e30] via-[#100a20] to-[#07050d] border border-purple-500/40 p-8 sm:p-14 backdrop-blur-2xl shadow-[0_20px_90px_rgba(168,85,247,0.35)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-28 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />

          {/* Profile Photo */}
          <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-purple-400/80 shadow-[0_0_35px_rgba(168,85,247,0.7)]">
            <Image src={`${basePath}/kabish.jpg`} alt="Kabish Sridar" fill className="object-cover" />
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-[11px] font-mono text-purple-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>KABISH SRIDAR // AVAILABLE FOR HIRE & RESEARCH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Ready to construct <br />
            <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-fuchsia-300 bg-clip-text text-transparent">
              high-reliability systems?
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-300/85 max-w-lg mx-auto font-light leading-relaxed">
            Reach out directly for edge computer vision models, sub-millimeter metrology calibration, or industrial automation firmware.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profileData.contact.email}`}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-sm transition-all shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center gap-2 group"
            >
              <Mail className="w-4 h-4" />
              <span>Contact via Email</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={() => setResumeOpen(true)}
              className="px-7 py-3.5 rounded-full bg-purple-900/50 hover:bg-purple-900/70 border border-purple-500/40 text-purple-200 font-semibold text-sm transition-all backdrop-blur-md flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Inspect PDF Resume</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="mt-10 pt-6 border-t border-purple-500/20 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-400">
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
              <span>GitHub ({profileData.contact.githubHandle})</span>
            </a>
            <span className="text-neutral-600">•</span>
            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
              <span>LinkedIn</span>
            </a>
            <span className="text-neutral-600">•</span>
            <a
              href="https://om90.in/devices/elongation-detector"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-300 transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>OM90 Portal</span>
            </a>
          </div>
        </div>
      </section>

      {/* PDF Resume Pop-up Modal with View and Download Actions */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        resumeUrl={`${basePath}/Kabish_Sridar_Resume.pdf`}
      />
    </div>
  );
}
function ArrowDownRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="7" y1="7" x2="17" y2="17" />
      <polyline points="17 7 17 17 7 17" />
    </svg>
  );
}
