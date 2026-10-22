"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

/**
 * The one optional character (spec section 4): a lime rounded square with two stud eyes and no mouth.
 * Used sparingly: loading, 404, errors, stickers. Never in persona tiles. Blinks unless reduced motion is requested.
 */
export function StudFace({ size = 160, className, label = "Conclave AI", blink = true, look = "ahead" }: { size?: number | string; className?: string; label?: string; blink?: boolean; look?: "ahead" | "down" | "away" }) {
  const eyes = useRef<SVGGElement>(null);
  useEffect(() => {
    const g = eyes.current;
    if (!blink || !g) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ repeat: -1, repeatDelay: gsap.utils.random(2.4, 4.6), delay: gsap.utils.random(0.6, 2) }).to(g, { scaleY: 0.1, duration: 0.07, ease: "power2.in" }).to(g, { scaleY: 1, duration: 0.11, ease: "power2.out" });
    });
    return () => mm.revert();
  }, [blink]);
  const dx = look === "away" ? 6 : 0;
  const dy = look === "down" ? 6 : 0;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={cn(className)} role="img" aria-label={label}>
      <rect x="20" y="20" width="160" height="160" rx="44" fill="#C8F169" stroke="#0B1512" strokeWidth="4" />
      <g ref={eyes} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle cx={72 + dx} cy={96 + dy} r="14" fill="#0B1512" />
        <circle cx={128 + dx} cy={96 + dy} r="14" fill="#0B1512" />
      </g>
    </svg>
  );
}

/** A single stud pulsing: the loading and empty-state mark. Static under reduced motion (see globals.css). */
export function StudPulse({ size = 32, className, label = "Loading" }: { size?: number; className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={cn("stud-pulse", className)} role="img" aria-label={label}>
      <circle cx="16" cy="16" r="9" fill="#0B1512" />
    </svg>
  );
}
