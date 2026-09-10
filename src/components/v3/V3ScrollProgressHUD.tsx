"use client";

import { useEffect, useState, useRef } from "react";
import { Activity, Compass, Zap } from "lucide-react";

export default function V3ScrollProgressHUD() {
  const [depth, setDepth] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [activeSection, setActiveSection] = useState("HERO");
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());

  useEffect(() => {
    const sections = [
      { id: "v3-hero", name: "01 // HERO" },
      { id: "v3-projects", name: "02 // SCHEMATICS" },
      { id: "v3-hardware", name: "03 // HARDWARE LAB" },
      { id: "v3-radar", name: "04 // RADAR MATRIX" },
      { id: "v3-academic", name: "05 // ACADEMICS" },
      { id: "v3-contact", name: "06 // TRANSMIT" },
    ];

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = Date.now();
      const dt = Math.max(1, now - lastTimestamp.current);
      const dy = Math.abs(currentScrollY - lastScrollY.current);
      const computedVelocity = Math.round((dy / dt) * 1000);

      setVelocity(computedVelocity);
      lastScrollY.current = currentScrollY;
      lastTimestamp.current = now;

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      setDepth(progress);

      // Determine active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(sections[i].name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-16 right-4 sm:right-8 z-30 pointer-events-none hidden lg:flex items-center space-x-3 font-mono-tech text-[10px] select-none">
      
      {/* Real-time telemetry capsule */}
      <div className="flex items-center space-x-2.5 px-3 py-1.5 border border-tactical-border/80 bg-tactical-base/80 backdrop-blur-md text-tactical-ivory shadow-lg">
        <div className="flex items-center space-x-1.5 text-blue-400">
          <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: "12s" }} />
          <span className="font-bold">{activeSection}</span>
        </div>

        <span className="text-tactical-border">|</span>

        <div className="flex items-center space-x-1 text-tactical-green">
          <Activity className="w-3 h-3" />
          <span>{depth.toFixed(1)}%</span>
        </div>

        <span className="text-tactical-border">|</span>

        <div className="text-tactical-muted text-[9px]">
          {velocity} <span className="text-[8px]">PX/S</span>
        </div>
      </div>

      {/* Mini Visual Level Bar */}
      <div className="w-16 h-1.5 bg-tactical-surface border border-tactical-border relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-tactical-green to-tactical-amber transition-all duration-75"
          style={{ width: `${depth}%` }}
        />
      </div>

    </div>
  );
}
