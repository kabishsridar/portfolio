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
  ChevronRight,
  ChevronLeft,
  FileText,
  Eye,
  Activity,
  Cpu,
  Layers,
  Code2,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import VersionSwitcher from "@/components/VersionSwitcher";
import ResumeModal from "@/components/ResumeModal";
import { projects } from "@/data/projects";
import { profileData } from "@/data/profile";

const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

export default function V4ExactValentinPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const heroImageWrapRef = useRef<HTMLDivElement>(null);
  
  // Ending reveal refs
  const revealContainerRef = useRef<HTMLDivElement>(null);
  const orangeCardLayerRef = useRef<HTMLDivElement>(null);
  const standingActorRef = useRef<HTMLDivElement>(null);
  const sofaRevealLayerRef = useRef<HTMLDivElement>(null);

  const [greeting, setGreeting] = useState("Good morning!");
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeCircularIdx, setActiveCircularIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0]>(projects[0]);

  // Valentin's exact 3D rotating text choices
  const tickerWords = ["Metrology", "Edge Vision", "PLC Systems", "Robotics", "Deep AI"];

  // Mapping actual portfolio project visual showcases (NO BOXER)
  const projectShowcaseImages: { [key: string]: string } = {
    "emo-rex": `${basePath}/proj_emotionsim_hud.jpg`,
    "rasi-feed-plc": `${basePath}/proj_plc_industrial.jpg`,
    "thali-calorie-vision": `${basePath}/proj_thali_vision.jpg`,
    "picam-profiler": `${basePath}/proj_optical_metrology.jpg`,
    "handwriting-ocr": `${basePath}/proj_emotionsim_hud.jpg`,
    "kyc-platform": `${basePath}/proj_plc_industrial.jpg`,
  };

  // Time Greeting Calculation (like Valentin)
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning!");
    else if (hour < 18) setGreeting("Good afternoon!");
    else setGreeting("Good evening!");
  }, []);

  // Kinetic 3D Ticker rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [tickerWords.length]);

  // Smooth Lenis + GSAP ScrollTrigger Sequence Matching Valentin Cheval
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // 1. Custom Valentin Red Dot Cursor Tracking
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (cursorDotRef.current) {
        gsap.to(cursorDotRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.1,
          ease: "power2.out",
        });
      }
      if (cursorFollowerRef.current) {
        gsap.to(cursorFollowerRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.4,
          ease: "power3.out",
        });
      }

      // Parallax on seated hero image
      if (heroImageWrapRef.current) {
        const xOffset = (clientX / window.innerWidth - 0.5) * 20;
        const yOffset = (clientY / window.innerHeight - 0.5) * 14;
        gsap.to(heroImageWrapRef.current, {
          x: xOffset,
          y: yOffset,
          rotateY: xOffset * 0.2,
          rotateX: -yOffset * 0.2,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const ctx = gsap.context(() => {
      // 2. HORIZONTAL MOVING STRIP IN INTRO
      gsap.to(".valentin-moving-strip", {
        scrollTrigger: {
          trigger: "#valentin-intro",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        xPercent: -20,
        ease: "none",
      });

      // 3. EXACT VALENTIN ENDING REVEAL CHOREOGRAPHY
      // Pinned transition where standing suit scales up and slides right to reveal seated armchair on left
      if (
        revealContainerRef.current &&
        orangeCardLayerRef.current &&
        standingActorRef.current &&
        sofaRevealLayerRef.current
      ) {
        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: revealContainerRef.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 1.1,
          },
        });

        // Email marquee slides across
        revealTl.to(".valentin-passing-email", { xPercent: -35, ease: "none", duration: 1 }, 0);

        // Orange glowing testimonial & contact card dissolves out cleanly before background reveals
        revealTl.to(
          orangeCardLayerRef.current,
          { opacity: 0, ease: "power1.inOut", duration: 0.25 },
          0.05
        );

        // Standing transparent cutout actor scales up and slides smoothly off to the right
        revealTl.to(
          standingActorRef.current,
          {
            scale: 2.3,
            xPercent: 75,
            yPercent: 12,
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.75,
          },
          0.15
        );

        // Seated sofa image & headline emerge into full crisp focus only after the quote card is gone
        revealTl.fromTo(
          sofaRevealLayerRef.current,
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1.0, ease: "power2.out", duration: 0.6 },
          0.35
        );
      }
    }, containerRef);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      ctx.revert();
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "vision") return p.category.includes("Vision");
    if (activeTab === "industrial") return p.category.includes("Industrial");
    if (activeTab === "deep") return p.category.includes("Deep") || p.category.includes("Cloud");
    return true;
  });

  const activeImageSrc =
    projectShowcaseImages[selectedProject.id] ||
    `${basePath}/proj_emotionsim_hud.jpg`;

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0c0d10] text-white selection:bg-[#ff3d00] selection:text-white font-sans antialiased overflow-x-hidden cursor-default relative"
      style={{
        fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Valentin's Custom Red Interactive Cursor */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[#ff3d00] z-50 mix-blend-difference hidden md:block"
      />
      <div
        ref={cursorFollowerRef}
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-[#ff3d00]/40 z-40 hidden md:block transition-transform duration-75"
      />

      {/* ========================================================================= */}
      {/* 1. VALENTIN HEADER & TOP NAVIGATION                                       */}
      {/* ========================================================================= */}
      <header className="fixed top-0 inset-x-0 z-40 h-20 bg-[#0c0d10]/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 h-full flex items-center justify-between">
          
          {/* Greeting & Logo */}
          <Link href="/v4" className="flex items-center space-x-3 group">
            <div className="flex flex-col">
              <span className="text-[11px] text-white/50 tracking-wider">
                {greeting}
              </span>
              <div className="flex items-baseline space-x-1.5 text-base font-bold tracking-tight text-white group-hover:text-[#ff3d00] transition-colors">
                <span>Kabish</span>
                <span className="text-white/40 font-normal">Sridar</span>
              </div>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-[#ff3d00]/40 bg-[#ff3d00]/10 text-[#ff3d00]">
              v4 Valentin
            </span>
          </Link>

          {/* Socials / Links Bar (Valentin exact style: Socials / li / gh / em) */}
          <div className="hidden md:flex items-center space-x-2 text-xs text-white/70 font-mono">
            <span className="text-white/40">Socials /</span>
            <a
              href="https://www.linkedin.com/in/kabish-sridar-20587437b"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#ff3d00] transition-colors underline-offset-4 hover:underline"
            >
              li
            </a>
            <span className="text-white/30">/</span>
            <a
              href="https://github.com/kabishsridar"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#ff3d00] transition-colors underline-offset-4 hover:underline"
            >
              gh
            </a>
            <span className="text-white/30">/</span>
            <a
              href={`mailto:${profileData.contact.email}`}
              className="hover:text-[#ff3d00] transition-colors underline-offset-4 hover:underline"
            >
              em
            </a>
          </div>

          {/* Menu / Index */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-wider text-white/80">
            <a href="#valentin-hero" className="hover:text-[#ff3d00] transition-colors">
              Index <span className="text-white/30">/</span>
            </a>
            <a href="#valentin-intro" className="hover:text-[#ff3d00] transition-colors">
              About <span className="text-white/30">/</span>
            </a>
            <a href="#valentin-projects" className="hover:text-[#ff3d00] transition-colors">
              Projects
            </a>
          </nav>

          {/* Right Action Buttons */}
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
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#ff3d00] hover:bg-[#ff5722] text-white shadow-[0_0_20px_rgba(255,61,0,0.4)] transition-all"
            >
              <span>Let&apos;s talk!</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO: VALENTIN CHEVAL STYLE WITH FAVORITE SEATED PORTRAIT              */}
      {/* ========================================================================= */}
      <section
        id="valentin-hero"
        className="relative min-h-screen pt-28 pb-16 px-6 sm:px-12 flex flex-col justify-between overflow-hidden"
      >
        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1 my-auto">
          
          {/* Left Column: Scope, Bio, Headline with 3D Rotating Ticker */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2 border-l border-white/10 pl-4 py-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#ff3d00]">
                Disciplines &amp; Scope
              </span>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/70 font-mono">
                <li>• Optical Metrology</li>
                <li>• Edge Vision</li>
                <li>• PLC Automation</li>
                <li>• Autonomous Systems</li>
              </ul>
            </div>

            <p className="text-sm sm:text-base text-white/70 max-w-lg font-light leading-relaxed">
              Award-finalist AI/ML &amp; Embedded Systems Engineer. I architect hardware-software solutions for sub-millimeter optical metrology, automated factory PLCs, and real-time edge computer vision.
            </p>

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
                    {tickerWords[tickerIndex]}
                  </span>
                </span>
              </h1>
            </div>

            {/* Official Valentin Award Badges */}
            <div className="flex items-center space-x-6 pt-2">
              <div className="h-9 w-auto opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src={`${basePath}/red-dot-white.BCoP2Tnu.svg`}
                  alt="Red Dot Award"
                  width={38}
                  height={38}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="h-9 w-auto opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src={`${basePath}/uxdesign-white._MZKNTN5.svg`}
                  alt="UX Design Award"
                  width={38}
                  height={38}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="h-9 w-auto opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src={`${basePath}/dfa-white.BALS8Xtv.svg`}
                  alt="DFA Award"
                  width={38}
                  height={38}
                  className="h-full w-auto object-contain"
                />
              </div>
              <span className="text-xs font-mono text-white/40 pl-2 border-l border-white/10">
                MVP Finalist • KYC Datathon 2.0
              </span>
            </div>

            {/* Metric Counters Strip */}
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
          </div>

          {/* Right Column: Seated Hero Portrait (Kabish's Favorite Portrait with NO Glass) */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <div
              ref={heroImageWrapRef}
              className="relative w-full max-w-[460px] aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#111216] transition-transform will-change-transform group"
            >
              <Image
                src={`${basePath}/kabish_valentin_v4.jpg`}
                alt="Kabish Sridar in tailored black suit and coolers — Valentin Cheval style"
                fill
                priority
                className="object-cover object-center filter contrast-[1.05] brightness-[0.98] group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 500px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-transparent opacity-85" />
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />

              {/* Exact Bottom HUD Badge from User Screenshot */}
              <div className="absolute bottom-5 inset-x-5 p-4 rounded-xl bg-black/75 backdrop-blur-xl border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff3d00] block">
                    SRM INSTITUTE OF SCIENCE AND TECHNOLOGY
                  </span>
                  <p className="text-xs font-semibold text-white">B.Tech CSE (AI &amp; ML) • CGPA 8.7</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff3d00] animate-pulse" />
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-[1440px] w-full mx-auto pt-8 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/40 font-mono">
          <span>CHENNAI, INDIA • 10.7905° N, 78.7047° E</span>
          <span className="text-white/60">AVAILABLE FOR ROLES &amp; INDUSTRIAL CONTRACTS</span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MOVING TEXT STRIP IN LINE & ABOUT SECTION                              */}
      {/* ========================================================================= */}
      <section
        id="valentin-intro"
        className="py-24 border-t border-white/10 bg-[#0e0f13] overflow-hidden"
      >
        {/* Valentin Moving Strip in Line */}
        <div className="valentin-moving-strip whitespace-nowrap text-5xl sm:text-7xl font-black uppercase text-white/[0.04] tracking-tight mb-16 select-none flex space-x-8">
          <span>OPTICAL METROLOGY • EDGE VISION • PLC SYSTEMS • ROBOTICS •</span>
          <span>OPTICAL METROLOGY • EDGE VISION • PLC SYSTEMS • ROBOTICS •</span>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff3d00]">
              (Intro &amp; Philosophy)
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase leading-tight">
              Engineering solutions that endure the physical world.
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-6 text-base text-white/70 font-light leading-relaxed">
            <p>
              I architect embedded machine learning pipelines and industrial automation systems where microsecond latencies and sub-millimeter tolerances are strict requirements.
            </p>
            <p>
              From zero-contact <strong>0.1 mm mechanical gap metrology</strong> calibrated via homography checkerboard matrices, to real-time multi-ingredient feed batch scaling on an <strong>ABB AC500 PLC</strong>, my systems unite modern deep neural networks with rugged industrial hardware.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 font-mono">
              <div>
                <span className="text-3xl font-black text-white tracking-tight">0.1 mm</span>
                <span className="text-xs text-white/40 block mt-1">Optical Tolerance</span>
              </div>
              <div>
                <span className="text-3xl font-black text-[#ff3d00] tracking-tight">30 FPS</span>
                <span className="text-xs text-white/40 block mt-1">Edge Vector Extraction</span>
              </div>
              <div>
                <span className="text-3xl font-black text-white tracking-tight">±0.1%</span>
                <span className="text-xs text-white/40 block mt-1">Batch Precision</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. EXACT PROJECT SHOWCASE (PORTFOLIO PROJECTS ONLY — BOXER REMOVED)       */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 4. PROJECTS: 3D CIRCULAR SLIDER + V2 CARDS IN V4 THEME + DISPLAY DRAWER   */}
      {/* ========================================================================= */}
      <section
        id="valentin-projects"
        className="py-24 border-t border-white/10 bg-[#0c0d10]"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-20">

          {/* --------------------------------------------------------------------- */}
          {/* 4A. CIRCULAR 3D SLIDER OF ALL PROJECTS                                */}
          {/* --------------------------------------------------------------------- */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff3d00] font-bold">
                  01 // 3D Cylindrical Reel
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
                  Circular Reel of All Projects
                </h2>
                <p className="text-sm text-white/60 font-light max-w-xl">
                  Interactive 3D cylindrical carousel showcasing all 6 optical metrology, industrial PLC, and edge computer vision deployments.
                </p>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-white/40 mr-2">
                  0{activeCircularIdx + 1} / 0{projects.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setActiveCircularIdx((prev) => (prev > 0 ? prev - 1 : projects.length - 1))
                  }
                  className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-[#ff3d00] text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveCircularIdx((prev) => (prev < projects.length - 1 ? prev + 1 : 0))
                  }
                  className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-[#ff3d00] text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3D Perspective Viewport */}
            <div
              className="relative w-full h-[520px] flex items-center justify-center overflow-hidden py-4"
              style={{ perspective: "1800px" }}
            >
              <div
                className="relative w-[340px] sm:w-[420px] h-[480px] flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                {projects.map((p, idx) => {
                  const count = projects.length;
                  const offset = idx - activeCircularIdx;
                  const angle = offset * 38;
                  const rad = (angle * Math.PI) / 180;
                  const radius = 560;
                  const transX = Math.sin(rad) * radius;
                  const transZ = (Math.cos(rad) - 1) * radius;
                  const isCenter = idx === activeCircularIdx;
                  const isNear = Math.abs(offset) <= 2 || Math.abs(offset) >= count - 2;

                  if (!isNear) return null;

                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setActiveCircularIdx(idx);
                        setSelectedProject(p);
                      }}
                      className={`absolute inset-0 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-700 cursor-pointer select-none bg-[#111319] border ${
                        isCenter
                          ? "border-[#ff3d00] shadow-[0_0_50px_rgba(255,61,0,0.35)] ring-1 ring-[#ff3d00]/60 z-30 opacity-100"
                          : "border-white/10 opacity-60 hover:opacity-90 z-10 hover:border-white/30"
                      }`}
                      style={{
                        transform: `translateX(${transX}px) translateZ(${transZ}px) rotateY(${angle * 0.85}deg)`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Top info */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-[#ff3d00] border border-[#ff3d00]/30">
                            {p.code}
                          </span>
                          <span className="text-[10px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded-full">
                            {p.status}
                          </span>
                        </div>

                        {/* Visual Thumbnail */}
                        <div className="relative w-full h-36 rounded-xl overflow-hidden bg-black/60 border border-white/10 mt-2">
                          <Image
                            src={projectShowcaseImages[p.id] || `${basePath}/proj_emotionsim_hud.jpg`}
                            alt={p.title}
                            fill
                            className="object-cover object-center"
                            sizes="400px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-[#ff3d00]">
                            {p.keyMetric}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1 mt-1">
                            {p.title}
                          </h3>
                          <p className="text-xs text-white/60 font-light line-clamp-2 mt-1">
                            {p.summary}
                          </p>
                        </div>
                      </div>

                      {/* Bottom action pills */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(p);
                            const el = document.getElementById("project-spec-drawer");
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#ff3d00] hover:text-white text-xs font-semibold text-white/90 transition-all flex items-center space-x-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Blueprint</span>
                        </button>

                        <Link
                          href={`/projects/${p.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 rounded-lg bg-[#ff3d00]/20 hover:bg-[#ff3d00] text-[#ff3d00] hover:text-white border border-[#ff3d00]/40 flex items-center justify-center transition-all"
                          title="Open Full Page"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Circular Reel Indicator Dots */}
            <div className="flex items-center justify-center space-x-2 pt-2">
              {projects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActiveCircularIdx(idx);
                    setSelectedProject(p);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeCircularIdx
                      ? "w-8 bg-[#ff3d00]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 4B. ALL PROJECT CARDS SAME AS V2 WITH V4 THEME                        */}
          {/* --------------------------------------------------------------------- */}
          <div className="space-y-10 pt-10 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff3d00] font-bold">
                  02 // Detailed Schematics &amp; Blueprints
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
                  All Project Specifications
                </h2>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3.5 py-1.5 rounded-lg font-mono font-medium transition-all cursor-pointer ${
                    activeTab === "all"
                      ? "bg-[#ff3d00] text-white shadow-[0_0_15px_rgba(255,61,0,0.4)]"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  All ({projects.length})
                </button>
                <button
                  onClick={() => setActiveTab("vision")}
                  className={`px-3.5 py-1.5 rounded-lg font-mono font-medium transition-all cursor-pointer ${
                    activeTab === "vision"
                      ? "bg-[#ff3d00] text-white shadow-[0_0_15px_rgba(255,61,0,0.4)]"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Vision &amp; Metrology
                </button>
                <button
                  onClick={() => setActiveTab("industrial")}
                  className={`px-3.5 py-1.5 rounded-lg font-mono font-medium transition-all cursor-pointer ${
                    activeTab === "industrial"
                      ? "bg-[#ff3d00] text-white shadow-[0_0_15px_rgba(255,61,0,0.4)]"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Industrial &amp; PLC
                </button>
                <button
                  onClick={() => setActiveTab("deep")}
                  className={`px-3.5 py-1.5 rounded-lg font-mono font-medium transition-all cursor-pointer ${
                    activeTab === "deep"
                      ? "bg-[#ff3d00] text-white shadow-[0_0_15px_rgba(255,61,0,0.4)]"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Deep Learning / OCR
                </button>
              </div>
            </div>

            {/* Grid of All Project Cards (V2 Cards with V4 Theme) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((p) => {
                const isSelected = selectedProject.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProject(p);
                      const el = document.getElementById("project-spec-drawer");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`group p-6 rounded-2xl bg-white/[0.03] border transition-all duration-300 flex flex-col justify-between cursor-pointer hover:bg-white/[0.05] hover:-translate-y-1.5 ${
                      isSelected
                        ? "border-[#ff3d00] bg-[#ff3d00]/[0.04] shadow-[0_0_35px_rgba(255,61,0,0.25)] ring-1 ring-[#ff3d00]/50"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#ff3d00] font-mono font-bold tracking-wider">{p.code}</span>
                        <div className="flex items-center gap-1.5">
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded-full bg-[#ff3d00] text-white text-[10px] font-black tracking-wider uppercase animate-pulse">
                              DISPLAYING
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/70 text-[10px] font-mono">
                            {p.status}
                          </span>
                        </div>
                      </div>

                      <h3 className="block text-lg font-bold text-white group-hover:text-[#ff3d00] transition-colors leading-snug">
                        {p.title}
                      </h3>

                      <p className="text-xs text-white/60 leading-relaxed font-light line-clamp-3">
                        {p.summary}
                      </p>
                    </div>

                    <div className="pt-6 space-y-4">
                      {/* Key Benchmark Pill */}
                      <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
                        <span className="text-[10px] text-white/50 font-mono uppercase">Benchmark</span>
                        <span className="text-xs font-bold font-mono text-[#ff3d00]">{p.keyMetric}</span>
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {p.stack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/70"
                          >
                            {tech}
                          </span>
                        ))}
                        {p.stack.length > 4 && (
                          <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-white/40">
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
                            const el = document.getElementById("project-spec-drawer");
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                            isSelected
                              ? "bg-[#ff3d00] text-white font-bold shadow-[0_0_20px_rgba(255,61,0,0.5)]"
                              : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isSelected ? "Displaying Now" : "Display Below"}</span>
                        </button>

                        <Link
                          href={`/projects/${p.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="py-2 px-3 rounded-lg text-xs font-medium bg-[#ff3d00]/15 hover:bg-[#ff3d00]/30 text-[#ff3d00] hover:text-white transition-all border border-[#ff3d00]/30 flex items-center space-x-1"
                          title="Open Dedicated Full Page"
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

            {/* ----------------------------------------------------------------- */}
            {/* 4C. DEEP ARCHITECTURE DRAWER ("DISPLAYING NOW")                  */}
            {/* ----------------------------------------------------------------- */}
            {selectedProject && (
              <div
                id="project-spec-drawer"
                key={selectedProject.id}
                className="scroll-mt-24 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#14161f] to-[#0c0d12] border border-[#ff3d00]/40 space-y-8 animate-in fade-in zoom-in-95 duration-300 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs text-[#ff3d00] font-mono font-bold uppercase tracking-wider">
                        {selectedProject.code}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#ff3d00]/20 border border-[#ff3d00]/40 text-[#ff3d00] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff3d00] animate-ping" />
                        ACTIVE PREVIEW • DISPLAYING NOW
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/projects/${selectedProject.id}`}
                      className="px-4 py-2 rounded-xl bg-[#ff3d00] text-white font-bold text-xs hover:bg-[#ff5722] shadow-[0_0_20px_rgba(255,61,0,0.4)] transition-all flex items-center space-x-1.5"
                    >
                      <span>Full Project Page</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* External Device Portal Banner (for Elongation Detector) */}
                {selectedProject.externalWebsite && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#ff3d00]/20 via-[#ff5722]/10 to-transparent border border-[#ff3d00]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-[#ff3d00] font-mono font-bold uppercase tracking-widest block">
                        OFFICIAL DEDICATED DEVICE WEBSITE
                      </span>
                      <h4 className="text-base font-bold text-white mt-0.5">
                        {selectedProject.externalWebsite.label}
                      </h4>
                      <p className="text-xs text-white/70 mt-1">
                        {selectedProject.externalWebsite.description}
                      </p>
                    </div>
                    <a
                      href={selectedProject.externalWebsite.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-[#ff3d00] hover:text-white transition-all flex items-center space-x-1.5 shrink-0"
                    >
                      <span>Launch Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* Grid Layout: Visual Showcase + Architecture */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Visual Schematic Image */}
                  <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/80 border border-white/10 shadow-2xl">
                    <Image
                      src={projectShowcaseImages[selectedProject.id] || `${basePath}/proj_emotionsim_hud.jpg`}
                      alt={selectedProject.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                    <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#ff3d00] uppercase block">
                          Verified Key Metric
                        </span>
                        <p className="text-xs font-bold text-white">{selectedProject.keyMetric}</p>
                      </div>
                      <span className="text-[10px] font-mono text-white/50">
                        {selectedProject.category}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Signal Flow & Specs */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Pipeline Signal Flow */}
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#ff3d00] font-bold block">
                        Hardware-Software Signal Architecture
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
                        <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                          <span className="text-[10px] text-white/40 block">01 // INPUT</span>
                          <span className="text-white font-bold block mt-1 line-clamp-2">{selectedProject.architecture.input}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                          <span className="text-[10px] text-white/40 block">02 // INFERENCE</span>
                          <span className="text-white font-bold block mt-1 line-clamp-2">{selectedProject.architecture.processing}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                          <span className="text-[10px] text-white/40 block">03 // HARDWARE</span>
                          <span className="text-white font-bold block mt-1 line-clamp-2">{selectedProject.architecture.hardwareOrStorage}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                          <span className="text-[10px] text-white/40 block">04 // TELEMETRY</span>
                          <span className="text-white font-bold block mt-1 line-clamp-2">{selectedProject.architecture.output}</span>
                        </div>
                      </div>
                    </div>

                    {/* Technical Specs List */}
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-white/40 block">
                        Key Specifications
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {selectedProject.specs.map((sp) => (
                          <div
                            key={sp.label}
                            className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-2"
                          >
                            <span className="text-white/50 font-mono">{sp.label}</span>
                            <span className="font-bold text-white font-mono text-right">{sp.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Engineering Highlights */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <span className="text-xs font-mono uppercase tracking-widest text-white/40 block">
                        Engineering Highlights
                      </span>
                      <ul className="space-y-1.5 text-xs text-white/70 leading-relaxed font-light">
                        {selectedProject.highlights.map((hl, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-[#ff3d00] font-bold mt-0.5">•</span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. EXACT VALENTIN ENDING REVEAL (STANDING SLIDES RIGHT TO REVEAL SOFA)   */}
      {/* ========================================================================= */}
      <section
        id="valentin-ending-reveal"
        ref={revealContainerRef}
        className="relative h-[160vh] bg-[#0c0d10]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Layer A (Background): Full Screen Revealed Seated Sofa / Armchair Image & Re-emerging Headline */}
          <div
            ref={sofaRevealLayerRef}
            className="absolute inset-0 w-full h-full z-10 flex items-center justify-between px-6 sm:px-16 pointer-events-none opacity-0"
          >
            {/* Cinematic Seated Armchair Image — Framed so head, sunglasses and face are fully visible */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
              <div className="relative w-full max-w-[900px] h-full">
                <Image
                  src={`${basePath}/kabish_valentin_v4.jpg`}
                  alt="Kabish Sridar seated in emerald armchair"
                  fill
                  className="object-contain sm:object-cover object-[center_12%] filter brightness-[0.92] contrast-[1.05]"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-black/90 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-black/60 pointer-events-none" />
            </div>

            <div className="relative z-20 max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
              {/* Left Column: Re-emerging Giant Hero Headline */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">
                  Hi there! this is Kabish Sridar
                </span>
                <h2 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase text-white tracking-tight leading-[1.05]">
                  Engineering
                  <br />
                  <span className="text-white/40">for</span>{" "}
                  <span className="text-[#ff3d00]">{tickerWords[tickerIndex]}</span>
                </h2>
                <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-lg pt-2">
                  Ready to deploy high-precision optical metrology pipelines, edge embedded neural processors, or industrial automation firmware for your team.
                </p>

                <div className="pt-4 flex items-center space-x-4">
                  <a
                    href={`mailto:${profileData.contact.email}`}
                    className="px-6 py-3.5 rounded-full text-xs font-semibold bg-[#ff3d00] hover:bg-[#ff5722] text-white shadow-[0_0_25px_rgba(255,61,0,0.5)] transition-all flex items-center space-x-2"
                  >
                    <span>Let&apos;s talk!</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setIsResumeOpen(true)}
                    className="px-5 py-3.5 rounded-full text-xs font-semibold border border-white/20 hover:border-white/50 text-white bg-white/10 backdrop-blur-md transition-all"
                  >
                    Download Resume PDF
                  </button>
                </div>

                <div className="pt-6">
                  <span className="text-[11px] font-mono text-white/40 tracking-wider">
                    (Scroll down)
                  </span>
                </div>
              </div>

              {/* Right Column: Capabilities & Credentials Badges */}
              <div className="lg:col-span-5 space-y-6 lg:pl-12">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-white/40 block">
                    Focus Areas
                  </span>
                  <ul className="space-y-2 text-sm text-white/80 font-mono">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff3d00]" />
                      <span>Sub-Pixel Optical Metrology (0.1 mm)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff3d00]" />
                      <span>Edge Computer Vision &amp; TensorRT</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff3d00]" />
                      <span>Industrial PLC &amp; SCADA Automation</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff3d00]">
                      Academic Distinction
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#ff3d00] animate-pulse" />
                  </div>
                  <p className="text-sm font-bold text-white">SRM Institute of Science and Technology</p>
                  <p className="text-xs text-white/60">B.Tech Computer Science (AI &amp; ML) • CGPA 8.7</p>
                </div>

                {/* Awards Row */}
                <div className="flex items-center space-x-4 pt-1">
                  <Image
                    src={`${basePath}/red-dot-white.BCoP2Tnu.svg`}
                    alt="Red Dot Award"
                    width={32}
                    height={32}
                    className="opacity-60"
                  />
                  <Image
                    src={`${basePath}/uxdesign-white._MZKNTN5.svg`}
                    alt="UX Design Award"
                    width={32}
                    height={32}
                    className="opacity-60"
                  />
                  <Image
                    src={`${basePath}/dfa-white.BALS8Xtv.svg`}
                    alt="DFA Award"
                    width={32}
                    height={32}
                    className="opacity-60"
                  />
                  <span className="text-[11px] font-mono text-white/40 border-l border-white/10 pl-3">
                    KYC Datathon 2.0 MVP Finalist
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Layer B (Middle): Warm Sunrise Glow Testimonial & Contact Card */}
          <div
            ref={orangeCardLayerRef}
            className="absolute inset-0 w-full h-full z-20 flex flex-col justify-between p-8 sm:p-16 transition-opacity"
            style={{
              background: "radial-gradient(ellipse 90% 60% at 50% 15%, #ff5500 0%, #ff7722 28%, #fff2ec 65%, #f4f3f0 100%)",
            }}
          >
            {/* Top dark gradient vignette for readable nav */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />

            {/* Giant Passing Email Ticker behind standing person */}
            <div className="absolute bottom-20 left-0 w-full overflow-hidden pointer-events-none select-none opacity-15">
              <div className="valentin-passing-email whitespace-nowrap text-8xl sm:text-[11vw] font-black uppercase tracking-tighter text-black">
                {profileData.contact.email} • {profileData.contact.email} • {profileData.contact.email} • {profileData.contact.email}
              </div>
            </div>

            <div className="relative z-10 max-w-[1440px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center flex-1 my-auto">
              {/* Left Column: Socials & Contact */}
              <div className="md:col-span-4 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ff3d00] font-bold block">
                    Socials
                  </span>
                  <div className="flex flex-col space-y-1 text-sm font-semibold text-neutral-900">
                    <a
                      href="https://www.linkedin.com/in/kabish-sridar-20587437b"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#ff3d00] transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/kabishsridar"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#ff3d00] transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ff3d00] font-bold block">
                    Contact me
                  </span>
                  <div className="flex flex-col space-y-1 text-sm font-semibold text-neutral-900">
                    <a
                      href={`mailto:${profileData.contact.email}`}
                      className="hover:text-[#ff3d00] transition-colors"
                    >
                      {profileData.contact.email}
                    </a>
                    <span className="text-xs text-neutral-600 font-normal">
                      +91 91768 76594 • Chennai, India
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10">
                  <span className="text-xs font-mono text-neutral-500 block">
                    Got an embedded or AI challenge?
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1 tracking-tight">
                    Let&apos;s make something happen together
                  </h3>
                </div>
              </div>

              {/* Spacer in Center where standing cutout is placed */}
              <div className="hidden md:block md:col-span-3" />

              {/* Right Column: Quote */}
              <div className="md:col-span-5 space-y-4 md:pl-6">
                <p className="text-2xl sm:text-4xl lg:text-5xl font-light text-neutral-950 leading-tight">
                  As an engineer and builder, I believe in{" "}
                  <span className="font-bold text-[#ff3d00]">service above self</span>.
                </p>
                <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed max-w-lg">
                  Being an embedded AI engineer is about serving real physical needs. It&apos;s dedicating yourself to finding the right balance between real-time inference speed and hardware reliability.
                </p>
              </div>
            </div>
          </div>

          {/* Layer C (Foreground): Standing Suit Cutout Actor (Scales up & Slides Right on scroll) */}
          <div
            ref={standingActorRef}
            className="absolute z-30 pointer-events-none will-change-transform flex justify-center items-end bottom-0 left-1/2 -translate-x-1/2"
            style={{
              transformOrigin: "center bottom",
            }}
          >
            <div className="relative h-[78vh] sm:h-[82vh] lg:h-[86vh] w-auto aspect-[848/1264]">
              <Image
                src={`${basePath}/kabish_standing_cutout.png`}
                alt="Kabish Sridar standing in black suit and coolers"
                fill
                priority
                className="object-contain object-bottom filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
                sizes="(max-width: 768px) 80vw, 600px"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="py-8 border-t border-white/10 bg-[#07080a] text-xs font-mono text-white/40">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <span className="text-white font-bold tracking-wider">KABISH SRIDAR</span>
            <span>© {new Date().getFullYear()}</span>
            <span>CHENNAI, TAMIL NADU, INDIA</span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://www.linkedin.com/in/kabish-sridar-20587437b"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#ff3d00] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/kabishsridar"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#ff3d00] transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${profileData.contact.email}`}
              className="hover:text-[#ff3d00] transition-colors"
            >
              Email
            </a>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="hover:text-[#ff3d00] transition-colors uppercase"
            >
              Resume
            </button>
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
