"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Animates the leading number in a value like "500+" or "24/7" when scrolled into view. */
export function CountUp({ value, durationMs = 1200 }: { value: string; durationMs?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => {
    if (target === null) return value;
    return prefersReducedMotion() ? String(target) : "0";
  });

  useEffect(() => {
    if (target === null || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(String(Math.round(eased * target!)));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, durationMs]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
