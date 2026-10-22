/**
 * The Conclave C built from studs (spec section 4): an outer ring of 44 studs on radius R from 40 to 320 degrees (gap on the right),
 * an inner ring of 32 studs on 0.72 R at 55% opacity, and a centre stud of radius 0.145 R. Ring stud radius 0.072 R and 0.05 R.
 */
export interface MarkStud {
  x: number;
  y: number;
  r: number;
  opacity: number;
  kind: "outer" | "inner" | "centre";
}

export const MARK = { outer: 44, inner: 32, from: 40, to: 320 } as const;

/** Server and browser can differ in the last digits of sin and cos, which React reports as a hydration mismatch. Round to 3 decimals. */
const r3 = (n: number) => Math.round(n * 1000) / 1000;

export function markStuds(cx: number, cy: number, R: number): MarkStud[] {
  const out: MarkStud[] = [];
  const ring = (n: number, radius: number, r: number, opacity: number, kind: MarkStud["kind"]) => {
    for (let i = 0; i < n; i++) {
      const a = ((MARK.from + ((MARK.to - MARK.from) * i) / (n - 1)) * Math.PI) / 180;
      out.push({ x: r3(cx + radius * Math.cos(a)), y: r3(cy - radius * Math.sin(a)), r: r3(r), opacity, kind });
    }
  };
  ring(MARK.outer, R, 0.072 * R, 1, "outer");
  ring(MARK.inner, 0.72 * R, 0.05 * R, 0.55, "inner");
  out.push({ x: cx, y: cy, r: r3(0.145 * R), opacity: 1, kind: "centre" });
  return out;
}

export type MarkTone = "lime" | "dark" | "light";

/** Studs and centre colours per surface. Lime and light surfaces use ink studs with the olive centre; dark uses lime. */
export const MARK_COLORS: Record<MarkTone, { ring: string; centre: string; bg: string | null }> = {
  lime: { ring: "#0B1512", centre: "#5E8A00", bg: "#C8F169" },
  light: { ring: "#0B1512", centre: "#5E8A00", bg: null },
  dark: { ring: "#C8F169", centre: "#C8F169", bg: "#0B1512" },
};
