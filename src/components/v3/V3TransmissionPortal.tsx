"use client";

import { useState } from "react";
import { Mail, Phone, Copy, Check, Send, MapPin, ShieldCheck, Zap } from "lucide-react";
import { profileData } from "@/data/profile";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function V3TransmissionPortal() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [msgStatus, setMsgStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const copyText = (val: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(val);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setMsgStatus("ENCRYPTING PACKET & ENGAGING DIRECT COMMS...");
    setTimeout(() => {
      setMsgStatus("TRANSMISSION DISPATCHED TO KABISH SRIDAR.");
      const mailto = `mailto:${profileData.contact.email}?subject=Hyper Transmission from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailto;
    }, 800);
  };

  return (
    <section id="v3-contact" className="relative w-full bg-tactical-base/95 py-24 overflow-hidden font-mono-tech">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-10 md:pl-24 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-tactical-border pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs text-blue-400 tracking-widest uppercase mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>STACK 05 // SECURE DIRECT TRANSMISSION</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-tactical-ivory tracking-tight uppercase">
              ESTABLISH <span className="text-blue-400">COMMS</span>
            </h2>
          </div>
          <p className="text-xs text-tactical-muted max-w-md">
            Available for high-impact AI/ML engineering, edge silicon research, and industrial automation development roles.
          </p>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left 5 Cols: Station Ident */}
          <div className="lg:col-span-5 border border-tactical-border bg-tactical-surface/90 backdrop-blur-xl p-6 sm:p-7 space-y-5 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between text-xs text-tactical-muted border-b border-tactical-border pb-3">
              <span className="text-blue-400 font-bold">STATION IDENT: KABISH // 0x4B</span>
              <span className="text-tactical-green flex items-center gap-1 text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                AUTHENTICATED
              </span>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <span className="text-[10px] text-tactical-dim block">OFFICIAL EMAIL</span>
              <div className="flex items-center justify-between p-3 border border-tactical-border bg-tactical-base">
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="text-xs text-tactical-ivory hover:text-blue-400 transition-colors flex items-center gap-2 truncate"
                >
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="truncate">{profileData.contact.email}</span>
                </a>
                <button
                  onClick={() => copyText(profileData.contact.email, "email")}
                  className="p-1 text-tactical-muted hover:text-blue-400 transition-colors ml-2"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-tactical-green" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <span className="text-[10px] text-tactical-dim block">VOICE FREQUENCY</span>
              <div className="flex items-center justify-between p-3 border border-tactical-border bg-tactical-base">
                <a
                  href={`tel:${profileData.contact.phone.replace(/\s+/g, "")}`}
                  className="text-xs text-tactical-ivory hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-tactical-green shrink-0" />
                  <span>{profileData.contact.phone}</span>
                </a>
                <button
                  onClick={() => copyText(profileData.contact.phone, "phone")}
                  className="p-1 text-tactical-muted hover:text-blue-400 transition-colors"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-tactical-green" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* External Links */}
            <div className="pt-2 border-t border-tactical-border space-y-2">
              <span className="text-[10px] text-tactical-dim block">EXTERNAL NODES</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <a
                  href={profileData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-2.5 border border-tactical-border bg-tactical-base hover:border-blue-500 text-tactical-muted hover:text-tactical-ivory transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-tactical-ivory" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profileData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-2.5 border border-tactical-border bg-tactical-base hover:border-blue-500 text-tactical-muted hover:text-tactical-ivory transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Coordinates */}
            <div className="p-3 border border-tactical-border/60 bg-tactical-base text-[11px] text-tactical-muted flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-tactical-amber shrink-0 mt-0.5" />
              <div>
                <span className="text-tactical-ivory block font-semibold">
                  {profileData.location.base}
                </span>
                <span>{profileData.location.region}</span>
                <span className="block text-[10px] text-blue-400">
                  [{profileData.location.coordinates}]
                </span>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Form */}
          <div className="lg:col-span-7 border border-tactical-border bg-tactical-surface/90 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between border-b border-tactical-border pb-3 text-xs">
              <span className="text-blue-400 font-bold">
                DIRECT PACKET DISPATCH CONSOLE
              </span>
              <span className="text-tactical-dim text-[10px]">
                PORT 443 // SSL ENCRYPTED
              </span>
            </div>

            <form onSubmit={handleTransmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-tactical-dim uppercase block">
                    Sender Name / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. AI Lab / Engineering Lead"
                    className="w-full p-3 bg-tactical-base border border-tactical-border text-tactical-ivory focus:border-blue-500 outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-tactical-dim uppercase block">
                    Callsign / Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. team@deeptech.ai"
                    className="w-full p-3 bg-tactical-base border border-tactical-border text-tactical-ivory focus:border-blue-500 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-tactical-dim uppercase block">
                  Message Payload *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Inquire regarding computer vision pipelines, edge machine learning roles, or industrial PLC automation..."
                  className="w-full p-3 bg-tactical-base border border-tactical-border text-tactical-ivory focus:border-blue-500 outline-none font-mono resize-none"
                />
              </div>

              {msgStatus && (
                <div className="p-2.5 border border-blue-500/50 bg-blue-500/10 text-blue-400 text-xs font-semibold">
                  {msgStatus}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-blue-500 text-tactical-base hover:bg-tactical-ivory font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                <Send className="w-4 h-4" />
                <span>DISPATCH TRANSMISSION</span>
              </button>
            </form>

            <div className="text-[10px] text-tactical-dim text-center">
              TRANSMITS DIRECTLY TO KABISH SRIDAR // FAST ROUTING
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
