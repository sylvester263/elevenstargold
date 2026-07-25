"use client";

import { useEffect, useRef, useState } from "react";

// Animates a whole-number stat up from 0 once scrolled into view —
// 01-design-system.md motion section ("Numbers that count up... animated
// once when scrolled into view"). Non-whole-number values (e.g.
// "₨560,000,000", "—") render as-is, unanimated — nothing to count up.
export function CountUp({
  value,
  durationMs = 1200,
}: {
  value: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const numeric = /^\d+$/.test(value) ? parseInt(value, 10) : null;

  useEffect(() => {
    setDisplay(value);
    if (numeric === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(String(Math.round(eased * numeric)));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, numeric, durationMs]);

  return <span ref={ref}>{display}</span>;
}
