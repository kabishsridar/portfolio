"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, Play, Pause, RefreshCw, Sliders, Waves, Zap } from "lucide-react";

type WaveType = "i2c" | "spi" | "pwm" | "optical";

export default function V3Oscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [waveType, setWaveType] = useState<WaveType>("i2c");
  const [frequency, setFrequency] = useState<number>(2);
  const [dutyCycle, setDutyCycle] = useState<number>(50);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [voltageScale, setVoltageScale] = useState<string>("3.3V Logic");

  const waveTypeRef = useRef(waveType);
  const freqRef = useRef(frequency);
  const dutyRef = useRef(dutyCycle);
  const runningRef = useRef(isRunning);

  useEffect(() => {
    waveTypeRef.current = waveType;
  }, [waveType]);

  useEffect(() => {
    freqRef.current = frequency;
  }, [frequency]);

  useEffect(() => {
    dutyRef.current = dutyCycle;
  }, [dutyCycle]);

  useEffect(() => {
    runningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const render = () => {
      if (runningRef.current) {
        time += 0.035 * freqRef.current;
      }

      const w = canvas.width;
      const h = canvas.height;

      // Dark CRT phosphor fade
      ctx.fillStyle = "rgba(9, 13, 18, 0.28)";
      ctx.fillRect(0, 0, w, h);

      // Draw Tactical CRT Grid
      ctx.strokeStyle = "rgba(0, 255, 102, 0.08)";
      ctx.lineWidth = 1;

      const gridSize = 24;
      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center crosshairs
      ctx.strokeStyle = "rgba(0, 255, 102, 0.22)";
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();

      const currentType = waveTypeRef.current;

      // Draw primary signal waveform
      ctx.shadowBlur = 10;

      if (currentType === "i2c") {
        // Channel 1: SCL (Clock) in cyan
        ctx.strokeStyle = "#38bdf8";
        ctx.shadowColor = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        const sclYHigh = h * 0.25;
        const sclYLow = h * 0.42;

        for (let x = 0; x < w; x++) {
          const phase = (x / 28) - time * 2;
          const val = Math.sin(phase) > 0 ? sclYHigh : sclYLow;
          if (x === 0) ctx.moveTo(x, val);
          else ctx.lineTo(x, val);
        }
        ctx.stroke();

        // Channel 2: SDA (Data) in tactical green
        ctx.strokeStyle = "#00ff66";
        ctx.shadowColor = "#00ff66";
        ctx.lineWidth = 2;
        ctx.beginPath();
        const sdaYHigh = h * 0.58;
        const sdaYLow = h * 0.78;

        for (let x = 0; x < w; x++) {
          const bitIdx = Math.floor((x / 56) - time);
          // pseudo-random pseudo-deterministic bit sequence
          const isHigh = Math.sin(bitIdx * 12.3) > -0.1;
          const val = isHigh ? sdaYHigh : sdaYLow;
          if (x === 0) ctx.moveTo(x, val);
          else ctx.lineTo(x, val);
        }
        ctx.stroke();

      } else if (currentType === "spi") {
        // SPI High speed burst
        ctx.strokeStyle = "#a855f7";
        ctx.shadowColor = "#a855f7";
        ctx.lineWidth = 2;
        ctx.beginPath();
        const midY = h * 0.5;

        for (let x = 0; x < w; x++) {
          const burstEnv = Math.sin((x / w) * Math.PI * 4 - time * 0.5);
          const carrier = Math.sin(x * 0.4 - time * 6);
          const amp = burstEnv > 0 ? 38 : 4;
          const y = midY + carrier * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

      } else if (currentType === "pwm") {
        // PWM Waveform with interactive duty cycle
        ctx.strokeStyle = "#ffaa00";
        ctx.shadowColor = "#ffaa00";
        ctx.lineWidth = 2.5;
        ctx.beginPath();

        const period = 70;
        const dutyFraction = dutyRef.current / 100;
        const highY = h * 0.28;
        const lowY = h * 0.72;

        for (let x = 0; x < w; x++) {
          const cyclePos = ((x - time * 40) % period + period) % period;
          const y = cyclePos < period * dutyFraction ? highY : lowY;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

      } else if (currentType === "optical") {
        // Analog Optical Sensor & Metrology Metrology Curve
        ctx.strokeStyle = "#3b82f6";
        ctx.shadowColor = "#3b82f6";
        ctx.lineWidth = 2.2;
        ctx.beginPath();

        const baseVal = h * 0.45;
        for (let x = 0; x < w; x++) {
          const wavePeriod = ((x - time * 30) % (w * 1.2) + w * 1.2) % (w * 1.2);
          const distToPeak = Math.abs(x - wavePeriod);
          let peak = 0;
          if (distToPeak < 40) {
            peak = Math.sin((distToPeak / 40) * (Math.PI / 2)) * 45;
          }
          const noise = (Math.sin(x * 0.8 + time * 3) * 2) + ((Math.random() - 0.5) * 1.2);
          const y = baseVal - peak + noise;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="border border-tactical-border bg-tactical-surface/90 backdrop-blur-xl p-4 sm:p-5 font-mono-tech space-y-3.5 shadow-2xl">
      
      {/* Top Scope Header & Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-tactical-border pb-2.5 text-xs">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-tactical-green animate-pulse" />
          <span className="font-black text-tactical-ivory uppercase tracking-wider">
            DIGITAL STORAGE OSCILLOSCOPE (DSO-2000X)
          </span>
        </div>

        <div className="flex items-center space-x-2 text-[10px]">
          <span className="px-2 py-0.5 border border-tactical-green/50 bg-tactical-green/10 text-tactical-green font-bold">
            {isRunning ? "TRIGGER: AUTO" : "TRIGGER: HOLD"}
          </span>
          <span className="text-tactical-dim hidden sm:inline">1 GS/s REAL-TIME</span>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full h-48 sm:h-56 bg-[#070b0e] border border-tactical-border/90 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={580}
          height={220}
          className="w-full h-full block"
        />

        {/* HUD Telemetry Watermark in Canvas */}
        <div className="absolute top-2 left-2 text-[9px] text-tactical-green/80 flex flex-col space-y-0.5 pointer-events-none">
          <span>CH1: 1.00 V/DIV</span>
          <span>TIME: {frequency === 1 ? "1.00 ms/div" : frequency === 2 ? "250 µs/div" : "50 µs/div"}</span>
          <span className="text-blue-400">BUS: {waveType.toUpperCase()}</span>
        </div>

        <div className="absolute bottom-2 right-2 text-[9px] text-tactical-amber/80 text-right pointer-events-none">
          <span>Vpp: 3.28 V</span>
          <span>Vavg: 1.64 V</span>
        </div>
      </div>

      {/* Interactive Controls Toolbar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        
        {/* Signal Mode Button Group */}
        <div className="col-span-2 flex items-center space-x-1">
          {(["i2c", "spi", "pwm", "optical"] as WaveType[]).map((type) => (
            <button
              key={type}
              onClick={() => setWaveType(type)}
              className={`flex-1 py-1.5 px-1 border text-[10px] font-bold uppercase transition-all ${
                waveType === type
                  ? "border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  : "border-tactical-border bg-tactical-base text-tactical-muted hover:text-tactical-ivory"
              }`}
            >
              {type === "optical" ? "ANALOG" : type.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Frequency Multiplier */}
        <div className="flex items-center space-x-1.5 border border-tactical-border px-2 py-1 bg-tactical-base text-[10px]">
          <span className="text-tactical-dim uppercase">FREQ:</span>
          <button
            onClick={() => setFrequency((f) => (f % 3) + 1)}
            className="text-tactical-ivory font-bold hover:text-blue-400 flex items-center gap-1"
          >
            <span>{frequency === 1 ? "1X" : frequency === 2 ? "5X" : "20X"}</span>
            <RefreshCw className="w-2.5 h-2.5 text-blue-400" />
          </button>
        </div>

        {/* Run / Stop Toggle */}
        <button
          onClick={() => setIsRunning((r) => !r)}
          className={`flex items-center justify-center space-x-1.5 px-3 py-1 border text-[10px] font-bold uppercase transition-all ${
            isRunning
              ? "border-tactical-green bg-tactical-green/10 text-tactical-green hover:bg-tactical-green/20"
              : "border-tactical-amber bg-tactical-amber/20 text-tactical-amber animate-pulse"
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-3 h-3" />
              <span>RUNNING</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3" />
              <span>HOLD</span>
            </>
          )}
        </button>

      </div>

      {/* Special PWM Slider if PWM is selected */}
      {waveType === "pwm" && (
        <div className="flex items-center justify-between space-x-3 pt-1 border-t border-tactical-border/60 text-[10px]">
          <span className="text-tactical-amber font-bold">DUTY CYCLE: {dutyCycle}%</span>
          <input
            type="range"
            min={10}
            max={90}
            value={dutyCycle}
            onChange={(e) => setDutyCycle(Number(e.target.value))}
            className="w-48 accent-tactical-amber cursor-pointer"
          />
        </div>
      )}

    </div>
  );
}
