import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PrecisionCursor from "@/components/PrecisionCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kabish Sridar — AI/ML Engineer & Embedded Hardware Systems Builder",
  description:
    "Tactical portfolio of Kabish Sridar: AI/ML Engineer and Embedded Hardware Systems Builder specializing in real-time computer vision, sub-millimeter optical metrology, edge inference, and industrial PLC automation.",
  keywords: [
    "Kabish Sridar",
    "AI/ML Engineer",
    "Embedded Hardware",
    "Computer Vision",
    "OpenCV",
    "YOLOv8",
    "Raspberry Pi",
    "ESP32",
    "PLC Automation",
    "SRMIST",
  ],
  authors: [{ name: "Kabish Sridar" }],
  openGraph: {
    title: "Kabish Sridar — AI/ML Engineer & Embedded Systems Builder",
    description:
      "Bridging deep neural networks with edge silicon, micro-controllers, and real-time computer vision.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark bg-tactical-base text-tactical-ivory`}
    >
      <body className="min-h-screen bg-tactical-base antialiased selection:bg-tactical-amber selection:text-tactical-base relative">
        <PrecisionCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
