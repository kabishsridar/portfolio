"use client";

import { usePathname, useRouter } from "next/navigation";
import { Layers, Sparkles, Zap } from "lucide-react";

export default function VersionSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const isV1 = pathname.startsWith("/v1");
  const isV2 = pathname.startsWith("/v2");
  const isV4 = pathname.startsWith("/v4");
  const isV3 = !isV1 && !isV2 && !isV4;

  const switchVersion = (target: "v1" | "v2" | "v3" | "v4") => {
    if (target === "v1" && !isV1) {
      router.push("/v1");
    } else if (target === "v2" && !isV2) {
      router.push("/v2");
    } else if (target === "v3" && !isV3) {
      router.push("/");
    } else if (target === "v4" && !isV4) {
      router.push("/v4");
    }
  };

  return (
    <aside
      aria-label="Portfolio Version Switcher"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center bg-tactical-surface/90 border border-tactical-border/90 backdrop-blur-md p-1 font-mono-tech text-xs shadow-[0_0_25px_rgba(0,0,0,0.7)]"
    >
      <div className="flex items-center space-x-1">
        <button
          onClick={() => switchVersion("v1")}
          className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1 transition-all uppercase tracking-wider font-semibold text-[10px] sm:text-[11px] ${
            isV1
              ? "bg-tactical-amber text-tactical-base shadow-[0_0_12px_rgba(255,85,0,0.5)] font-bold"
              : "text-tactical-muted hover:text-tactical-ivory hover:bg-tactical-base/60"
          }`}
          title="Version 1: Tactical Laboratory"
        >
          <Layers className="w-3 h-3" />
          <span>V1: LAB</span>
        </button>

        <button
          onClick={() => switchVersion("v2")}
          className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1 transition-all uppercase tracking-wider font-semibold text-[10px] sm:text-[11px] ${
            isV2
              ? "bg-tactical-green text-tactical-base shadow-[0_0_12px_rgba(0,255,102,0.5)] font-bold"
              : "text-tactical-muted hover:text-tactical-ivory hover:bg-tactical-base/60"
          }`}
          title="Version 2: Kinetic Cybernetics"
        >
          <Sparkles className="w-3 h-3" />
          <span>V2: KINETIC</span>
        </button>

        <button
          onClick={() => switchVersion("v3")}
          className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1 transition-all uppercase tracking-wider font-semibold text-[10px] sm:text-[11px] ${
            isV3
              ? "bg-blue-500 text-tactical-base shadow-[0_0_15px_rgba(59,130,246,0.6)] font-extrabold"
              : "text-tactical-muted hover:text-tactical-ivory hover:bg-tactical-base/60"
          }`}
          title="Version 3: Hyper-Scroll Cinematic Cybernetics"
        >
          <Zap className="w-3 h-3" />
          <span>V3: HYPER</span>
        </button>

        <button
          onClick={() => switchVersion("v4")}
          className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1 transition-all uppercase tracking-wider font-semibold text-[10px] sm:text-[11px] ${
            isV4
              ? "bg-emerald-400 text-neutral-950 shadow-[0_0_15px_rgba(52,211,153,0.7)] font-black"
              : "text-tactical-muted hover:text-tactical-ivory hover:bg-tactical-base/60"
          }`}
          title="Version 4: Minimal Professional Smooth-Scroll"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>V4: PRO</span>
        </button>
      </div>
    </aside>
  );
}
