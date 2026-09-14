"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowUpRight,
  ChevronDown,
  Terminal,
  Cpu,
  Eye,
  Award,
  BookOpen,
  Mail,
  CheckCircle,
  Sparkles,
  ExternalLink,
  Code2,
  FileText,
  Layers,
  Activity,
  Layers3
} from "lucide-react";
import VersionSwitcher from "@/components/VersionSwitcher";
import ResumeModal from "@/components/ResumeModal";
import { profileData } from "@/data/profile";
import { projects } from "@/data/projects";

const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

export default function V4Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0]>(projects[0]);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Setup Smooth Lenis + GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for buttery silky smooth inertia scrolling
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
      // 1. Hero Reveal Animations
      gsap.from(".v4-hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".v4-hero-title span", {
        opacity: 0,
        y: 45,
        stagger: 0.08,
        duration: 1,
        ease: "power4.out",
        delay: 0.1,
      });

      gsap.from(".v4-hero-sub", {
        opacity: 0,
        y: 25,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(".v4-hero-card", {
        opacity: 0,
        scale: 0.95,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.3,
      });

      // 2. ScrollTrigger Staggered Section Reveals
      const sections = gsap.utils.toArray<HTMLElement>(".v4-fade-section");
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

      // 3. Project Cards Horizontal Parallax Float
      const cards = gsap.utils.toArray<HTMLElement>(".v4-project-card");
      cards.forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 30,
          duration: 0.7,
          delay: (idx % 2) * 0.15,
          ease: "power2.out",
        });
      });

      // 4. Numbers Counter On Scroll
      const stats = gsap.utils.toArray<HTMLElement>(".v4-stat-num");
      stats.forEach((stat) => {
        const endVal = parseFloat(stat.getAttribute("data-val") || "0");
        const suffix = stat.getAttribute("data-suffix") || "";
        const prefix = stat.getAttribute("data-prefix") || "";
        const decimals = parseInt(stat.getAttribute("data-decimals") || "0", 10);

        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
            once: true,
          },
          val: endVal,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => {
            stat.innerText = `${prefix}${counterObj.val.toFixed(decimals)}${suffix}`;
          },
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => {
          if (activeTab === "vision") return p.category.includes("Vision");
          if (activeTab === "industrial") return p.category.includes("Industrial");
          if (activeTab === "deep") return p.category.includes("Deep");
          return true;
        });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0c10] text-[#e6edf3] font-sans antialiased selection:bg-emerald-500 selection:text-black">
      {/* Neat Minimal Navbar */}
      <nav className="fixed top-0 inset-x-0 z-40 h-16 border-b border-white/[0.08] bg-[#0a0c10]/80 backdrop-blur-xl transition-all">
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/v4" className="flex items-center space-x-2 group">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform shadow-[0_0_10px_#34d399]" />
              <span className="font-semibold text-sm tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                Kabish Sridar
              </span>
            </Link>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
              v4 Clean Pro
            </span>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 text-xs font-medium text-neutral-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#publications" className="hover:text-white transition-colors">Research</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Right: Version Switcher & Resume Button */}
          <div className="flex items-center space-x-3">
            <VersionSwitcher />

            <button
              onClick={() => setIsResumeOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-neutral-200 hover:bg-emerald-500 hover:text-black hover:border-emerald-400 transition-all duration-200 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Bio & Intro */}
          <div className="lg:col-span-7 space-y-6">
            <div className="v4-hero-badge inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SRMIST CSE (AI & ML) • Graduating 2029 • CGPA 8.7</span>
            </div>

            <h1 className="v4-hero-title text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              <span className="inline-block">AI/ML</span>{" "}
              <span className="inline-block">Engineer</span>{" "}
              <span className="inline-block text-neutral-400">&amp;</span>{" "}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Embedded
              </span>{" "}
              <span className="inline-block">Systems Builder</span>
            </h1>

            <p className="v4-hero-sub text-base sm:text-lg text-neutral-400 max-w-xl font-normal leading-relaxed">
              Bridging deep neural networks with edge silicon. Specialized in real-time computer vision, sub-millimeter optical metrology, and industrial PLC automation.
            </p>

            {/* Metric Counters Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.16] transition-colors">
                <span className="text-[11px] font-medium text-neutral-400 block">Inference Speed</span>
                <span className="v4-stat-num text-2xl font-bold text-white tracking-tight" data-val="30" data-suffix=" FPS">30 FPS</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.16] transition-colors">
                <span className="text-[11px] font-medium text-neutral-400 block">Batch Precision</span>
                <span className="v4-stat-num text-2xl font-bold text-emerald-400 tracking-tight" data-val="0.1" data-prefix="±" data-suffix="%" data-decimals="1">±0.1%</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.16] transition-colors">
                <span className="text-[11px] font-medium text-neutral-400 block">Thali mAP</span>
                <span className="v4-stat-num text-2xl font-bold text-teal-300 tracking-tight" data-val="93.8" data-suffix="%" data-decimals="1">93.8%</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.16] transition-colors">
                <span className="text-[11px] font-medium text-neutral-400 block">OCR Accuracy</span>
                <span className="v4-stat-num text-2xl font-bold text-white tracking-tight" data-val="92.4" data-suffix="%" data-decimals="1">92.4%</span>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full text-xs font-semibold bg-emerald-400 text-neutral-950 hover:bg-emerald-300 transition-all duration-200 flex items-center space-x-2 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3 rounded-full text-xs font-semibold bg-white/[0.05] border border-white/[0.1] text-neutral-300 hover:text-white hover:bg-white/[0.1] transition-all duration-200"
              >
                <span>Get in Touch</span>
              </a>

              <a
                href="https://www.linkedin.com/in/kabish-sridar-20587437b"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/[0.05] border border-white/[0.1] text-neutral-400 hover:text-white hover:bg-white/[0.1] transition-all"
                title="LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74V9.96H5.06v8.54z" />
                </svg>
              </a>

              <a
                href="https://github.com/kabishsridar"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/[0.05] border border-white/[0.1] text-neutral-400 hover:text-white hover:bg-white/[0.1] transition-all"
                title="GitHub Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Professional Photo Card */}
          <div className="v4-hero-card lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-white/[0.12] to-white/[0.02] p-1 border border-white/[0.1] shadow-2xl backdrop-blur-md">
              <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-[#0e1217]">
                <Image
                  src={`${basePath}/kabish.jpg`}
                  alt="Kabish Sridar — AI/ML Engineer"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent opacity-80" />

                {/* Bottom Overlay Info Tag */}
                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <h2 className="text-xs font-semibold text-white">Kabish Sridar</h2>
                    <p className="text-[11px] text-neutral-400">SRMIST Chennai • Tamil Nadu, IN</p>
                  </div>
                  <div className="flex items-center space-x-1.5 px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-medium border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active Builder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="v4-fade-section py-20 px-6 border-t border-white/[0.08]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">About Me</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Engineering with low latency and physical determinism.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm leading-relaxed text-neutral-300">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Computer Vision &amp; Metrology</h3>
              <p className="text-neutral-400 text-xs leading-normal">
                Sub-millimeter edge contours, homography transforms, and YOLOv8 segmentation on low-power compute like Raspberry Pi 4 and edge accelerators.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">PLC &amp; Industrial Systems</h3>
              <p className="text-neutral-400 text-xs leading-normal">
                Structured Text (IEC 61131-3) on ABB AC500 PLCs, closed-loop batching, load-cell sensor telemetry, and fail-safe automated gating for manufacturing plants.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Deep Learning &amp; Backends</h3>
              <p className="text-neutral-400 text-xs leading-normal">
                High-concurrency microservices, in-memory caching tiers with Redis, CRNN cursive OCR architectures, and encrypted document validation vaults.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="v4-fade-section py-24 px-6 border-t border-white/[0.08]">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Portfolio</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Featured Engineering Schematics
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  activeTab === "all" ? "bg-white/10 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                }`}
              >
                All (6)
              </button>
              <button
                onClick={() => setActiveTab("vision")}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  activeTab === "vision" ? "bg-white/10 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                }`}
              >
                Vision
              </button>
              <button
                onClick={() => setActiveTab("industrial")}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  activeTab === "industrial" ? "bg-white/10 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                }`}
              >
                Industrial
              </button>
              <button
                onClick={() => setActiveTab("deep")}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  activeTab === "deep" ? "bg-white/10 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                }`}
              >
                OCR / DL
              </button>
            </div>
          </div>

          {/* Clean Grid of Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => {
              const isSelected = selectedProject.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProject(p);
                    const el = document.getElementById("project-spec-drawer");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={`v4-project-card group p-6 rounded-2xl bg-white/[0.02] border transition-all duration-300 flex flex-col justify-between cursor-pointer hover:bg-white/[0.04] hover:-translate-y-1.5 ${
                    isSelected
                      ? "border-emerald-400 bg-emerald-500/[0.03] shadow-[0_0_30px_rgba(52,211,153,0.2)] ring-1 ring-emerald-400/40"
                      : "border-white/[0.08] hover:border-white/[0.25]"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-emerald-400 font-mono font-medium">{p.code}</span>
                      <div className="flex items-center gap-1.5">
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-black text-[10px] font-bold tracking-wide uppercase">
                            DISPLAYING
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-neutral-300 text-[10px] font-medium">
                          {p.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="block text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {p.title}
                    </h3>

                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                      {p.summary}
                    </p>
                  </div>

                  <div className="pt-6 space-y-4">
                    {/* Key Benchmark Pill */}
                    <div className="p-2.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 flex items-center justify-between">
                      <span className="text-[10px] text-neutral-400 font-medium">Benchmark</span>
                      <span className="text-xs font-bold text-emerald-300">{p.keyMetric}</span>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] text-neutral-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {p.stack.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-neutral-500">
                          +{p.stack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons: Display and Full Explanation */}
                    <div className="flex items-center space-x-2 pt-1 border-t border-white/[0.06]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(p);
                          const el = document.getElementById("project-spec-drawer");
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 ${
                          isSelected
                            ? "bg-emerald-400 text-neutral-950 font-bold shadow-md"
                            : "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1]"
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isSelected ? "Displaying Now" : "Display Below"}</span>
                      </button>

                      <Link
                        href={`/projects/${p.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="py-2 px-3 rounded-lg text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-white transition-all border border-emerald-500/30 flex items-center space-x-1"
                        title="Open Dedicated Full Explanation Page"
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
              id="project-spec-drawer"
              key={selectedProject.id}
              className="scroll-mt-24 p-8 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-emerald-400/30 space-y-6 animate-in fade-in zoom-in-95 duration-300 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-emerald-400 font-mono font-medium">{selectedProject.code}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 font-semibold uppercase">
                      ACTIVE PREVIEW
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{selectedProject.title}</h3>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1.5 text-neutral-400">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>Live Blueprint Specification</span>
                  </div>
                  <Link
                    href={`/projects/${selectedProject.id}`}
                    className="px-3 py-1.5 rounded-lg bg-emerald-400 text-black font-bold text-xs hover:bg-emerald-300 transition-all flex items-center space-x-1"
                  >
                    <span>Full Explanation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Dedicated External Device Website Link (For Elongation Detector / Gap Measurement) */}
              {selectedProject.externalWebsite && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/15 via-emerald-500/15 to-transparent border border-blue-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-blue-400 font-mono font-bold uppercase tracking-wider block">
                      OFFICIAL DEDICATED DEVICE WEBSITE
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {selectedProject.externalWebsite.label}
                    </h4>
                    <p className="text-xs text-neutral-300">
                      {selectedProject.externalWebsite.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <a
                      href={selectedProject.externalWebsite.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-black font-bold text-xs transition-all flex items-center space-x-1.5 shadow-sm"
                    >
                      <span>Visit OM90 Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <Link
                      href={`/projects/${selectedProject.id}`}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all flex items-center space-x-1.5"
                    >
                      <span>Full Page</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] text-neutral-500 block mb-1">01 // INGESTION</span>
                  <p className="font-medium text-white">{selectedProject.architecture.input}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] text-emerald-400 block mb-1">02 // COMPUTATION</span>
                  <p className="font-medium text-white">{selectedProject.architecture.processing}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] text-cyan-400 block mb-1">03 // HARDWARE / STORAGE</span>
                  <p className="font-medium text-white">{selectedProject.architecture.hardwareOrStorage}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] text-purple-400 block mb-1">04 // ATTESTATION</span>
                  <p className="font-medium text-white">{selectedProject.architecture.output}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Verified Specifications</h4>
                  <div className="space-y-1.5">
                    {selectedProject.specs.map((s, i) => (
                      <div key={i} className="flex justify-between py-1 border-b border-white/[0.04]">
                        <span className="text-neutral-400">{s.label}</span>
                        <span className="font-medium text-neutral-200">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Key Engineering Highlights</h4>
                  <ul className="space-y-2 text-neutral-400 leading-normal">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
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

      {/* Skills Matrix */}
      <section id="skills" className="v4-fade-section py-20 px-6 border-t border-white/[0.08]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Technical Arsenal</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Tools, Hardware &amp; Deep Learning Frameworks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">AI &amp; Computer Vision</span>
              <div className="flex flex-wrap gap-2">
                {["OpenCV", "PyTorch", "YOLOv8", "DeepFace", "CRNN", "NumPy", "TensorFlow", "Scikit-Learn"].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-neutral-300 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Embedded &amp; Hardware</span>
              <div className="flex flex-wrap gap-2">
                {["Raspberry Pi 4", "ABB AC500 PLC", "Structured Text (ST)", "ESP32", "Arduino", "PiCamera v2", "I2C / SPI", "RS-485 / Modbus"].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-neutral-300 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">Systems &amp; Database</span>
              <div className="flex flex-wrap gap-2">
                {["Redis", "PostgreSQL", "SQLite", "Docker", "FastAPI", "Linux / POSIX", "Git / GitHub Actions"].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-neutral-300 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Languages</span>
              <div className="flex flex-wrap gap-2">
                {["Python 3", "C++", "C", "IEC 61131-3 ST", "TypeScript", "SQL", "Bash"].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-neutral-300 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Publications Section */}
      <section id="publications" className="v4-fade-section py-20 px-6 border-t border-white/[0.08]">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Research &amp; Credentials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Peer-Reviewed Publications &amp; Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileData.research.map((paper, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-emerald-400">
                    <span className="font-semibold">{paper.conference}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">{paper.status}</span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">{paper.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{paper.abstract}</p>
                </div>
                <div className="pt-2 text-[11px] text-neutral-500 font-medium">
                  Author Role: {paper.role} • {paper.year}
                </div>
              </div>
            ))}

            {profileData.achievements.map((ach, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-teal-300">
                    <span className="font-semibold">{ach.organization}</span>
                    <span className="px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20">{ach.badge}</span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">{ach.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{ach.description}</p>
                </div>
                <div className="pt-2 text-[11px] text-neutral-500 font-medium">
                  {ach.year} • Distinction Award
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Contact & Footer */}
      <footer id="contact" className="v4-fade-section py-20 px-6 border-t border-white/[0.08] bg-black/40">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Let's build hardware &amp; AI together.</h2>
              <p className="text-xs text-neutral-400">Available for edge AI roles, embedded systems engineering, and robotics collaborations.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profileData.contact.email}`}
                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-emerald-400 text-neutral-950 hover:bg-emerald-300 transition-colors flex items-center space-x-2 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{profileData.contact.email}</span>
              </a>

              <a
                href="https://www.linkedin.com/in/kabish-sridar-20587437b"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-full text-xs font-medium bg-white/[0.05] border border-white/[0.1] text-neutral-300 hover:text-white hover:bg-white/[0.1] transition-colors flex items-center space-x-2"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74V9.96H5.06v8.54z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/kabishsridar"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-full text-xs font-medium bg-white/[0.05] border border-white/[0.1] text-neutral-300 hover:text-white hover:bg-white/[0.1] transition-colors flex items-center space-x-2"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-[11px] text-neutral-500">
            <p>© {new Date().getFullYear()} Kabish Sridar. Designed with GSAP ScrollTrigger &amp; Lenis Smooth Scroll.</p>
            <p className="font-mono">SRMIST Chennai • Tamil Nadu, India</p>
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
