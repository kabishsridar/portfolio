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
  FileText
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
  const heroTextRef = useRef<HTMLDivElement>(null);
  const revealContainerRef = useRef<HTMLDivElement>(null);
  const sofaRevealedImageRef = useRef<HTMLDivElement>(null);

  const [greeting, setGreeting] = useState("Good morning!");
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  // Valentin's exact 3D rotating text choices
  const tickerWords = ["Metrology", "Edge Vision", "PLC Systems", "Robotics", "Deep AI"];

  // Mapping actual portfolio project visual showcases (replacing boxing image)
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
      // 2. HERO ZOOM ON SCROLL & TEXT FLOAT UP (Valentin's exact hero scroll sequence)
      if (heroImageWrapRef.current && heroTextRef.current) {
        gsap.to(heroImageWrapRef.current, {
          scrollTrigger: {
            trigger: "#valentin-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          scale: 1.15,
          y: 80,
          opacity: 0.25,
          ease: "none",
        });

        gsap.to(heroTextRef.current, {
          scrollTrigger: {
            trigger: "#valentin-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: -120,
          opacity: 0,
          ease: "none",
        });
      }

      // 3. HORIZONTAL MOVING STRIP IN INTRO
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

      // 4. BOTTOM REVEAL TRANSITION: Standing Portrait wipes/unmasks to reveal the Seated Sofa Portrait
      if (sofaRevealedImageRef.current && revealContainerRef.current) {
        gsap.fromTo(
          sofaRevealedImageRef.current,
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: revealContainerRef.current,
              start: "top 80%",
              end: "bottom bottom",
              scrub: 1.2,
            },
          }
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

  const selectedProject = projects[activeProjectIdx] || projects[0];
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

          {/* Socials / Links Bar (Valentin exact style: Socials / li / dr / tw) */}
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
      {/* 2. HERO: LANDSCAPE VIEW OF KABISH SEATED (NO WINE GLASS) + ZOOM ON SCROLL */}
      {/* ========================================================================= */}
      <section
        id="valentin-hero"
        className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden"
      >
        {/* Full Landscape Background Image of Kabish Seated in Black Suit & Coolers (Hands resting, NO GLASS) */}
        <div
          ref={heroImageWrapRef}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
        >
          <Image
            src={`${basePath}/kabish_hero_landscape.jpg`}
            alt="Kabish Sridar wide landscape portrait in black suit and coolers — Valentin Cheval style"
            fill
            priority
            className="object-cover object-center filter brightness-[0.85] contrast-[1.05]"
            sizes="100vw"
          />
          {/* Subtle Dark Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-[#0c0d10]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d10]/90 via-[#0c0d10]/30 to-transparent" />
        </div>

        {/* Foreground Hero Content Container */}
        <div
          ref={heroTextRef}
          className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-12 flex-1 flex flex-col justify-between my-auto"
        >
          {/* Top Scope & CTA */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-6">
            <div className="md:col-span-6 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff3d00] block">
                Disciplines &amp; Scope
              </span>
              <ul className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/80 font-mono">
                <li>Website Design</li>
                <li>•</li>
                <li>Optical Metrology</li>
                <li>•</li>
                <li>Edge Vision</li>
                <li>•</li>
                <li>PLC Automation</li>
              </ul>
            </div>

            <div className="md:col-span-6 flex md:justify-end items-center">
              <a
                href={`mailto:${profileData.contact.email}`}
                className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-white hover:text-[#ff3d00] transition-colors group"
              >
                <span>How can I help?</span>
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#ff3d00] transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>
            </div>
          </div>

          {/* Center Main Headline with 3D Rotating Ticker */}
          <div className="py-16 md:py-24 space-y-6 max-w-4xl">
            <div className="space-y-1">
              <p className="text-sm font-mono uppercase tracking-widest text-white/50">
                Hi there! this is
              </p>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Kabish <span className="text-white/40">Sridar</span>
              </h2>
            </div>

            {/* Valentin's EXACT Giant Typographic Structure */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.95] text-white">
              Engineering
              <br />
              <span className="text-white/30 font-medium">for</span>{" "}
              <span className="inline-block relative h-[1.1em] overflow-hidden align-top text-[#ff3d00]">
                <span
                  key={tickerIndex}
                  className="inline-block animate-in slide-in-from-bottom-8 duration-500 font-black"
                >
                  {tickerWords[tickerIndex]}
                </span>
              </span>
            </h1>

            <p className="text-sm sm:text-base text-white/70 max-w-xl font-light leading-relaxed">
              Award-finalist AI/ML &amp; Embedded Systems Engineer. Specializing in high-precision optical metrology, edge computer vision, and deterministic PLC process automation.
            </p>

            {/* Official Valentin Award Badges (Red Dot, UX Design, DFA) */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="h-9 w-auto opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src={`${basePath}/red-dot-white.BCoP2Tnu.svg`}
                  alt="Award Logo"
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
                  alt="Design for Asia Award"
                  width={38}
                  height={38}
                  className="h-full w-auto object-contain"
                />
              </div>
              <span className="text-xs font-mono text-white/40 pl-2 border-l border-white/10">
                MVP Finalist • KYC Datathon 2.0
              </span>
            </div>
          </div>

          {/* Bottom Bar Indicator */}
          <div className="border-t border-white/10 pt-6 flex items-center justify-between text-xs font-mono text-white/40">
            <span>SRM UNIVERSITY • CHENNAI, TAMIL NADU</span>
            <a
              href="#valentin-intro"
              className="text-[#ff3d00] hover:text-white transition-colors"
            >
              (Scroll down)
            </a>
          </div>
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
      <section
        id="valentin-projects"
        className="py-28 border-t border-white/10 bg-[#0c0d10]"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-16">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff3d00]">
                Projects I worked on 2024–2026 (Portfolio)
              </span>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase">
                Selected Works
              </h2>
            </div>

            <div className="text-xs font-mono text-white/50">
              0{activeProjectIdx + 1} / 0{projects.length}
            </div>
          </div>

          {/* Valentin 3-Column Layout: Left Thumbnails/Nav | Center Dynamic Switch Images | Right Metadata */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Column 1 (Left): Project List Selector */}
            <div className="lg:col-span-3 space-y-3">
              {projects.slice(0, 4).map((proj, idx) => {
                const isActive = idx === activeProjectIdx;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`w-full text-left p-4 rounded-xl transition-all border ${
                      isActive
                        ? "bg-white/[0.08] border-[#ff3d00] text-white"
                        : "bg-transparent border-white/[0.06] text-white/40 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                      {proj.code}
                    </span>
                    <p className="text-sm font-semibold tracking-tight mt-1">{proj.title}</p>
                    <span className="text-[11px] text-[#ff3d00] font-mono block mt-1">
                      {proj.keyMetric}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Column 2 (Center): Dynamic Image Switching Area (Actual Project Imagery — NO BOXER) */}
            <div className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#111216] border border-white/10 shadow-2xl group">
              <Image
                key={selectedProject.id}
                src={activeImageSrc}
                alt={selectedProject.title}
                fill
                className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Bottom Badge in Center Image */}
              <div className="absolute bottom-6 inset-x-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff3d00] block">
                  Active Display • {selectedProject.category}
                </span>
                <p className="text-sm font-bold text-white mt-1">{selectedProject.title}</p>
              </div>
            </div>

            {/* Column 3 (Right): Valentin Exact Metadata Hierarchy (Year / Role / Description / All projects) */}
            <div className="lg:col-span-4 space-y-8 pl-0 lg:pl-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block">
                  Year
                </span>
                <p className="text-4xl font-black text-white">2026</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block">
                  Role
                </span>
                <p className="text-base font-semibold text-white">
                  Lead Embedded AI &amp; Robotics Engineer
                </p>
                <span className="text-xs text-white/50 block font-mono">
                  Architecture • Algorithm Design • Hardware Rig
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block">
                  Description
                </span>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  {selectedProject.summary}
                </p>
              </div>

              {/* Hardware Stack Pills */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block">
                  Hardware &amp; Frameworks
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href="#valentin-ending-reveal"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-[#ff3d00] hover:text-white transition-colors"
                >
                  <span>All projects</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ENDING REVEAL: STANDING IMAGE WIPES/UNMASKS TO REVEAL THE SOFA IMAGE   */}
      {/* ========================================================================= */}
      <section
        id="valentin-ending-reveal"
        ref={revealContainerRef}
        className="relative min-h-screen py-24 border-t border-white/10 bg-[#090a0d] flex items-center overflow-hidden"
      >
        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Contact Transition */}
          <div className="lg:col-span-6 space-y-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff3d00] block">
              (Transition &amp; Identity)
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-[1.05]">
              Built with precision.
              <br />
              <span className="text-white/40">Ready for deployment.</span>
            </h2>

            <p className="text-sm sm:text-base text-white/70 max-w-lg font-light leading-relaxed">
              From academic research in real-time computer vision to industrial plant commissioning on ABB AC500 PLCs, every line of code and hardware pin is engineered for reliability.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block">
                Direct Contact
              </span>
              <a
                href={`mailto:${profileData.contact.email}`}
                className="text-2xl sm:text-4xl font-bold text-white hover:text-[#ff3d00] transition-colors tracking-tight block uppercase break-all font-mono"
              >
                {profileData.contact.email}
              </a>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <a
                href={`mailto:${profileData.contact.email}`}
                className="px-6 py-3 rounded-full text-xs font-semibold bg-[#ff3d00] hover:bg-[#ff5722] text-white shadow-[0_0_20px_rgba(255,61,0,0.4)] transition-all flex items-center space-x-2"
              >
                <span>Initiate Conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsResumeOpen(true)}
                className="px-5 py-3 rounded-full text-xs font-semibold border border-white/20 hover:border-white/50 text-white bg-white/5 transition-all"
              >
                Download Resume PDF
              </button>
            </div>
          </div>

          {/* Right Column: Scroll Wipe Transition — Standing Portrait unmasks to reveal the Seated Sofa Portrait */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[440px] aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] bg-[#111216]">
              
              {/* Base Layer: Standing Suit Portrait */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={`${basePath}/kabish_standing_suit.jpg`}
                  alt="Kabish Sridar standing in black suit and coolers"
                  fill
                  className="object-cover object-center filter brightness-[0.92] contrast-[1.05]"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-white/70">
                  Standing Pose
                </div>
              </div>

              {/* Reveal Layer: Seated Sofa Portrait wipes down over standing image */}
              <div
                ref={sofaRevealedImageRef}
                className="absolute inset-0 w-full h-full will-change-[clip-path,transform]"
              >
                <Image
                  src={`${basePath}/kabish_hero_landscape.jpg`}
                  alt="Kabish Sridar seated in emerald armchair revealed on scroll"
                  fill
                  className="object-cover object-center filter brightness-[0.95] contrast-[1.08]"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#ff3d00]/20 border border-[#ff3d00]/40 text-[10px] font-mono text-[#ff3d00]">
                  Sofa Reveal ✦
                </div>
              </div>

              {/* Bottom HUD Tag */}
              <div className="absolute bottom-6 inset-x-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between z-20">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff3d00] block">
                    Verified Credentials
                  </span>
                  <p className="text-xs font-bold text-white">Kabish Sridar • CSE (AI &amp; ML)</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff3d00] animate-ping" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="py-16 border-t border-white/10 bg-[#07080a] text-xs font-mono text-white/40">
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
