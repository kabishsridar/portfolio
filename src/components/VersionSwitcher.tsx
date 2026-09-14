"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";

export default function VersionSwitcher() {
  const pathname = usePathname();
  const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  // Version 1 is Cinematic Cybernetics (Root /)
  // Version 3 is Kinetic Synapse (Path /v3)
  // Version 4 is Valentin Cheval Editorial UI (Path /v4)
  const isV4 = pathname.includes("/v4");
  const isV3 = pathname.includes("/v3");
  const isV1 = !isV4 && !isV3 && !pathname.includes("/projects");

  return (
    <div
      aria-label="Portfolio Version Switcher"
      className="inline-flex items-center bg-[#0a0c10]/95 border border-white/15 backdrop-blur-xl p-0.5 font-mono-tech text-xs shadow-md rounded-full"
    >
      <div className="flex items-center space-x-1">
        <Link
          href="/"
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all uppercase tracking-wider text-[10px] sm:text-[11px] select-none ${
            isV1
              ? "bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.7)] font-extrabold"
              : "text-neutral-400 hover:text-white hover:bg-white/10 font-medium"
          }`}
          title="Version 1: 3D Cinematic Cybernetics"
        >
          <Zap className="w-3 h-3" />
          <span>V1</span>
        </Link>

        <Link
          href="/v3"
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all uppercase tracking-wider text-[10px] sm:text-[11px] select-none ${
            isV3
              ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.8)] font-black"
              : "text-neutral-400 hover:text-white hover:bg-white/10 font-medium"
          }`}
          title="Version 3: Kinetic Synapse Linear-Grade"
        >
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span>V3</span>
        </Link>

        <Link
          href="/v4"
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all uppercase tracking-wider text-[10px] sm:text-[11px] select-none ${
            isV4
              ? "bg-[#ff3d00] text-white shadow-[0_0_14px_rgba(255,61,0,0.8)] font-black"
              : "text-neutral-400 hover:text-white hover:bg-white/10 font-medium"
          }`}
          title="Version 4: Valentin Cheval Editorial Design"
        >
          <span className="w-2 h-2 rounded-full bg-white" />
          <span>V4 VALENTIN</span>
        </Link>
      </div>
    </div>
  );
}
