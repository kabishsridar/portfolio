"use client";

import { useState } from "react";
import { Mail, Phone, Copy, Check, Send, MapPin, ShieldCheck, ExternalLink } from "lucide-react";
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


export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [msgStatus, setMsgStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    sender: "",
    callsign: "",
    message: "",
  });

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
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
    if (!formData.sender || !formData.message) return;

    setMsgStatus("ENCRYPTING & TRANSMITTING PACKET...");
    setTimeout(() => {
      setMsgStatus("TRANSMISSION DISPATCHED TO KABISH SRIDAR.");
      // Open mailto link as direct comm channel
      const mailtoUrl = `mailto:${profileData.contact.email}?subject=Transmission from ${encodeURIComponent(
        formData.callsign || formData.sender
      )}&body=${encodeURIComponent(
        `Sender: ${formData.sender}\nCallsign: ${formData.callsign}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 900);
  };

  return (
    <section id="contact" className="relative w-full bg-tactical-base py-20 overflow-hidden">
      {/* Background micro-grid */}
      <div className="absolute inset-0 bg-tactical-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-tactical-border pb-6 font-mono-tech">
          <div>
            <div className="flex items-center space-x-2 text-xs text-tactical-amber tracking-widest uppercase mb-2">
              <span className="w-2 h-2 bg-tactical-amber inline-block" />
              <span>SECTION 05 // DIRECT TRANSMISSION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-tactical-ivory tracking-tight">
              ESTABLISH SECURE COMMS
            </h2>
          </div>
          <div className="text-xs text-tactical-muted max-w-md">
            Available for high-impact AI/ML engineering, edge silicon research, and industrial automation development roles.
          </div>
        </div>

        {/* Dual Column Layout: Direct Links & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono-tech">
          
          {/* Left Column (5 Cols): Direct Comms Node */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="border border-tactical-border bg-tactical-surface/90 p-6 space-y-5">
              <div className="flex items-center justify-between text-xs text-tactical-muted border-b border-tactical-border pb-3">
                <span className="text-tactical-amber font-bold">STATION IDENT: KABISH // 0x4B</span>
                <span className="text-tactical-green flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  AUTHENTICATED
                </span>
              </div>

              {/* Email Block */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-tactical-dim block">OFFICIAL EMAIL</span>
                <div className="flex items-center justify-between p-3 border border-tactical-border bg-tactical-base">
                  <a
                    href={`mailto:${profileData.contact.email}`}
                    className="text-xs text-tactical-ivory hover:text-tactical-amber transition-colors flex items-center gap-2 truncate"
                  >
                    <Mail className="w-4 h-4 text-tactical-amber shrink-0" />
                    <span className="truncate">{profileData.contact.email}</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(profileData.contact.email, "email")}
                    className="p-1 text-tactical-muted hover:text-tactical-amber transition-colors ml-2"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-tactical-green" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Phone Block */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-tactical-dim block">VOICE // MOBILE</span>
                <div className="flex items-center justify-between p-3 border border-tactical-border bg-tactical-base">
                  <a
                    href={`tel:${profileData.contact.phone.replace(/\s+/g, "")}`}
                    className="text-xs text-tactical-ivory hover:text-tactical-amber transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-tactical-green shrink-0" />
                    <span>{profileData.contact.phone}</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(profileData.contact.phone, "phone")}
                    className="p-1 text-tactical-muted hover:text-tactical-amber transition-colors"
                    title="Copy Phone Number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-tactical-green" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-2 pt-2 border-t border-tactical-border">
                <span className="text-[10px] text-tactical-dim block">EXTERNAL NODES</span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <a
                    href={profileData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-2.5 border border-tactical-border bg-tactical-base hover:border-tactical-amber text-tactical-muted hover:text-tactical-ivory transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-tactical-ivory" />
                    <span className="truncate">GitHub</span>
                  </a>
                  <a
                    href={profileData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-2.5 border border-tactical-border bg-tactical-base hover:border-tactical-amber text-tactical-muted hover:text-tactical-ivory transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 text-blue-400" />
                    <span className="truncate">LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Station Coordinates */}
              <div className="p-3 border border-tactical-border/60 bg-tactical-base text-[11px] text-tactical-muted flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-tactical-amber shrink-0 mt-0.5" />
                <div>
                  <span className="text-tactical-ivory block font-semibold">
                    {profileData.location.base}
                  </span>
                  <span>{profileData.location.region}</span>
                  <span className="block text-[10px] text-tactical-amber">
                    [{profileData.location.coordinates}]
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column (7 Cols): Transmission Packet Simulator */}
          <div className="lg:col-span-7">
            <div className="tactical-crosshair border border-tactical-border bg-tactical-surface/90 p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between border-b border-tactical-border pb-3 text-xs">
                <span className="text-tactical-amber font-bold">
                  TRANSMISSION PACKET DISPATCHER
                </span>
                <span className="text-tactical-dim text-[10px]">
                  SSL ENCRYPTED // PORT 443
                </span>
              </div>

              <form onSubmit={handleTransmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-tactical-dim uppercase block">
                      Sender Identity / Org *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.sender}
                      onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                      placeholder="e.g. Recruiter / Robotics Lab"
                      className="w-full p-2.5 bg-tactical-base border border-tactical-border text-tactical-ivory focus:border-tactical-amber outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-tactical-dim uppercase block">
                      Callsign / Direct Email
                    </label>
                    <input
                      type="text"
                      value={formData.callsign}
                      onChange={(e) => setFormData({ ...formData, callsign: e.target.value })}
                      placeholder="e.g. lead@engineering.io"
                      className="w-full p-2.5 bg-tactical-base border border-tactical-border text-tactical-ivory focus:border-tactical-amber outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-tactical-dim uppercase block">
                    Payload Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your engineering role, collaboration proposal, or project inquiry..."
                    className="w-full p-2.5 bg-tactical-base border border-tactical-border text-tactical-ivory focus:border-tactical-amber outline-none font-mono resize-none"
                  />
                </div>

                {msgStatus && (
                  <div className="p-2.5 border border-tactical-green/50 bg-tactical-green/10 text-tactical-green text-xs font-semibold">
                    {msgStatus}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-tactical-amber text-tactical-base hover:bg-tactical-ivory font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(255,85,0,0.3)]"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT PACKET DIRECTLY</span>
                </button>
              </form>

              <div className="text-[10px] text-tactical-dim text-center">
                PACKETS AUTOMATICALLY FORWARD TO KABISH SRIDAR'S DIRECT COMMS TERMINAL
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
