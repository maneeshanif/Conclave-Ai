"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { AGENTS, GRID, TOKENS, cellXY, has, type AgentId, type Cell } from "@/lib/studs/patterns";
import { cn } from "@/lib/utils";

interface Props {
  agent: AgentId;
  size?: number | string;
  /** Run the agent's idle motion. Static final state when false or when the visitor prefers reduced motion. */
  animate?: boolean;
  /** The agent's active motion: Aria speaks, Echo sends, Slot books, Gate opens, and so on. */
  active?: boolean;
  /** Draw the dark or light tile behind the studs. */
  tile?: boolean;
  className?: string;
  label?: string;
  /** Mark repeats as decoration so a screen reader does not announce them twice. */
  decorative?: boolean;
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * One agent as a pattern on the 7 x 7 stud grid, drawn as SVG circles from lib/studs/patterns.ts (no raster, no faces).
 * Lit studs take the agent colour, accent studs the accent colour, every other cell is a dim stud. Personality is motion and colour.
 */
export function StudGlyph({ agent, size = 160, animate = false, active = false, tile = true, className, label, decorative }: Props) {
  const a = AGENTS[agent];
  const ref = useRef<SVGSVGElement>(null);

  const cells: { c: number; r: number; kind: "lit" | "accent" | "dim" }[] = [];
  for (let r = 0; r < GRID; r++)
    for (let c = 0; c < GRID; c++) {
      const cell: Cell = [c, r];
      cells.push({ c, r, kind: has(a.accent, cell) ? "accent" : has(a.dots, cell) ? "lit" : "dim" });
    }

  useEffect(() => {
    const svg = ref.current;
    if (!animate || !svg) return;
    const mm = gsap.matchMedia();
    const timelines: gsap.core.Animation[] = [];
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = (sel: string) => Array.from(svg.querySelectorAll<SVGCircleElement>(sel));
      const at = (c: number, r: number) => svg.querySelector<SVGCircleElement>(`[data-c="${c}"][data-r="${r}"]`);
      const lit = q('[data-kind="lit"]');
      const accent = q('[data-kind="accent"]');
      const speed = active ? 2.4 : 1;

      switch (agent) {
        case "aria": {
          /* Bars breathe in height on a 1.2s loop; while active they follow a faster, fuller beat. */
          [[0, 3], [2, 7], [4, 5], [6, 3]].forEach(([c, h], i) => {
            const o = { v: 1 };
            const t = gsap.to(o, {
              v: active ? gsap.utils.random(0.8, 1) : gsap.utils.random(0.45, 0.8),
              duration: (active ? 0.28 : 0.6) + i * 0.05,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              onUpdate: () => {
                for (let r = 0; r < GRID; r++) {
                  const el = at(c, r);
                  if (el && el.dataset.kind === "lit") gsap.set(el, { opacity: Math.max(a.lit ? 0.18 : 0, clamp(o.v * (h / 2) - Math.abs(r - 3) + 0.5)) });
                }
              },
            });
            timelines.push(t);
          });
          break;
        }
        case "echo": {
          /* Rings pulse outward in sequence; they speed up while a message is sending. */
          const ring = (el: SVGCircleElement) => {
            const d = Math.hypot(Number(el.dataset.c) - 3, Number(el.dataset.r) - 3);
            return d < 0.6 ? 0 : d < 2.6 ? 1 : 2;
          };
          const groups = [0, 1, 2].map((g) => lit.filter((el) => ring(el) === g));
          const tl = gsap.timeline({ repeat: -1 });
          groups.forEach((els, i) => tl.fromTo(els, { opacity: 0.25 }, { opacity: 1, duration: 0.45, yoyo: true, repeat: 1, ease: "sine.inOut" }, i * 0.3));
          tl.timeScale(speed);
          timelines.push(tl);
          break;
        }
        case "slot": {
          /* One accent stud blinks every 4 seconds; when active it snaps to the booked cell. */
          accent.forEach((el) => {
            timelines.push(gsap.timeline({ repeat: -1, repeatDelay: 4 }).to(el, { scale: 0.15, duration: 0.14, ease: "power2.in" }).to(el, { scale: 1, duration: 0.22, ease: "back.out(3)" }));
            if (active) {
              const [x0, y0] = cellXY([4, 4]);
              const [x1, y1] = cellXY([2, 3]);
              timelines.push(gsap.to(el, { x: x1 - x0, y: y1 - y0, duration: 0.5, ease: "back.out(2.2)" }));
            }
          });
          break;
        }
        case "boomerang": {
          /* Studs light along the arc, out and back; faster while reactivation runs. */
          const tl = gsap.timeline({ repeat: -1, yoyo: true });
          tl.fromTo(lit, { opacity: 0.25 }, { opacity: 1, duration: 0.3, stagger: 0.12, ease: "sine.out" });
          tl.timeScale(speed);
          timelines.push(tl);
          break;
        }
        case "tally": {
          /* Bars grow in sequence on enter; the top accent stud lifts one row on a good week. */
          const bars = lit.slice().sort((p, q2) => Number(q2.dataset.r) - Number(p.dataset.r) || Number(p.dataset.c) - Number(q2.dataset.c));
          timelines.push(gsap.fromTo(bars, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.06, ease: "back.out(2)" }));
          if (active) accent.forEach((el) => timelines.push(gsap.to(el, { y: -TOKENS.pitch, duration: 0.5, ease: "back.out(2)" })));
          break;
        }
        case "gate": {
          /* The door studs open and close slowly; fully open on handover. */
          const door = q('[data-kind="dim"]').filter((el) => [2, 3, 4].includes(Number(el.dataset.c)) && Number(el.dataset.r) >= 3);
          const byCol = [2, 3, 4].map((c) => door.filter((el) => Number(el.dataset.c) === c));
          if (active) timelines.push(gsap.to(door, { opacity: 1, attr: { r: TOKENS.lit }, fill: "#C8F169", duration: 0.5, stagger: 0.03 }));
          else {
            const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1.2 });
            byCol.forEach((els, i) => tl.to(els, { opacity: 0.85, attr: { r: 7 }, fill: "#C8F169", duration: 0.7, ease: "sine.inOut" }, i * 0.5));
            timelines.push(tl);
          }
          break;
        }
        case "ledger": {
          /* Rows draw left to right; check studs light when a figure is sourced. */
          const rows = [1, 3, 5].map((r) => lit.filter((el) => Number(el.dataset.r) === r).sort((p, q2) => Number(p.dataset.c) - Number(q2.dataset.c)));
          const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.2 });
          rows.forEach((els, i) => tl.fromTo(els, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.08, ease: "power2.out" }, i * 0.45));
          accent.forEach((el, i) => tl.fromTo(el, { scale: 0.2 }, { scale: 1, duration: 0.3, ease: "back.out(3)" }, 1.5 + i * 0.15));
          if (active) accent.forEach((el) => timelines.push(gsap.to(el, { scale: 1.35, duration: 0.4, repeat: -1, yoyo: true, ease: "sine.inOut" })));
          timelines.push(tl);
          break;
        }
      }
    });

    /* Pause every loop while the glyph is off screen. */
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(([e]) => timelines.forEach((t) => t.paused(!e.isIntersecting)), { threshold: 0 });
      io.observe(svg);
    }
    return () => {
      io?.disconnect();
      mm.revert();
    };
  }, [animate, active, agent, a.lit]);

  const o = TOKENS.origin, p = TOKENS.pitch;
  /* Below about 56px the dim studs are under a pixel across. Leaving them out saves ~40 circles per glyph in the page. Gate's door
     animation lights dim studs, so Gate keeps them. */
  const showDim = typeof size !== "number" || size > 56 || agent === "gate";
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${TOKENS.viewBox} ${TOKENS.viewBox}`}
      width={size}
      height={size}
      className={cn("stud-glyph", className)}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : (label ?? `${a.label}, ${a.job.toLowerCase()}`)}
      aria-hidden={decorative ? true : undefined}
    >
      {tile && <rect width={TOKENS.viewBox} height={TOKENS.viewBox} rx={TOKENS.tileRadius} fill={a.bg} />}
      {cells.filter(({ kind }) => showDim || kind !== "dim").map(({ c, r, kind }) => (
        <circle
          key={`${c}-${r}`}
          className="stud"
          data-c={c}
          data-r={r}
          data-kind={kind}
          cx={o + c * p}
          cy={o + r * p}
          r={kind === "dim" ? TOKENS.dim : TOKENS.lit}
          fill={kind === "accent" ? (a.accentColor ?? a.lit) : a.lit}
          opacity={kind === "dim" ? TOKENS.dimOpacity : 1}
        />
      ))}
    </svg>
  );
}
