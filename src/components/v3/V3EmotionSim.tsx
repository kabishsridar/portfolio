"use client";

import { useEffect, useRef, useState } from "react";
import { Sliders, Sparkles, Zap, Brain, Eye, Cpu } from "lucide-react";

type EmotionState = "focus" | "analytical" | "intense" | "calm";

export default function V3EmotionSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeState, setActiveState] = useState<EmotionState>("focus");
  const [confidence, setConfidence] = useState(98.4);
  const [redisLatency, setRedisLatency] = useState(1.18);

  const stateRef = useRef(activeState);
  useEffect(() => {
    stateRef.current = activeState;
  }, [activeState]);

  // Scores for emotions
  const emotionScores: Record<EmotionState, { focus: number; analytical: number; neuralLoad: number; calm: number }> = {
    focus: { focus: 92, analytical: 84, neuralLoad: 68, calm: 18 },
    analytical: { focus: 88, analytical: 96, neuralLoad: 78, calm: 10 },
    intense: { focus: 97, analytical: 89, neuralLoad: 94, calm: 4 },
    calm: { focus: 45, analytical: 50, neuralLoad: 22, calm: 88 },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "#070b0e";
      ctx.fillRect(0, 0, w, h);

      // Subtle background grid
      ctx.strokeStyle = "rgba(0, 255, 102, 0.06)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw bounding box
      const cx = w * 0.5;
      const cy = h * 0.48;
      const bw = 110;
      const bh = 130;

      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cx - bw / 2, cy - bh / 2, bw, bh);

      // Corner brackets
      const bracketLen = 14;
      ctx.strokeStyle = "#00ff66";
      ctx.lineWidth = 2.5;

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(cx - bw / 2, cy - bh / 2 + bracketLen);
      ctx.lineTo(cx - bw / 2, cy - bh / 2);
      ctx.lineTo(cx - bw / 2 + bracketLen, cy - bh / 2);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(cx + bw / 2 - bracketLen, cy - bh / 2);
      ctx.lineTo(cx + bw / 2, cy - bh / 2);
      ctx.lineTo(cx + bw / 2, cy - bh / 2 + bracketLen);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(cx - bw / 2, cy + bh / 2 - bracketLen);
      ctx.lineTo(cx - bw / 2, cy + bh / 2);
      ctx.lineTo(cx - bw / 2 + bracketLen, cy + bh / 2);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(cx + bw / 2 - bracketLen, cy + bh / 2);
      ctx.lineTo(cx + bw / 2, cy + bh / 2);
      ctx.lineTo(cx + bw / 2, cy + bh / 2 - bracketLen);
      ctx.stroke();

      // Subtle breathing micro-motion
      const current = stateRef.current;
      const jitterAmp = current === "intense" ? 2.5 : 1.0;
      const jx = Math.sin(t * 1.5) * jitterAmp;
      const jy = Math.cos(t * 1.8) * jitterAmp;

      // Key Facial landmark points
      const landmarks = [
        // Jawline arc
        { x: -35, y: -20 }, { x: -32, y: 10 }, { x: -22, y: 35 }, { x: 0, y: 48 },
        { x: 22, y: 35 }, { x: 32, y: 10 }, { x: 35, y: -20 },
        // Eyebrows
        { x: -28, y: -26 }, { x: -16, y: -30 }, { x: -6, y: -28 },
        { x: 6, y: -28 }, { x: 16, y: -30 }, { x: 28, y: -26 },
        // Left eye
        { x: -22, y: -16 }, { x: -14, y: -18 }, { x: -8, y: -16 }, { x: -14, y: -14 },
        // Right eye
        { x: 8, y: -16 }, { x: 14, y: -18 }, { x: 22, y: -16 }, { x: 14, y: -14 },
        // Nose bridge & tip
        { x: 0, y: -20 }, { x: 0, y: -8 }, { x: 0, y: 2 }, { x: -6, y: 8 }, { x: 6, y: 8 },
        // Mouth
        { x: -16, y: 22 }, { x: -8, y: 20 }, { x: 0, y: 21 }, { x: 8, y: 20 }, { x: 16, y: 22 },
        { x: 8, y: 28 }, { x: 0, y: 29 }, { x: -8, y: 28 },
      ];

      // Draw wireframe connecting mesh lines
      ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      landmarks.forEach((p, idx) => {
        const next = landmarks[(idx + 3) % landmarks.length];
        ctx.moveTo(cx + p.x + jx, cy + p.y + jy);
        ctx.lineTo(cx + next.x + jx, cy + next.y + jy);
      });
      ctx.stroke();

      // Draw glowing landmark vertices
      landmarks.forEach((p) => {
        ctx.fillStyle = "#00ff66";
        ctx.beginPath();
        ctx.arc(cx + p.x + jx, cy + p.y + jy, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // HUD Text inside canvas
      ctx.fillStyle = "#38bdf8";
      ctx.font = "9px monospace";
      ctx.fillText(`FPS: 30.0 | CONF: ${(98 + Math.sin(t) * 0.8).toFixed(1)}%`, cx - bw / 2, cy - bh / 2 - 6);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const currentScores = emotionScores[activeState];

  return (
    <div className="border border-tactical-border bg-tactical-surface/90 backdrop-blur-xl p-4 sm:p-5 font-mono-tech space-y-4">
      <div className="flex items-center justify-between border-b border-tactical-border pb-2.5 text-xs">
        <div className="flex items-center space-x-2">
          <Brain className="w-4 h-4 text-tactical-green animate-pulse" />
          <span className="font-bold text-tactical-ivory uppercase">
            EMO-REX // REAL-TIME INFERENCE PLAYGROUND
          </span>
        </div>
        <span className="text-[10px] text-blue-400">REDIS STATE CACHE: {redisLatency} ms</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Canvas Landmark Mesh Preview */}
        <div className="relative w-full h-44 bg-[#070b0e] border border-tactical-border overflow-hidden">
          <canvas
            ref={canvasRef}
            width={280}
            height={180}
            className="w-full h-full block"
          />
        </div>

        {/* Emotion Softmax Bars */}
        <div className="space-y-2.5 text-xs">
          <div>
            <div className="flex justify-between text-[10px] pb-1">
              <span className="text-tactical-ivory font-bold">ANALYTICAL FOCUS</span>
              <span className="text-blue-400 font-bold">{currentScores.analytical}%</span>
            </div>
            <div className="h-2 bg-tactical-base border border-tactical-border/70 overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300 shadow-[0_0_8px_#3b82f6]"
                style={{ width: `${currentScores.analytical}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] pb-1">
              <span className="text-tactical-ivory font-bold">COGNITIVE ENGAGEMENT</span>
              <span className="text-tactical-green font-bold">{currentScores.focus}%</span>
            </div>
            <div className="h-2 bg-tactical-base border border-tactical-border/70 overflow-hidden">
              <div
                className="h-full bg-tactical-green transition-all duration-300 shadow-[0_0_8px_#00ff66]"
                style={{ width: `${currentScores.focus}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] pb-1">
              <span className="text-tactical-ivory font-bold">NEURAL LOAD (COMPUTE)</span>
              <span className="text-tactical-amber font-bold">{currentScores.neuralLoad}%</span>
            </div>
            <div className="h-2 bg-tactical-base border border-tactical-border/70 overflow-hidden">
              <div
                className="h-full bg-tactical-amber transition-all duration-300 shadow-[0_0_8px_#ffaa00]"
                style={{ width: `${currentScores.neuralLoad}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] pb-1">
              <span className="text-tactical-ivory font-bold">EQUILIBRIUM / CALM</span>
              <span className="text-purple-400 font-bold">{currentScores.calm}%</span>
            </div>
            <div className="h-2 bg-tactical-base border border-tactical-border/70 overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-300 shadow-[0_0_8px_#a855f7]"
                style={{ width: `${currentScores.calm}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* State Switcher */}
      <div className="pt-2 border-t border-tactical-border/70 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-[10px] text-tactical-dim uppercase font-bold flex items-center gap-1">
          <Sliders className="w-3 h-3 text-tactical-amber" />
          SIMULATE AFFECTIVE STATE:
        </span>
        <div className="flex space-x-1.5">
          {(["focus", "analytical", "intense", "calm"] as EmotionState[]).map((st) => (
            <button
              key={st}
              onClick={() => setActiveState(st)}
              className={`px-2 py-0.5 border text-[10px] font-bold uppercase transition-all ${
                activeState === st
                  ? "border-tactical-green bg-tactical-green/20 text-tactical-green"
                  : "border-tactical-border bg-tactical-base text-tactical-muted hover:text-tactical-ivory"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
