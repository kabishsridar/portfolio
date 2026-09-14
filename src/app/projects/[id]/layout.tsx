export function generateStaticParams() {
  return [
    { id: "emo-rex" },
    { id: "rasi-feed-plc" },
    { id: "thali-nutrition-vision" },
    { id: "handwriting-ocr-engine" },
    { id: "picam-profiler" },
    { id: "kyc-platform" },
  ];
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

