"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function V2Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [skew, setSkew] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let lastScroll = window.scrollY;
    let timeout: NodeJS.Timeout;

    const onScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScroll;
      lastScroll = currentScroll;

      // Calculate velocity skew capped between -8 and 8 deg
      const calculatedSkew = Math.max(-8, Math.min(8, delta * 0.12));
      setSkew(calculatedSkew);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setSkew(0);
      }, 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
    };
  }, []);

  const items = [
    "AI/ML INFERENCE",
    "EMBEDDED SILICON",
    "INDUSTRIAL PLC AUTOMATION",
    "SUB-MILLIMETER METROLOGY",
    "FOOD SEGMENTATION & NUTRITION",
    "DEEP HANDWRITING OCR",
    "IEC 61131-3 STRUCTURED TEXT",
    "OPENCV & PYTORCH",
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden border-y border-tactical-border/80 bg-tactical-surface/70 py-4 backdrop-blur-md select-none"
    >
      <div
        ref={textRef}
        style={{
          transform: `skewX(${skew}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className="flex whitespace-nowrap font-mono-tech text-xs tracking-widest uppercase font-bold"
      >
        {/* Repeating content for seamless infinite marquee loop */}
        <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center space-x-8 pr-8">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-8">
              <span className="text-tactical-ivory/90 hover:text-tactical-amber transition-colors">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-tactical-amber inline-block" />
            </div>
          ))}
        </div>

        <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center space-x-8 pr-8" aria-hidden="true">
          {items.map((item, idx) => (
            <div key={`dup-${idx}`} className="flex items-center space-x-8">
              <span className="text-tactical-ivory/90 hover:text-tactical-amber transition-colors">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-tactical-green inline-block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
