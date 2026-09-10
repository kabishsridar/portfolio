"use client";

import { useEffect, useState } from "react";

export default function V3LaserCircuit() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setScrollProgress(maxScroll > 0 ? Math.min(1, current / maxScroll) : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkpoints = [
    { label: "01", name: "HERO", target: "#v3-hero", progress: 0.05 },
    { label: "02", name: "SCHEMATICS", target: "#v3-projects", progress: 0.22 },
    { label: "03", name: "HARDWARE LAB", target: "#v3-hardware", progress: 0.44 },
    { label: "04", name: "RADAR MATRIX", target: "#v3-radar", progress: 0.62 },
    { label: "05", name: "ACADEMICS", target: "#v3-academic", progress: 0.80 },
    { label: "06", name: "TRANSMIT", target: "#v3-contact", progress: 0.96 },
  ];

  return (
    <div className="fixed left-3 sm:left-6 top-24 bottom-20 z-30 pointer-events-none hidden md:flex flex-col items-center justify-between font-mono-tech select-none">
      
      {/* Background Track Guide Line with micro tick marks */}
      <div className="absolute top-0 bottom-0 w-[1.5px] bg-tactical-border/60" />

      {/* Dynamic Glowing Laser Circuit Trace */}
      <div
        className="absolute top-0 w-[2.5px] bg-gradient-to-b from-blue-500 via-tactical-green to-tactical-amber shadow-[0_0_15px_rgba(0,255,102,0.9)] transition-all duration-75"
        style={{ height: `${scrollProgress * 100}%` }}
      />

      {/* Pulsing Laser Head with Spark Ring */}
      <div
        className="absolute w-3.5 h-3.5 rounded-full bg-tactical-green shadow-[0_0_20px_#00ff66] -translate-x-1/2 -translate-y-1/2 transition-all duration-75 flex items-center justify-center"
        style={{ top: `${scrollProgress * 100}%`, left: "50%" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-tactical-base animate-ping" />
      </div>

      {/* Section Waypoints */}
      {checkpoints.map((cp) => {
        const passed = scrollProgress >= cp.progress - 0.04;
        const isActive = Math.abs(scrollProgress - cp.progress) < 0.08;

        return (
          <a
            key={cp.label}
            href={cp.target}
            className="pointer-events-auto relative group flex items-center"
          >
            {/* Animated Radar Pulse Ring when near current section */}
            {isActive && (
              <span className="absolute -inset-1.5 border border-tactical-green rounded-full animate-ping opacity-75 pointer-events-none" />
            )}

            {/* Waypoint Dot */}
            <div
              className={`w-4 h-4 rounded-none border transition-all duration-300 flex items-center justify-center text-[8px] font-bold ${
                passed
                  ? "border-tactical-green bg-tactical-green text-tactical-base shadow-[0_0_12px_#00ff66]"
                  : "border-tactical-border bg-tactical-base text-tactical-muted group-hover:border-blue-400 group-hover:text-tactical-ivory"
              }`}
            >
              {cp.label}
            </div>

            {/* Futuristic Hover Tooltip */}
            <span className="absolute left-6 px-2.5 py-1 border border-tactical-border bg-tactical-base/95 text-tactical-ivory text-[9px] uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl backdrop-blur-md flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-blue-400" />
              {cp.name}
            </span>
          </a>
        );
      })}

      {/* Numerical Depth Percentage at Bottom of Line */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-tactical-green font-bold bg-tactical-base/90 px-1 border border-tactical-border/70">
        {(scrollProgress * 100).toFixed(0)}%
      </div>
    </div>
  );
}
