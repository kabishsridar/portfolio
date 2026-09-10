"use client";

import { useEffect, useRef, useState } from "react";

interface V3TextDecryptProps {
  text: string;
  className?: string;
  speed?: number;
  triggerOnView?: boolean;
}

const GLYPHS = "0123456789ABCDEF!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

export default function V3TextDecrypt({
  text,
  className = "",
  speed = 35,
  triggerOnView = true,
}: V3TextDecryptProps) {
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  const startScramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, speed);
  };

  useEffect(() => {
    if (!triggerOnView) {
      startScramble();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            startScramble();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [text, hasAnimated, triggerOnView]);

  return (
    <span
      ref={elementRef}
      onMouseEnter={startScramble}
      className={`font-mono-tech select-none inline-block ${className}`}
    >
      {displayText}
    </span>
  );
}
