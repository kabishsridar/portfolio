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
  Sliders
} from "lucide-react";
import V3SynapseNavbar from "@/components/v3_synapse/V3SynapseNavbar";
import ResumeModal from "@/components/ResumeModal";
import { projects } from "@/data/projects";
import { profileData } from "@/data/profile";

const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

export default function Version3KineticTimeline() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [measurement, setMeasurement] = useState(0.098);
  const [fps, setFps] = useState(29.8);
  const [activeCardIndex, setActiveCardIndex] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroLeftTextRef = useRef<HTMLDivElement>(null);
  const rightHeroCardRef = useRef<HTMLDivElement>(null);
  const giantTextTrackRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const statementStageRef = useRef<HTMLDivElement>(null);
  const starMotifRef = useRef<HTMLDivElement>(null);
  const selectedWorkTrackRef = useRef<HTMLDivElement>(null);
  const ctaStageRef = useRef<HTMLDivElement>(null);

  // Optical metrology live flicker
  useEffect(() => {
    const timer = setInterval(() => {
      const delta = (Math.random() - 0.5) * 0.004;
      setMeasurement(prev => +(0.100 + delta).toFixed(3));
      setFps(+(29.5 + Math.random() * 0.8).toFixed(1));
    }, 1100);
    return () => clearInterval(timer);
  }, []);

  // GSAP ScrollTrigger Master Timeline Sequence
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
      // MASTER PINNED SCROLL TIMELINE (Exact animation mechanics matching portfolio_idea_1.webm)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5400",
          pin: pinnedStageRef.current,
          scrub: 0.8,
          anticipatePin: 1,
        }
      });

      // -------------------------------------------------------------
      // PHASE 1: Hero Left Text Fades Out (Scroll 0 -> 1.5)
      // -------------------------------------------------------------
      tl.to(heroLeftTextRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      }, 0);

      // -------------------------------------------------------------
      // PHASE 2: Right Hero Card Drags Smoothly to Dead Center (Scroll 0.5 -> 3.0)
      // (As requested: "the right side image should be drag to center when scroll")
      // -------------------------------------------------------------
      tl.to(rightHeroCardRef.current, {
        x: () => {
          if (typeof window !== "undefined" && rightHeroCardRef.current) {
            const rect = rightHeroCardRef.current.getBoundingClientRect();
            const centerTarget = window.innerWidth / 2 - rect.width / 2;
            return centerTarget - rect.left;
          }
          return -180;
        },
        y: -20,
        scale: 1.08,
        duration: 2.2,
        ease: "power2.inOut",
      }, 0.6);

      // -------------------------------------------------------------
      // PHASE 3: AFTER the center scroll, the other cards fan out in 3D (Scroll 3.0 -> 6.5)
      // (As requested: "and after the scroll only, the other cards should be in the scroll")
      // -------------------------------------------------------------
      tl.to(rightHeroCardRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.0,
        ease: "power2.in",
      }, 3.0);

      // Giant background typography ("Design that ships...") slides horizontally behind cards
      tl.fromTo(giantTextTrackRef.current, 
        { x: "35%", opacity: 0 },
        { x: "-45%", opacity: 0.9, duration: 3.5, ease: "power1.inOut" },
        3.0
      );

      // 3D Perspective Project Cards fan out and rotate on Y axis across screen
      tl.fromTo(carouselTrackRef.current,
        { x: "40%", scale: 0.85, opacity: 0, rotateY: 25 },
        { x: "-35%", scale: 1, opacity: 1, rotateY: -15, duration: 3.5, ease: "power2.out" },
        3.2
      );

      // -------------------------------------------------------------
      // PHASE 4: "Beyond every limit" + Sparkle Star
      // -------------------------------------------------------------
      // Carousel and giant text fade out
      tl.to([carouselTrackRef.current, giantTextTrackRef.current], {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "power2.in",
      }, 6.8);

      // Statement Stage appears with expanding Star and big split typography
      tl.fromTo(statementStageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 2, ease: "power2.out" },
        7.2
      );

      tl.fromTo(starMotifRef.current,
        { scale: 0.4, rotate: -45, opacity: 0 },
        { scale: 1.25, rotate: 0, opacity: 1, duration: 2, ease: "back.out(1.7)" },
        7.2
      );

      // -------------------------------------------------------------
      // PHASE 5: Curated Horizontal Work Showcase
      // -------------------------------------------------------------
      // Statement dissolves
      tl.to(statementStageRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 1.5,
        ease: "power2.in",
      }, 9.8);

      // Selected Work cards stream horizontally across screen
      tl.fromTo(selectedWorkTrackRef.current,
        { x: "60%", opacity: 0 },
        { x: "-50%", opacity: 1, duration: 4, ease: "power1.inOut" },
        10.2
      );

      // -------------------------------------------------------------
      // PHASE 6: Curved Purple Metallic CTA Stage + Kabish Portrait
      // -------------------------------------------------------------
      tl.to(selectedWorkTrackRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: "power2.in",
      }, 14.5);

      tl.fromTo(ctaStageRef.current,
        { y: "60%", opacity: 0, scale: 0.92 },
        { y: "0%", opacity: 1, scale: 1, duration: 3, ease: "power2.out" },
        14.8
      );
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  const carouselCards = [
    {
      id: "gap-measurement",
      badge: "Metrology // OM90",
      title: "Sub-Millimeter Vision",
      subtitle: "0.1 mm Optical Caliper",
      description: "Autonomous edge inspection engine on Raspberry Pi & PiCamera v2/v3.",
      stat: "0.1 mm",
      statLabel: "Continuous Tolerance",
      color: "from-purple-900/80 via-[#1c0b36] to-black",
      border: "border-purple-500/50",
      accent: "text-purple-300",
      url: "/projects/gap-measurement",
      extUrl: "https://om90.in/devices/elongation-detector"
    },
    {
      id: "emo-rex",
      badge: "Robotics // KYC MVP",
      title: "EMO-REX Companion",
      subtitle: "Affective Edge Perception",
      description: "Real-time emotion tracking and multi-servo actuation on low-latency compute.",
      stat: "30 FPS",
      statLabel: "Vector Inference",
      color: "from-fuchsia-950/80 via-[#260a33] to-black",
      border: "border-fuchsia-500/50",
      accent: "text-fuchsia-300",
      url: "/projects/emo-rex"
    },
    {
      id: "rasi-feed-plc",
      badge: "Industrial // SCADA",
      title: "Rasi Smart Batching",
      subtitle: "ABB AC500 PLC Network",
      description: "Mission-critical industrial dosing telemetry across Modbus TCP/IP.",
      stat: "±0.1%",
      statLabel: "Batch Tolerance",
      color: "from-indigo-950/80 via-[#0d1338] to-black",
      border: "border-indigo-500/50",
      accent: "text-indigo-300",
      url: "/projects/rasi-feed-plc"
    },
    {
      id: "thali-calorie-vision",
      badge: "Vision // Nutrition",
      title: "Thali Calorie Engine",
      subtitle: "Multimodal Volume Estimation",
      description: "Volumetric depth mapping and ingredient recognition from single-view camera feeds.",
      stat: "94.2%",
      statLabel: "Top-1 Accuracy",
      color: "from-violet-950/80 via-[#180f38] to-black",
      border: "border-violet-500/50",
      accent: "text-violet-300",
      url: "/projects/thali-calorie-vision"
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-[#07070d] text-white selection:bg-purple-600 selection:text-white font-sans">
      {/* Top Floating Glass Pill Navbar */}
      <V3SynapseNavbar onOpenResume={() => setResumeOpen(true)} />

      {/* Pinned Stage Container (Full viewport height pinned while scrolling) */}
      <div
        ref={pinnedStageRef}
        className="h-screen w-screen relative overflow-hidden flex items-center justify-center bg-[#07070d]"
      >
        {/* Ambient background glow layers matching reference video */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-gradient-to-b from-purple-700/35 via-indigo-800/20 to-transparent blur-[160px] rounded-full" />
          <div className="absolute bottom-[5%] left-[8%] w-[500px] h-[500px] bg-purple-950/30 blur-[150px] rounded-full" />
          <div className="absolute top-[30%] right-[5%] w-[450px] h-[450px] bg-indigo-900/25 blur-[150px] rounded-full" />
          <div 
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)`,
              backgroundSize: '48px 48px'
            }}
          />
        </div>

        {/* ============================================================== */}
        {/* 1. HERO STAGE (00:00 - 00:01 in reference video) */}
        {/* ============================================================== */}
        <div
          ref={heroSectionRef}
          id="stage-hero"
          className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 z-20"
        >
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Headline Column */}
            <div ref={heroLeftTextRef} className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-200">
                  Kabish Sridar // Edge AI & Metrology
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                Systems that <br />
                <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-fuchsia-300 bg-clip-text text-transparent">
                  answer first
                </span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-300/85 max-w-lg font-light leading-relaxed">
                Turn intent into motion and attention into outcome. Engineering sub-millimeter optical metrology, edge computer vision, and industrial automation across physical silicon.
              </p>

              {/* Action row & social proof pill */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setResumeOpen(true)}
                  className="px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-bold transition-all shadow-[0_0_24px_rgba(255,255,255,0.4)] flex items-center gap-2"
                >
                  <span>Start building</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="#stage-work"
                  className="px-5 py-3 rounded-full bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all backdrop-blur-md"
                >
                  See deployments
                </a>
              </div>

              {/* Verified Trust Badge with Kabish Photo */}
              <div className="pt-3 flex items-center space-x-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#07070d] overflow-hidden relative">
                    <Image src={`${basePath}/kabish.jpg`} alt="Kabish" fill className="object-cover" />
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#07070d] overflow-hidden relative bg-purple-900 flex items-center justify-center text-[10px] font-bold">
                    <span>KS</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-purple-300/80">
                  MVP Finalist @ KYC Datathon 2.0 • SRMIST
                </span>
              </div>
            </div>

            {/* Right Live Session Glassmorphism Card (Exact replica from video) */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div ref={rightHeroCardRef} className="w-full max-w-md rounded-3xl bg-gradient-to-b from-white/[0.12] to-white/[0.03] border border-purple-500/30 p-6 backdrop-blur-2xl shadow-[0_20px_70px_rgba(76,29,149,0.35)] relative overflow-hidden">
                {/* Header status */}
                <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-200">
                      Live session
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                    LIVE
                  </span>
                </div>

                {/* Kabish Sridar Profile Header inside Card */}
                <div className="flex items-center space-x-3 mb-5 p-2 rounded-2xl bg-black/40 border border-purple-500/20">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-purple-400/80 shadow-[0_0_12px_rgba(168,85,247,0.5)] shrink-0">
                    <Image
                      src={`${basePath}/kabish.jpg`}
                      alt="Kabish Sridar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white leading-tight">Kabish Sridar</span>
                    <span className="text-[11px] font-mono text-purple-300">0.1 mm Metrology Lead • SRMIST</span>
                  </div>
                </div>

                {/* Simulated AI prompt bar */}
                <div className="rounded-2xl bg-black/70 border border-purple-500/30 p-4 mb-6 flex items-center justify-between group hover:border-purple-400/60 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-mono text-neutral-300">
                      Summarise the thread // OM90
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Synthetic Optical Caliper Metrology View */}
                <div className="rounded-xl bg-[#0a0a16] border border-purple-500/20 p-4 mb-4">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2">
                    <span>OPTICAL SENSOR FEED</span>
                    <span className="text-emerald-400 font-bold">0.1 mm CALIBRATED</span>
                  </div>

                  <div className="h-24 rounded-lg bg-black/60 relative overflow-hidden flex items-center justify-center border border-purple-500/20">
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

                {/* Bottom Context Metric (Video match: Context assembled in 42 ms) */}
                <div className="pt-2 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">Context assembled</div>
                    <div className="text-[11px] font-mono text-purple-300/80">Continuous PiCamera v2/v3</div>
                  </div>
                  <div className="font-mono font-bold text-purple-300">38 ms</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. CIRCULAR 3D CYLINDRICAL CAROUSEL SLIDER */}
        {/* ============================================================== */}
        {/* Giant Background Typography Track ("Design that ships...") */}
        <div
          ref={giantTextTrackRef}
          className="absolute inset-x-0 flex items-center pointer-events-none select-none z-10 opacity-0 whitespace-nowrap"
        >
          <span className="text-[15vw] font-black tracking-tighter text-white/10 uppercase leading-none">
            Design that ships • Intelligence that deploys • 
          </span>
        </div>

        {/* 3D Circular Cylindrical Slider Container */}
        <div
          ref={carouselTrackRef}
          id="stage-carousel"
          className="absolute inset-0 flex items-center justify-center z-20 opacity-0 pointer-events-auto"
          style={{ perspective: "1800px" }}
        >
          {/* Circular carousel ring with curved distribution */}
          <div className="relative w-[400px] h-[500px] flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {carouselCards.map((card, idx) => {
              const count = carouselCards.length;
              // Circular angle on a cylinder (spread over 120 degrees)
              const angle = (idx - activeCardIndex) * (140 / (count - 1));
              const rad = (angle * Math.PI) / 180;
              const radius = 560; // cylindrical radius
              const transX = Math.sin(rad) * radius;
              const transZ = (Math.cos(rad) - 1) * radius;
              const isCenter = idx === activeCardIndex;

              return (
                <div
                  key={card.id}
                  onClick={() => setActiveCardIndex(idx)}
                  className={`absolute inset-0 w-[340px] sm:w-[400px] h-[480px] rounded-3xl bg-[#0e0c1a] border ${
                    card.border
                  } p-8 shadow-[0_24px_70px_rgba(0,0,0,0.9)] flex flex-col justify-between transition-all duration-700 cursor-pointer select-none ${
                    isCenter
                      ? "ring-2 ring-purple-400/80 shadow-[0_0_50px_rgba(168,85,247,0.5)] z-30"
                      : "opacity-85 hover:opacity-100 z-10"
                  }`}
                  style={{
                    transform: `translateX(${transX}px) translateZ(${transZ}px) rotateY(${angle * 0.85}deg)`,
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-purple-950/80 border border-purple-500/30 text-purple-200">
                        {card.badge}
                      </span>
                      <Link
                        href={card.url}
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-purple-600 text-white flex items-center justify-center transition-colors shadow-md"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {card.title}
                    </h3>
                    <div className="text-xs font-mono text-purple-300 mb-4">
                      {card.subtitle}
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed font-light mb-6">
                      {card.description}
                    </p>
                  </div>

                  <div>
                    <div className="p-4 rounded-xl bg-black/80 border border-purple-500/20 mb-4">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">
                        {card.statLabel}
                      </div>
                      <div className={`text-2xl font-mono font-black ${card.accent} mt-1`}>
                        {card.stat}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href={card.url}
                        className="text-xs font-mono text-purple-300 hover:text-white font-semibold inline-flex items-center gap-1"
                      >
                        Deep Dive Spec &rarr;
                      </Link>

                      {card.extUrl && (
                        <a
                          href={card.extUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-emerald-400 font-bold hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" /> om90.in Portal
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Explore Collection Pill (Video match) */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-auto">
            <button
              onClick={() => setActiveCardIndex((prev) => (prev + 1) % carouselCards.length)}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_24px_rgba(255,255,255,0.4)] flex items-center gap-2"
            >
              <span>Explore the collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. "BEYOND EVERY LIMIT" + CLICKABLE OPAQUE PORTFOLIO CARD */}
        {/* ============================================================== */}
        <div
          ref={statementStageRef}
          id="stage-statement"
          className="absolute inset-0 flex items-center justify-center px-6 z-20 opacity-0 pointer-events-auto"
        >
          <div className="max-w-6xl w-full mx-auto text-center relative flex flex-col items-center justify-center">
            {/* Massive Split Typography ("Beyond" top-left, "every limit" bottom-right) */}
            <div className="w-full flex justify-start">
              <div className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white/95 uppercase leading-none select-none">
                Beyond
              </div>
            </div>

            {/* Glowing 4-Point Star that scales up and reveals the Clickable Opaque Flagship Metrology Card */}
            <div
              ref={starMotifRef}
              className="my-4 w-full max-w-lg mx-auto flex items-center justify-center relative"
            >
              {/* Opaque Clickable Portfolio Feature Card */}
              <div className="relative w-full rounded-3xl bg-[#0e0c1a] border-2 border-purple-500/70 p-6 sm:p-8 shadow-[0_0_80px_rgba(168,85,247,0.55)] text-left flex flex-col justify-between">
                {/* 4-point star badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.8)]">
                      <svg className="w-4 h-4 text-purple-200" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                      </svg>
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                      FLAGSHIP METROLOGY SYSTEM
                    </span>
                  </div>

                  <a
                    href="https://om90.in/devices/elongation-detector"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>om90.in portal</span>
                  </a>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                  PiCam 0.1 mm Micro-Gap Profiler
                </h3>
                <p className="text-xs text-purple-300/90 font-mono mb-4">
                  Raspberry Pi & PiCamera v2/v3 Native Edge Inspection Rig
                </p>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-6">
                  Engineered calibrated sub-pixel contouring and dynamic homography targets to perform zero-contact industrial gap measurement strictly within <strong className="text-white font-semibold">0.1 mm tolerance</strong>.
                </p>

                <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-black/90 border border-purple-500/30 mb-6">
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400">TOLERANCE</div>
                    <div className="text-base font-mono font-black text-emerald-400">0.1 mm</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400">STREAM RATE</div>
                    <div className="text-base font-mono font-black text-purple-300">30 FPS</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400">HARDWARE</div>
                    <div className="text-base font-mono font-black text-white">Raspberry Pi</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-purple-500/20">
                  <Link
                    href="/projects/gap-measurement"
                    className="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                  >
                    <span>Inspect Full Explanation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => setResumeOpen(true)}
                    className="text-xs font-mono text-purple-300 hover:text-white font-semibold"
                  >
                    View Resume &rarr;
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end">
              <div className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white/95 uppercase leading-none select-none">
                every limit
              </div>
            </div>

            {/* Live Metrics Overlay Grid (matching video stats) */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left w-full">
              {[
                { val: "0.1 mm", label: "Tolerance", sub: "OM90 Sub-Millimeter" },
                { val: "30 FPS", label: "Edge Throughput", sub: "Raspberry Pi & PiCam" },
                { val: "MVP Finalist", label: "Datathon", sub: "KYC Datathon 2.0" },
                { val: "8.7 CGPA", label: "Academic", sub: "SRMIST Computer Science" }
              ].map((m) => (
                <div key={m.label} className="bg-black/90 border border-purple-500/30 p-4 rounded-2xl backdrop-blur-xl">
                  <div className="text-xl sm:text-2xl font-mono font-black text-white">{m.val}</div>
                  <div className="text-[10px] font-mono text-purple-300 uppercase tracking-wider mt-1">{m.label}</div>
                  <div className="text-[9px] text-neutral-400 mt-0.5">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. CURATED WORK SHOWCASE (00:06 - 00:09 in reference video) */}
        {/* ============================================================== */}
        <div
          ref={selectedWorkTrackRef}
          id="stage-work"
          className="absolute inset-0 flex items-center justify-center z-20 opacity-0 pointer-events-auto"
        >
          <div className="flex items-center space-x-8 px-12">
            {projects.map((proj) => {
              const isFlagship = proj.id === "gap-measurement";
              return (
                <div
                  key={proj.id}
                  className={`w-[360px] sm:w-[440px] h-[520px] rounded-3xl p-8 bg-gradient-to-b from-[#110d24] via-[#0b0917] to-black border ${
                    isFlagship ? "border-purple-400/60 shadow-[0_0_50px_rgba(168,85,247,0.3)]" : "border-white/10"
                  } flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group`}
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-purple-950/80 text-purple-300 border border-purple-500/30">
                        {proj.category}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {proj.status}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                      {proj.title}
                    </h3>
                    <div className="text-xs font-mono text-purple-300 mb-4">
                      {proj.tagline}
                    </div>

                    <p className="text-xs text-neutral-300/80 font-light leading-relaxed mb-6">
                      {proj.summary}
                    </p>

                    <div className="space-y-2 mb-6">
                      {proj.highlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-neutral-400">
                          <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.stack.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 border border-white/10 text-neutral-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <Link
                        href={`/projects/${proj.id}`}
                        className="text-xs font-mono font-bold text-purple-300 hover:text-white inline-flex items-center gap-1.5"
                      >
                        Deep Dive Explanation &rarr;
                      </Link>

                      {proj.externalWebsite && (
                        <a
                          href={proj.externalWebsite.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>{proj.externalWebsite.label}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. CURVED PURPLE METALLIC CTA STAGE (00:09 - 00:16 in video) */}
        {/* ============================================================== */}
        <div
          ref={ctaStageRef}
          id="stage-cta"
          className="absolute inset-0 flex items-center justify-center px-6 z-20 opacity-0 pointer-events-auto"
        >
          <div className="max-w-4xl w-full mx-auto rounded-3xl bg-gradient-to-b from-[#180e30] via-[#100a20] to-[#07050d] border border-purple-500/40 p-8 sm:p-14 backdrop-blur-2xl shadow-[0_20px_90px_rgba(168,85,247,0.35)] text-center relative overflow-hidden">
            {/* Top lighting glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-28 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />

            {/* Profile Avatar Showcase */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-purple-400/80 shadow-[0_0_30px_rgba(168,85,247,0.7)]">
              <Image
                src={`${basePath}/kabish.jpg`}
                alt="Kabish Sridar"
                fill
                className="object-cover"
              />
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-[11px] font-mono text-purple-200 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>KABISH SRIDAR // AVAILABLE FOR HIRE & RESEARCH</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Build beyond <br />
              <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-fuchsia-300 bg-clip-text text-transparent">
                every limit
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-300/85 max-w-lg mx-auto font-light leading-relaxed">
              Connect directly for production edge vision models, sub-millimeter metrology, and embedded automation engineering.
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${profileData.contact.email}`}
                className="px-7 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-sm transition-all shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center gap-2 group"
              >
                <Mail className="w-4 h-4" />
                <span>Get started &rarr;</span>
              </a>

              <button
                onClick={() => setResumeOpen(true)}
                className="px-7 py-3.5 rounded-full bg-purple-900/50 hover:bg-purple-900/70 border border-purple-500/40 text-purple-200 font-semibold text-sm transition-all backdrop-blur-md flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Inspect PDF Resume</span>
              </button>
            </div>

            {/* Social channels */}
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
        </div>
      </div>

      {/* PDF Resume Pop-up Modal with View and Download Actions */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        resumeUrl={`${basePath}/Kabish_Sridar_Resume.pdf`}
      />
    </div>
  );
}
