"use client";

import { usePathname, useRouter } from "next/navigation";
import { Zap, Sparkles } from "lucide-react";

export default function VersionSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Version 1 is Cinematic Cybernetics (Root /)
  // Version 2 is Minimal Professional (Path /v4)
  const isV2 = pathname.startsWith("/v4");
  const isV1 = !isV2;

  const switchVersion = (target: "1" | "2") => {
    if (target === "1" && !isV1) {
      router.push("/");
    } else if (target === "2" && !isV2) {
      router.push("/v4");
    }
  };

  return (
    <aside
      aria-label="Portfolio Version Switcher"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center bg-[#0a0c10]/90 border border-white/10 backdrop-blur-md p-1 font-mono-tech text-xs shadow-[0_0_25px_rgba(0,0,0,0.8)] rounded-full"
    >
      <div className="flex items-center space-x-1">
        <button
          onClick={() => switchVersion("1")}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all uppercase tracking-wider text-[10px] sm:text-[11px] ${
            isV1
              ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.6)] font-extrabold"
              : "text-neutral-400 hover:text-white hover:bg-white/5 font-medium"
          }`}
          title="Version 1: 3D Cinematic Cybernetics"
        >
          <Zap className="w-3 h-3" />
          <span>VERSION 1</span>
        </button>

        <button
          onClick={() => switchVersion("2")}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all uppercase tracking-wider text-[10px] sm:text-[11px] ${
            isV2
              ? "bg-emerald-400 text-neutral-950 shadow-[0_0_15px_rgba(52,211,153,0.7)] font-black"
              : "text-neutral-400 hover:text-white hover:bg-white/5 font-medium"
          }`}
          title="Version 2: Minimal Smooth-Scroll Professional"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>VERSION 2</span>
        </button>
      </div>
    </aside>
  );
}
