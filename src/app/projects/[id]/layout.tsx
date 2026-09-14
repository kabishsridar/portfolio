export function generateStaticParams() {
  return [
    { id: "emo-rex" },
    { id: "rasi-feed-plc" },
    { id: "thali-calorie-vision" },
    { id: "handwriting-ocr" },
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

