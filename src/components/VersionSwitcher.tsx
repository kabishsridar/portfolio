"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";

export default function VersionSwitcher() {
  const pathname = usePathname();

  // Version 1 is Cinematic Cybernetics (Root /)
  // Version 2 is Clean Minimal Professional (Path /v2)
  // Version 3 is Kinetic Synapse (Path /v3)
  // Version 4 is Valentin Cheval Editorial UI (Path /v4)
  const isV4 = pathname.includes("/v4");
  const isV3 = pathname.includes("/v3");
  const isV2 = pathname.includes("/v2");
  const isV1 = !isV4 && !isV3 && !isV2 && !pathname.includes("/projects");

  return (
    <div
      aria-label="Portfolio Version Switcher"
      className="inline-flex items-center bg-[#0a0c10]/95 border border-white/15 backdrop-blur-xl p-0.5 font-mono text-xs shadow-md rounded-full"
    >
      <div className="flex items-center space-x-1">
        {/* V1 Link */}
        <Link
          href="/"
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full transition-all uppercase tracking-wider text-[10px] select-none ${
            isV1
              ? "bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.7)] font-extrabold"
              : "text-neutral-400 hover:text-white hover:bg-white/10 font-medium"
          }`}
          title="Version 1: 3D Cinematic Cybernetics"
        >
          <Zap className="w-3 h-3" />
          <span>V1</span>
        </Link>

        {/* V2 Link */}
        <Link
          href="/v2"
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full transition-all uppercase tracking-wider text-[10px] select-none ${
            isV2
              ? "bg-emerald-400 text-neutral-950 shadow-[0_0_12px_rgba(52,211,153,0.7)] font-black"
              : "text-neutral-400 hover:text-white hover:bg-white/10 font-medium"
          }`}
          title="Version 2: Clean Minimal Professional"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>V2</span>
        </Link>

        {/* V3 Link */}
        <Link
          href="/v3"
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full transition-all uppercase tracking-wider text-[10px] select-none ${
            isV3
              ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.8)] font-black"
              : "text-neutral-400 hover:text-white hover:bg-white/10 font-medium"
          }`}
          title="Version 3: Kinetic Synapse Timeline"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>V3</span>
        </Link>

        {/* V4 Link */}
        <Link
          href="/v4"
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full transition-all uppercase tracking-wider text-[10px] select-none ${
            isV4
              ? "bg-[#ff3d00] text-white shadow-[0_0_14px_rgba(255,61,0,0.8)] font-black"
              : "text-neutral-400 hover:text-white hover:bg-white/10 font-medium"
          }`}
          title="Version 4: Valentin Cheval Editorial Design"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>V4</span>
        </Link>
      </div>
    </div>
  );
}
