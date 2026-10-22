"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Ring cursor, additive: the native cursor stays. Fine pointers only, not under reduced motion.
 * Grows over links and buttons; shows a label over elements with data-cursor="text".
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    const el = ring.current;
    if (!ok || !el) return;

    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    const show = gsap.to(el, { opacity: 1, duration: 0.2, paused: true });

    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      show.play();
      const t = e.target as HTMLElement | null;
      const text = t?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      const hot = !!t?.closest("a, button, summary, [role=tab], input, textarea, label");
      if (label.current) label.current.textContent = text ?? "";
      gsap.to(el, {
        scale: text ? 2.6 : hot ? 1.7 : 1,
        backgroundColor: text || hot ? "rgba(200,241,105,0.9)" : "rgba(200,241,105,0)",
        duration: 0.25,
        ease: "power3.out",
        overwrite: "auto",
      });
    };
    const leave = () => show.reverse();
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      show.kill();
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] -ml-4 -mt-4 grid h-8 w-8 place-items-center rounded-full border-2 border-ink opacity-0 shadow-[0_0_0_1px_rgb(251_252_248/0.85)]"
    >
      <span ref={label} className="label text-[0.25rem] leading-none text-ink" />
    </div>
  );
}
