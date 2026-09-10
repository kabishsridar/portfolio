"use client";

import { useEffect, useState, useRef } from "react";

export default function PrecisionCursor() {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [mode, setMode] = useState<"default" | "pointer" | "loupe">("default");
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const cursorRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const trailRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Inspect target element for cursor mode
      const target = e.target as HTMLElement | null;
      if (target) {
        if (target.closest("[data-cursor='loupe']") || target.closest(".project-viewport")) {
          setMode("loupe");
        } else if (
          target.closest("button") ||
          target.closest("a") ||
          target.closest("[role='button']") ||
          target.closest("input") ||
          target.closest("select") ||
          target.closest("textarea")
        ) {
          setMode("pointer");
        } else {
          setMode("default");
        }
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth lerp loop for the outer reticle
    const render = () => {
      const lerpFactor = 0.22;
      trailRef.current.x += (cursorRef.current.x - trailRef.current.x) * lerpFactor;
      trailRef.current.y += (cursorRef.current.y - trailRef.current.y) * lerpFactor;
      setPos({ x: Math.round(trailRef.current.x), y: Math.round(trailRef.current.y) });
      rafId.current = requestAnimationFrame(render);
    };
    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  if (isTouch || !visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-200">
      {/* Precision Center Pin / Crosshair Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-tactical-amber -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          transform: `translate3d(${cursorRef.current.x}px, ${cursorRef.current.y}px, 0)`,
        }}
      />

      {/* Reticle / Loupe Ring with dynamic coordinate telemetry */}
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out flex items-center justify-center ${
          mode === "loupe"
            ? "w-24 h-24 border border-tactical-amber/80 rounded-full backdrop-invert-10 bg-tactical-amber/5"
            : mode === "pointer"
            ? "w-10 h-10 border border-tactical-green rounded-full bg-tactical-green/10 scale-110"
            : "w-8 h-8 border border-tactical-amber/40 rounded-none rotate-45"
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) ${mode === "default" ? "rotate(45deg)" : "rotate(0deg)"}`,
        }}
      >
        {/* Loupe inner cross lines */}
        {mode === "loupe" && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-full h-px bg-tactical-amber/30" />
            <div className="h-full w-px bg-tactical-amber/30 absolute" />
            <span className="absolute bottom-2 text-[8px] font-mono text-tactical-amber tracking-widest uppercase">
              LOUPE 2.4X
            </span>
          </div>
        )}
      </div>

      {/* Dynamic Coordinate Telemetry Tag */}
      <div
        className="fixed top-0 left-0 pl-4 pt-4 pointer-events-none text-[9px] font-mono tracking-wider text-tactical-muted whitespace-nowrap"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <span className="text-tactical-amber">[</span>
        {pos.x.toString().padStart(4, "0")}, {pos.y.toString().padStart(4, "0")}
        <span className="text-tactical-amber">]</span>
        {mode === "loupe" && <span className="ml-1 text-tactical-green">[INSPECT]</span>}
      </div>
    </div>
  );
}
