"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, Download, Terminal, Zap } from "lucide-react";
import V3CounterMetric from "./V3CounterMetric";
import V3HologramAvatar from "./V3HologramAvatar";
import { profileData } from "@/data/profile";

interface V3HeroProps {
  onOpenTerminal: () => void;
}

const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

export default function V3Hero({ onOpenTerminal }: V3HeroProps) {
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (lettersRef.current.length > 0) {
      gsap.fromTo(
        lettersRef.current,
        {
          y: 60,
          opacity: 0,
          rotateX: -70,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.03,
          ease: "power4.out",
          delay: 0.1,
        }
      );
    }
  }, []);

  const heroName = "KABISH SRIDAR";

  return (
    <section
      id="v3-hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-10 overflow-hidden border-b border-tactical-border"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pl-10 md:pl-24 my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left 7 Cols: Typography, Counters & Triggers */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Version 3 Hyper-Scroll Banner */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 border border-blue-500/50 bg-blue-500/10 text-blue-400 font-mono-tech text-xs tracking-widest uppercase">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              <span>CINEMATIC HYPER-SCROLL // 3D CAMERA FLIGHT</span>
            </div>

            {/* Monumental Kinetic Header */}
            <div className="space-y-1">
              <div className="overflow-hidden">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-tactical-ivory leading-none flex flex-wrap">
                  {heroName.split("").map((char, index) => (
                    <span
                      key={index}
                      ref={(el) => {
                        if (el) lettersRef.current[index] = el;
                      }}
                      className={`inline-block ${char === " " ? "w-3 sm:w-6" : ""}`}
                    >
                      {char}
                    </span>
                  ))}
                </h1>
              </div>

              <p className="text-lg sm:text-2xl font-extrabold text-blue-400 font-mono-tech tracking-tight pt-1">
                AI/ML SYSTEMS ENGINEER &amp; EMBEDDED SILICON
              </p>
            </div>

            {/* Narrative */}
            <p className="text-sm sm:text-base text-tactical-ivory/90 max-w-xl font-medium leading-relaxed">
              Bridging <span className="text-tactical-amber">deep neural models</span> with{" "}
              <span className="text-tactical-green">edge silicon</span>, industrial PLC automation, and real-time optical metrology.
            </p>

            {/* Live Counting Benchmark Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl font-mono-tech">
              <div className="p-2.5 border border-tactical-border/80 bg-tactical-surface/70 backdrop-blur-md">
                <span className="text-[9px] text-tactical-dim block uppercase">EMOTION</span>
                <span className="text-lg font-black text-tactical-green">
                  <V3CounterMetric target={30} suffix=" FPS" />
                </span>
              </div>
              <div className="p-2.5 border border-tactical-border/80 bg-tactical-surface/70 backdrop-blur-md">
                <span className="text-[9px] text-tactical-dim block uppercase">RASI PLC</span>
                <span className="text-lg font-black text-tactical-amber">
                  <V3CounterMetric target={0.1} prefix="±" suffix="%" decimals={1} />
                </span>
              </div>
              <div className="p-2.5 border border-tactical-border/80 bg-tactical-surface/70 backdrop-blur-md">
                <span className="text-[9px] text-tactical-dim block uppercase">THALI mAP</span>
                <span className="text-lg font-black text-blue-400">
                  <V3CounterMetric target={93.8} suffix="%" decimals={1} />
                </span>
              </div>
              <div className="p-2.5 border border-tactical-border/80 bg-tactical-surface/70 backdrop-blur-md">
                <span className="text-[9px] text-tactical-dim block uppercase">DEEP OCR</span>
                <span className="text-lg font-black text-tactical-ivory">
                  <V3CounterMetric target={92.4} suffix="%" decimals={1} />
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 font-mono-tech text-xs">
              <a
                href="#v3-projects"
                className="flex items-center space-x-2 px-5 py-3.5 bg-blue-500 text-tactical-base font-black tracking-wider uppercase hover:bg-tactical-ivory transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                <span>SUPER-SCROLL SHOWCASE</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>

              <button
                onClick={onOpenTerminal}
                className="flex items-center space-x-2 px-4 py-3.5 border border-tactical-border bg-tactical-surface hover:border-blue-500 hover:text-blue-400 transition-all tracking-wider uppercase text-tactical-ivory font-bold"
              >
                <Terminal className="w-4 h-4 text-blue-400" />
                <span>TERMINAL [^~]</span>
              </button>

              <a
                href={`${basePath}/Kabish_Sridar_Resume.pdf`}
                download="Kabish_Sridar_Resume.pdf"
                className="flex items-center space-x-2 px-4 py-3.5 border border-tactical-border/70 text-tactical-muted hover:text-tactical-ivory transition-colors tracking-wider uppercase"
              >
                <Download className="w-4 h-4" />
                <span>DOSSIER</span>
              </a>
            </div>

          </div>

          {/* Right 5 Cols: Interactive 3D Hologram Avatar & Photo Scan */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <V3HologramAvatar />
          </div>

        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pl-10 md:pl-24 border-t border-tactical-border/70 pt-3 flex items-center justify-between font-mono-tech text-[11px] text-tactical-muted">
        <div className="flex items-center space-x-4">
          <span className="text-blue-400">[CAMERA: ORBITAL Z-FLIGHT]</span>
          <span className="hidden sm:inline text-tactical-dim">MOVE MOUSE OVER AVATAR FOR 3D PERSPECTIVE</span>
        </div>
        <div className="flex items-center space-x-2 text-tactical-ivory">
          <span>PINNED PARALLAX READY</span>
          <ArrowDown className="w-3.5 h-3.5 text-blue-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
