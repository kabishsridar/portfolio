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
  Sliders,
  ChevronRight,
  ChevronDown,
  Layers,
  Terminal as TerminalIcon,
  Compass,
  Award
} from "lucide-react";
import VersionSwitcher from "@/components/VersionSwitcher";
import ResumeModal from "@/components/ResumeModal";
import { projects } from "@/data/projects";
import { profileData } from "@/data/profile";

const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

export default function V4ValentinDesign() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState("Good day!");
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  // Valentin's signature sliding dynamic focus tags
  const focusAreas = [
    "Optical Metrology",
    "Edge AI Vision",
    "PLC Automation",
    "Robotics",
    "Embedded ML"
  ];

  // Dynamic time greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning!");
    else if (hour < 17) setGreeting("Good afternoon!");
    else setGreeting("Good evening!");
  }, []);

  // Kinetic ticker cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % focusAreas.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [focusAreas.length]);

  // Smooth Lenis + Parallax Cursor on Hero
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Subtle 3D mouse parallax on the hero image (Valentin Cheval depth feel)
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroImageRef.current) return;
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2;
      const yNorm = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(heroImageRef.current, {
        rotateY: xNorm * 5,
        rotateX: -yNorm * 5,
        x: xNorm * 12,
        y: yNorm * 8,
        duration: 1.2,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // GSAP ScrollTrigger Animations for sections
    const ctx = gsap.context(() => {
      // Intro lines reveal
      gsap.from(".vc-fade-up", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });

      // Section triggers
      const sections = gsap.utils.toArray<HTMLElement>(".vc-section-reveal");
      sections.forEach((sec) => {
        gsap.from(sec, {
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const selectedProject = projects[activeProjectIdx] || projects[0];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0c0d10] text-white selection:bg-[#ff3d00] selection:text-white font-sans antialiased overflow-x-hidden"
      style={{
        backgroundImage: `radial-gradient(ellipse at 80% 20%, rgba(255,61,0,0.04) 0%, transparent 60%)`,
      }}
    >
      {/* ========================================================================= */}
      {/* 1. VALENTIN CHEVAL SIGNATURE HEADER                                       */}
      {/* ========================================================================= */}
      <header className="fixed top-0 inset-x-0 z-50 h-20 border-b border-white/[0.08] bg-[#0c0d10]/85 backdrop-blur-2xl transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-full flex items-center justify-between">
          
          {/* Logo / Greeting */}
          <Link href="/v4" className="flex items-center space-x-3 group">
            <div className="flex flex-col">
              <span className="text-[11px] text-white/50 tracking-wide font-mono">
                {greeting}
              </span>
              <div className="flex items-baseline space-x-1 text-sm font-semibold tracking-tight text-white group-hover:text-[#ff3d00] transition-colors">
                <span>Kabish</span>
                <span className="text-white/40 font-normal">Sridar</span>
              </div>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-[#ff3d00]/30 bg-[#ff3d00]/10 text-[#ff3d00]">
              v4 Valentin
            </span>
          </Link>

          {/* Socials Link Bar */}
          <div className="hidden md:flex items-center space-x-2 text-xs text-white/60 font-mono">
            <span className="text-white/30">Socials /</span>
            <a
              href="https://www.linkedin.com/in/kabish-sridar-20587437b"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              li
            </a>
            <span className="text-white/30">/</span>
            <a
              href="https://github.com/kabishsridar"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              gh
            </a>
            <span className="text-white/30">/</span>
            <a
              href={`mailto:${profileData.contact.email}`}
              className="hover:text-white transition-colors"
            >
              em
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-wider text-white/70">
            <a href="#hero" className="hover:text-white transition-colors">
              Index <span className="text-white/30">/</span>
            </a>
            <a href="#intro" className="hover:text-white transition-colors">
              About <span className="text-white/30">/</span>
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Projects
            </a>
          </nav>

          {/* Right Actions: Version Switcher & CTA */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <VersionSwitcher />

            <button
              onClick={() => setIsResumeOpen(true)}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-white/15 bg-white/5 hover:border-white/40 text-white transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            <a
              href={`mailto:${profileData.contact.email}`}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#ff3d00] hover:bg-[#ff5722] text-white shadow-[0_0_20px_rgba(255,61,0,0.35)] transition-all"
            >
              <span>Let&apos;s talk!</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION — EXACT VALENTIN CHEVAL ARCHITECTURE & DEPTH             */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative min-h-screen pt-28 pb-16 px-6 sm:px-10 flex flex-col justify-between overflow-hidden"
      >
        {/* Ambient background glow & grid accent */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#ff3d00]/5 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 flex-1 my-auto">
          
          {/* Left Column: Signature Scope, Bio, & Awards */}
          <div className="lg:col-span-6 space-y-8 vc-fade-up">
            
            {/* Scope of Practice Bar */}
            <div className="space-y-2 border-l border-white/10 pl-4 py-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#ff3d00]">
                Disciplines &amp; Scope
              </span>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/70 font-mono">
                <li>• Edge Computer Vision</li>
                <li>• Optical Metrology</li>
                <li>• Industrial PLC</li>
                <li>• Autonomous Systems</li>
              </ul>
            </div>

            {/* Intro Lead */}
            <p className="text-sm sm:text-base text-white/70 max-w-lg font-light leading-relaxed">
              I&apos;m an award-finalist AI/ML &amp; Embedded Systems Engineer. I architect hardware-software solutions for high-precision optical metrology, automated factory PLCs, and sub-millimeter edge perception.
            </p>

            {/* Main Typographic Headline with 3D Kinetic Ticker */}
            <div className="space-y-1 pt-2">
              <p className="text-xs uppercase tracking-widest text-white/40 font-mono">
                Hi there! this is Kabish Sridar
              </p>
              
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white uppercase leading-[1.02]">
                Engineering
                <br />
                <span className="text-white/40">for</span>{" "}
                <span className="inline-block relative h-[1.1em] overflow-hidden align-top text-[#ff3d00] font-black">
                  <span
                    key={tickerIndex}
                    className="inline-block animate-in slide-in-from-bottom-6 duration-500"
                  >
                    {focusAreas[tickerIndex]}
                  </span>
                </span>
              </h1>
            </div>

            {/* Verified Achievements & Credential Badges */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-mono text-white/40">
                  Precision Tol.
                </span>
                <p className="text-xl font-bold text-white tracking-tight">0.1 mm</p>
                <span className="text-[11px] text-white/50 block">PiCam Sub-Pixel Metrology</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-mono text-white/40">
                  Recognition
                </span>
                <p className="text-xl font-bold text-[#ff3d00] tracking-tight">MVP Finalist</p>
                <span className="text-[11px] text-white/50 block">KYC Datathon 2.0</span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase tracking-wider font-mono text-white/40">
                  Hardware Control
                </span>
                <p className="text-xl font-bold text-white tracking-tight">ABB AC500</p>
                <span className="text-[11px] text-white/50 block">IEC 61131-3 PLC Automation</span>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-2 flex items-center space-x-4">
              <a
                href="#projects"
                className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#ff3d00] hover:text-white transition-colors group"
              >
                <span>(Scroll down to explore work)</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Seated Hero Portrait with Valentin Cheval Depth Aesthetic */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <div
              ref={heroImageRef}
              className="relative w-full max-w-[460px] aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#111216] transition-transform will-change-transform group"
            >
              {/* Generated Portrait: Kabish in Black Suit, Coolers, Seated in Emerald Chair */}
              <Image
                src={`${basePath}/kabish_valentin_v4.jpg`}
                alt="Kabish Sridar in tailored black suit and coolers — Valentin Cheval style"
                fill
                priority
                className="object-cover object-center filter contrast-[1.05] brightness-[0.98] group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 500px"
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-transparent opacity-85" />
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />

              {/* Bottom Badge inside Portrait */}
              <div className="absolute bottom-5 inset-x-5 p-4 rounded-xl bg-black/75 backdrop-blur-xl border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff3d00] block">
                    SRM Institute of Science and Technology
                  </span>
                  <p className="text-xs font-semibold text-white">B.Tech CSE (AI &amp; ML) • CGPA 8.7</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff3d00] animate-pulse" />
              </div>
            </div>
          </div>

        </div>

        {/* Hero Bottom Bar */}
        <div className="max-w-7xl w-full mx-auto pt-8 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/40 font-mono">
          <span>CHENNAI, INDIA • 10.7905° N, 78.7047° E</span>
          <span className="text-white/60">AVAILABLE FOR ROLES &amp; INDUSTRIAL CONTRACTS</span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ABOUT & PHILOSOPHY — VALENTIN'S EDITORIAL INTRO                       */}
      {/* ========================================================================= */}
      <section id="intro" className="vc-section-reveal py-28 px-6 sm:px-10 border-t border-white/10 bg-[#0e0f13]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff3d00]">
              (Intro &amp; Philosophy)
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              Precision is not an afterthought; it is the architecture.
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-6 text-base text-white/70 font-light leading-relaxed">
            <p>
              Embedded systems and edge AI operate at the physical boundary where software algorithms encounter physical inertia, mechanical jitter, and sensor noise. 
            </p>
            <p>
              Whether calibrating homography matrices for <strong>0.1 mm zero-contact optical metrology</strong> using Raspberry Pi and PiCamera v2/v3, or programming cyclical Structured Text routines on an <strong>ABB AC500 PLC</strong> for high-tonnage batch scaling, I engineer fault-tolerant, deterministic platforms built for real-world field conditions.
            </p>

            {/* Metric Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="text-3xl sm:text-4xl font-black text-white block tracking-tight">
                  30 <span className="text-lg text-[#ff3d00]">FPS</span>
                </span>
                <span className="text-xs text-white/50 font-mono uppercase tracking-wider block mt-1">
                  Real-time Edge Vector Extraction
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-black text-white block tracking-tight">
                  ±0.1<span className="text-lg text-[#ff3d00]">%</span>
                </span>
                <span className="text-xs text-white/50 font-mono uppercase tracking-wider block mt-1">
                  Feed Batch Scaling Accuracy
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-black text-white block tracking-tight">
                  93.8<span className="text-lg text-[#ff3d00]">%</span>
                </span>
                <span className="text-xs text-white/50 font-mono uppercase tracking-wider block mt-1">
                  YOLOv8 Instance Segmentation mAP
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SELECTED WORKS (PORTFOLIO SHOWCASE)                                    */}
      {/* ========================================================================= */}
      <section id="projects" className="vc-section-reveal py-28 px-6 sm:px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff3d00]">
                Projects I engineered 2024–2026 (Portfolio)
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
                Featured Engineering Systems
              </h2>
            </div>

            {/* Project Index Counter Indicator */}
            <div className="text-xs font-mono text-white/50">
              0{activeProjectIdx + 1} / 0{projects.length}
            </div>
          </div>

          {/* Interactive Project List (Valentin Cheval Style) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Project Selector List (Left) */}
            <div className="lg:col-span-5 space-y-2">
              {projects.map((proj, idx) => {
                const isActive = idx === activeProjectIdx;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`w-full text-left p-5 rounded-xl transition-all flex items-center justify-between border ${
                      isActive
                        ? "bg-white/[0.06] border-[#ff3d00]/50 text-white shadow-lg"
                        : "bg-transparent border-white/[0.06] text-white/50 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                        {proj.code}
                      </span>
                      <p className="text-base font-semibold tracking-tight">{proj.title}</p>
                      <span className="text-xs text-white/40 font-mono block">
                        {proj.category}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isActive && (
                        <span className="text-xs font-mono text-[#ff3d00] font-bold">
                          [ACTIVE]
                        </span>
                      )}
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isActive ? "rotate-90 text-[#ff3d00]" : "text-white/30"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Project Full Dossier Card (Right) */}
            <div className="lg:col-span-7 bg-[#111216] border border-white/10 rounded-2xl p-8 space-y-8 shadow-2xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#ff3d00] block">
                    {selectedProject.code} • {selectedProject.status}
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                    Key Benchmark
                  </span>
                  <span className="text-sm font-bold text-[#ff3d00]">
                    {selectedProject.keyMetric}
                  </span>
                </div>
              </div>

              {/* Tagline & Summary */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-white/90">
                  {selectedProject.tagline}
                </p>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  {selectedProject.summary}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                  Hardware &amp; Implementation Specifications
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-black/40 border border-white/[0.06] space-y-0.5"
                    >
                      <span className="text-[10px] font-mono text-white/40 block">
                        {spec.label}
                      </span>
                      <span className="text-xs font-semibold text-white/90">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Dataflow */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                  Dataflow Pipeline
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-white/70">
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white">
                    {selectedProject.architecture.input}
                  </span>
                  <span>→</span>
                  <span className="px-2 py-1 rounded bg-[#ff3d00]/10 border border-[#ff3d00]/30 text-[#ff3d00]">
                    {selectedProject.architecture.processing}
                  </span>
                  <span>→</span>
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white">
                    {selectedProject.architecture.output}
                  </span>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* External website if present */}
              {selectedProject.externalWebsite && (
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={selectedProject.externalWebsite.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-[#ff3d00] hover:text-white transition-colors"
                  >
                    <span>Visit {selectedProject.externalWebsite.label}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HARDWARE LAB ARSENAL & TOOLCHAIN                                      */}
      {/* ========================================================================= */}
      <section className="vc-section-reveal py-24 px-6 sm:px-10 border-t border-white/10 bg-[#0e0f13]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff3d00]">
              Hardware Workbench &amp; Toolchain
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              Proven Silicon &amp; Control Equipment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#ff3d00]/10 border border-[#ff3d00]/30 flex items-center justify-center text-[#ff3d00]">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Edge Vision &amp; Optics</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Calibrated PiCamera v2/v3 rigs, homography checkerboard correction matrices, sub-pixel edge interpolation, and real-time inference on edge processors.
              </p>
              <span className="text-[11px] font-mono text-white/40 block">
                OpenCV • YOLOv8 • DeepFace
              </span>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#ff3d00]/10 border border-[#ff3d00]/30 flex items-center justify-center text-[#ff3d00]">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Industrial Automation</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                ABB AC500 PLC programming with cyclic Structured Text (ST) under IEC 61131-3, Modbus TCP/IP fieldbus communication, and fail-safe safety interlocks.
              </p>
              <span className="text-[11px] font-mono text-white/40 block">
                ABB AC500 • Automation Builder • Modbus
              </span>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#ff3d00]/10 border border-[#ff3d00]/30 flex items-center justify-center text-[#ff3d00]">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Microcontrollers &amp; Edge</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                ESP32 dual-core real-time firmware, Raspberry Pi headless compute hosts, FreeRTOS task scheduling, and secure local encrypted storage ledgers.
              </p>
              <span className="text-[11px] font-mono text-white/40 block">
                ESP32 • Raspberry Pi • Linux • Docker
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CALL TO ACTION & FOOTER (VALENTIN CHEVAL STYLE)                        */}
      {/* ========================================================================= */}
      <footer id="contact" className="vc-section-reveal py-28 px-6 sm:px-10 border-t border-white/10 bg-[#090a0d]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff3d00]">
              Get in touch
            </span>
            <a
              href={`mailto:${profileData.contact.email}`}
              className="group block text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white hover:text-[#ff3d00] transition-colors uppercase break-all leading-none"
            >
              {profileData.contact.email}
            </a>
            <p className="text-sm text-white/50 max-w-lg font-light">
              Available for full-time engineering roles, research collaborations, and industrial embedded AI contracts.
            </p>
          </div>

          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs font-mono text-white/40">
            <div className="flex items-center space-x-4">
              <span className="text-white">KABISH SRIDAR</span>
              <span>© {new Date().getFullYear()}</span>
              <span>CHENNAI, TAMIL NADU</span>
            </div>

            <div className="flex items-center space-x-6">
              <a
                href="https://www.linkedin.com/in/kabish-sridar-20587437b"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/kabishsridar"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <button
                onClick={() => setIsResumeOpen(true)}
                className="hover:text-white transition-colors uppercase"
              >
                Resume PDF
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Official Resume PDF Popup Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        resumeUrl={`${basePath}/Kabish_Sridar_Resume.pdf`}
      />
    </div>
  );
}
