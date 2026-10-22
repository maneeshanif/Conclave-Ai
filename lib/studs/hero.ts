import { AGENTS, AGENT_IDS, TOKENS, cellXY, type AgentId } from "./patterns";
import { markStuds } from "./mark";

/**
 * Geometry for the hero scene (viewBox 480 x 430): the C of studs at the top, and a row of seven agent tiles just below it.
 * Every stud has a C position and, on scroll, a target stud in one of the seven tiles. The two sets are paired in x order so
 * the morph reads as one flock moving, not as shuffling. Extra studs fade in or out when the counts differ.
 */
export const HERO_VIEW = { w: 480, h: 300 } as const;
const C = { cx: 240, cy: 112, R: 96 };
const TILE = 56, GAP = 10;
const ROW_X = (HERO_VIEW.w - (7 * TILE + 6 * GAP)) / 2;
/* The tile row sits just below the C. The hero is pinned while the C splits, so nothing scrolls under the floating nav and the row stays clear of the headline and the waveform pill. */
const ROW_Y = 212;

export interface HeroTile {
  id: AgentId;
  x: number;
  y: number;
  size: number;
  bg: string;
  dim: { x: number; y: number; r: number; fill: string }[];
}

export interface HeroStud {
  id: number;
  /** Position in the C (or the centre, invisible, when this stud only exists for the crew row). */
  c: { x: number; y: number; r: number; fill: string; opacity: number };
  /** Position in a crew tile, or null when this stud simply fades away. */
  t: { x: number; y: number; r: number; fill: string; opacity: number } | null;
  kind: "outer" | "inner" | "centre" | "extra";
}

const k = TILE / TOKENS.viewBox;
const r3 = (n: number) => Math.round(n * 1000) / 1000;

export function buildHero() {
  const tiles: HeroTile[] = AGENT_IDS.map((id, i) => {
    const a = AGENTS[id];
    const x = ROW_X + i * (TILE + GAP);
    const dim: HeroTile["dim"] = [];
    for (let r = 0; r < 7; r++)
      for (let cc = 0; cc < 7; cc++) {
        const isLit = a.dots.some(([x1, y1]) => x1 === cc && y1 === r) || a.accent.some(([x1, y1]) => x1 === cc && y1 === r);
        if (!isLit) {
          const [px, py] = cellXY([cc, r]);
          dim.push({ x: r3(x + px * k), y: r3(ROW_Y + py * k), r: r3(TOKENS.dim * k), fill: a.lit });
        }
      }
    return { id, x, y: ROW_Y, size: TILE, bg: a.bg, dim };
  });

  // targets: every lit and accent stud of the seven glyphs
  const targets: NonNullable<HeroStud["t"]>[] = [];
  AGENT_IDS.forEach((id, i) => {
    const a = AGENTS[id];
    const x0 = ROW_X + i * (TILE + GAP);
    const add = (cell: [number, number], fill: string) => {
      const [px, py] = cellXY(cell);
      targets.push({ x: r3(x0 + px * k), y: r3(ROW_Y + py * k), r: r3(TOKENS.lit * k), fill, opacity: 1 });
    };
    a.dots.forEach((cell) => !a.accent.some(([x1, y1]) => x1 === cell[0] && y1 === cell[1]) && add(cell, a.lit));
    a.accent.forEach((cell) => add(cell, a.accentColor ?? a.lit));
  });
  targets.sort((p, q) => p.x - q.x || p.y - q.y);

  const cs = markStuds(C.cx, C.cy, C.R).map((s) => ({ ...s, fill: s.kind === "centre" ? "#5E8A00" : "#0B1512" }));
  const order = cs.map((s, i) => ({ s, i })).sort((p, q) => p.s.x - q.s.x || p.s.y - q.s.y);

  const n = Math.max(cs.length, targets.length);
  const studs: HeroStud[] = [];
  for (let i = 0; i < n; i++) {
    const src = order[i]?.s;
    const t = targets[i] ?? null;
    studs.push({
      id: i,
      c: src ? { x: src.x, y: src.y, r: src.r, fill: src.fill, opacity: src.opacity } : { x: C.cx, y: C.cy, r: 0, fill: "#0B1512", opacity: 0 },
      t,
      kind: src ? src.kind : "extra",
    });
  }
  return { tiles, studs, center: C };
}
