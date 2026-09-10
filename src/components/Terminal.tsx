"use client";

import { useState, useRef, useEffect } from "react";
import { X, Minimize2, Terminal as TerminalIcon, CornerDownLeft, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { profileData } from "@/data/profile";
import { projects } from "@/data/projects";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command?: string;
  output: string | React.ReactNode;
  timestamp: string;
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      output: (
        <div className="space-y-1 text-tactical-muted">
          <p className="text-tactical-amber font-bold">
            TACTICAL HARDWARE TERMINAL // KABISH SRIDAR v2.4
          </p>
          <p>Type <span className="text-tactical-green">help</span> to list operational commands or <span className="text-tactical-green">list --projects</span> to inspect schematics.</p>
        </div>
      ),
      timestamp: "SYS_BOOT",
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    let responseNode: React.ReactNode;

    switch (cmd) {
      case "help":
        responseNode = (
          <div className="space-y-1 text-tactical-ivory/90">
            <p className="text-tactical-amber font-bold">AVAILABLE OPERATIONAL COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs pt-1">
              <p><span className="text-tactical-green font-semibold">cat about.txt</span> : Core identity &amp; background</p>
              <p><span className="text-tactical-green font-semibold">list --projects</span> : List all 6 verified project schematics</p>
              <p><span className="text-tactical-green font-semibold">inspect &lt;id&gt;</span> : Deep inspect a project (e.g. inspect emo-rex)</p>
              <p><span className="text-tactical-green font-semibold">ping hardware</span> : Query hardware telemetry &amp; clock rate</p>
              <p><span className="text-tactical-green font-semibold">view --contact</span> : Direct comms &amp; coordinates</p>
              <p><span className="text-tactical-green font-semibold">skills</span> : Review full technical matrix</p>
              <p><span className="text-tactical-green font-semibold">sudo hire</span> : Authorize employment contract</p>
              <p><span className="text-tactical-green font-semibold">clear</span> : Flush terminal output buffer</p>
              <p><span className="text-tactical-green font-semibold">exit</span> : Close terminal window</p>
            </div>
          </div>
        );
        break;

      case "cat":
        if (arg.includes("about") || arg === "about.txt") {
          responseNode = (
            <div className="space-y-2 text-tactical-ivory">
              <p className="text-tactical-amber font-bold">// IDENTITY DOSSIER: KABISH SRIDAR</p>
              <p>AI/ML Engineer &amp; Embedded Systems Builder at SRMIST (AI &amp; ML, Graduating 2029).</p>
              <p>Specializes in edge inference pipelines, sub-millimeter optical metrology, and fail-safe hardware-software synchronization.</p>
              <p className="text-tactical-muted">Builder of EMO-REX, Rasi Feeds PLC Automation, Indian Thali Calorie Vision, Deep Handwriting OCR, and PiCam Profiler.</p>
            </div>
          );
        } else {
          responseNode = <span className="text-red-400">File not found: {arg}. Try 'cat about.txt'</span>;
        }
        break;

      case "list":
      case "projects":
        responseNode = (
          <div className="space-y-1.5 text-xs text-tactical-ivory">
            <p className="text-tactical-amber font-bold">// VERIFIED PROJECTS REGISTER:</p>
            {projects.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center justify-between py-0.5 border-b border-tactical-border/40">
                <span className="text-tactical-green font-mono">{p.id}</span>
                <span className="text-tactical-ivory font-medium">{p.title}</span>
                <span className="text-tactical-amber text-[10px]">{p.keyMetric}</span>
              </div>
            ))}
            <p className="text-tactical-dim text-[11px] pt-1">Use 'inspect &lt;id&gt;' for full technical breakdown.</p>
          </div>
        );
        break;

      case "inspect":
        const matched = projects.find((p) => p.id === arg || p.title.toLowerCase().includes(arg));
        if (matched) {
          responseNode = (
            <div className="space-y-2 text-tactical-ivory text-xs border border-tactical-border bg-tactical-base p-3">
              <p className="text-tactical-amber font-bold">// {matched.code}: {matched.title}</p>
              <p className="text-tactical-green">METRIC: {matched.keyMetric} ({matched.keyMetricLabel})</p>
              <p className="text-tactical-muted">{matched.summary}</p>
              <p className="text-tactical-dim">STACK: {matched.stack.join(", ")}</p>
            </div>
          );
        } else {
          responseNode = <span className="text-red-400">Unknown project ID: '{arg}'. Type 'list --projects' to see IDs.</span>;
        }
        break;

      case "ping":
        responseNode = (
          <div className="space-y-1 text-xs text-tactical-green font-mono">
            <p>PING 127.0.0.1 (EDGE_SILICON_SUBSYSTEM): 56 data bytes</p>
            <p>64 bytes from RASI_ABB_AC500_PLC: icmp_seq=1 ttl=64 time=1.42 ms (MODBUS TCP/IP)</p>
            <p>64 bytes from RASPBERRY_PI_4: icmp_seq=2 ttl=64 time=0.98 ms</p>
            <p>64 bytes from THALI_YOLO_ENGINE: icmp_seq=3 ttl=64 time=24.0 ms (INFERENCE GPU)</p>
            <p className="text-tactical-amber pt-1">TELEMETRY: 0% PACKET LOSS, RASI PLC &amp; CV INFERENCE PIPELINES STABLE</p>
          </div>
        );
        break;

      case "view":
      case "contact":
        responseNode = (
          <div className="space-y-1 text-xs text-tactical-ivory">
            <p className="text-tactical-amber font-bold">// DIRECT COMMS &amp; COORDINATES:</p>
            <p>EMAIL: <a href="mailto:kabishsridar6@gmail.com" className="text-tactical-green underline">kabishsridar6@gmail.com</a></p>
            <p>PHONE: <span className="text-tactical-green">+91 95249 30380</span></p>
            <p>GITHUB: <a href="https://github.com/kabishsridar" target="_blank" className="text-tactical-green underline">github.com/kabishsridar</a></p>
            <p>LINKEDIN: <a href="https://www.linkedin.com/in/kabish-sridar-20587437b" target="_blank" className="text-tactical-green underline">linkedin.com/in/kabish-sridar-20587437b</a></p>
            <p>BASE: <span className="text-tactical-muted">Namakkal / Trichy, Tamil Nadu, India (10.7905° N, 78.7047° E)</span></p>
          </div>
        );
        break;

      case "skills":
        responseNode = (
          <div className="space-y-1.5 text-xs text-tactical-ivory">
            <p className="text-tactical-amber font-bold">// TECHNICAL SKILL MATRIX:</p>
            <p><span className="text-tactical-green">Vision:</span> PyTorch, TensorFlow, OpenCV, YOLOv8, DeepFace, CLAHE, Contouring</p>
            <p><span className="text-tactical-green">Embedded:</span> C/C++, Python, Raspberry Pi 4, ESP32, Arduino, ABB AC500 PLC (ST), Modbus</p>
            <p><span className="text-tactical-green">Systems:</span> Linux/Bash, Docker, Docker Compose, Redis, PostgreSQL, SQLite, FastAPI</p>
          </div>
        );
        break;

      case "sudo":
        if (arg === "hire") {
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#ff5500", "#00ff66", "#ededed"],
            });
          } catch (e) {
            // fallback if confetti fails
          }
          responseNode = (
            <div className="space-y-1 text-xs text-tactical-green font-bold">
              <p>PERMISSION GRANTED: EMPLOYMENT PIPELINE ENGAGED!</p>
              <p className="text-tactical-amber">Kabish Sridar has been flagged for prioritized recruitment.</p>
              <p className="text-tactical-ivory">Transmission transmitted to kabishsridar6@gmail.com. Welcome to the team.</p>
            </div>
          );
        } else {
          responseNode = <span className="text-red-400">sudo: permission denied for command '{arg}'. Try 'sudo hire'</span>;
        }
        break;

      case "clear":
        setLogs([]);
        setInput("");
        return;

      case "exit":
      case "close":
        onClose();
        return;

      default:
        responseNode = (
          <span className="text-red-400">
            command not found: '{cmd}'. Type 'help' to see valid commands.
          </span>
        );
        break;
    }

    const timeString = new Date().toLocaleTimeString("en-IN", { hour12: false });
    setLogs((prev) => [
      ...prev,
      {
        command: trimmed,
        output: responseNode,
        timestamp: timeString,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx + 1 < history.length ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInput(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(history[history.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput("");
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-tactical-base/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl h-[520px] max-h-[85vh] bg-tactical-surface border border-tactical-amber shadow-[0_0_35px_rgba(255,85,0,0.25)] flex flex-col font-mono-tech scanlines overflow-hidden">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-tactical-base border-b border-tactical-border text-xs">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-tactical-amber animate-ping" />
            <span className="text-tactical-ivory font-bold uppercase tracking-wider flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-tactical-amber" />
              KABISH_LAB_SHELL // DEV_CONSOLE
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCommand("clear")}
              className="px-2 py-0.5 border border-tactical-border text-[10px] text-tactical-muted hover:text-tactical-ivory"
            >
              CLEAR
            </button>
            <button
              onClick={onClose}
              className="p-1 text-tactical-muted hover:text-tactical-amber transition-colors"
              title="Close Terminal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Command Output Log */}
        <div
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto space-y-3 text-xs"
        >
          {logs.map((log, i) => (
            <div key={i} className="space-y-1">
              {log.command && (
                <div className="flex items-center space-x-2 text-tactical-dim text-[11px]">
                  <span className="text-tactical-amber">kabish@tactical-lab:~$</span>
                  <span className="text-tactical-ivory font-bold">{log.command}</span>
                  <span className="text-[9px] text-tactical-dim ml-auto">[{log.timestamp}]</span>
                </div>
              )}
              <div className="pl-2 border-l border-tactical-border/60">
                {log.output}
              </div>
            </div>
          ))}
        </div>

        {/* Command Input Prompt */}
        <div className="p-3 bg-tactical-base border-t border-tactical-border flex items-center space-x-2 text-xs">
          <span className="text-tactical-green font-bold whitespace-nowrap">
            kabish@tactical-lab:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or 'list --projects'..."
            className="flex-1 bg-transparent border-none outline-none text-tactical-ivory font-mono placeholder:text-tactical-dim text-xs"
            autoFocus
          />
          <button
            onClick={() => handleCommand(input)}
            className="p-1 border border-tactical-border text-tactical-muted hover:text-tactical-amber transition-colors"
            title="Execute Command"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
