import { AGENTS, AGENT_IDS, TOKENS, cellXY, has, type AgentId } from "./patterns";
import { markStuds } from "./mark";

/**
 * Geometry for the hero scene, in the hero's own pixels (the SVG is a full-hero overlay with a 1:1 viewBox).
 *  - The stud C sits at the top right, where it always has.
 *  - On wide screens the seven agent tiles form a row directly BELOW the headline. Their position is measured from an invisible
 *    slot (`[data-crew-slot]`) anchored to the headline, so the row follows the title at any window size and never sits beside it.
 * Every stud has a C position and, on scroll, a target stud in one of the seven tiles. The two sets are paired in x order so the
 * morph reads as one flock moving. Extra studs fade in or out when the counts differ.
 */
export const HERO_DEFAULT = { w: 1440, h: 900 } as const;
/** Width from which the scroll split runs. Narrower screens keep the assembled C only. */
export const SPLIT_MIN_WIDTH = 1024;

export interface HeroSlot {
  x: number;
  y: number;
  w: number;
}

export interface HeroLayout {
  w: number;
  h: number;
  cx: number;
  cy: number;
  R: number;
  /** Where the seven tiles go, or null when the split does not run (narrow screens). */
  row: { x: number; y: number; tile: number; gap: number } | null;
}

const r3 = (n: number) => Math.round(n * 1000) / 1000;

export function heroLayout(w: number, h: number, slot?: HeroSlot | null): HeroLayout {
  let cx: number, cy: number, R: number;
  if (w >= 768) {
    const box = Math.min(0.36 * w, 480);
    cx = w - 48 - box / 2;
    cy = 96 + box * (112 / 480);
    R = box * (96 / 480);
  } else {
    const k = Math.min((w - 32) / 480, 224 / 300);
    cx = w / 2;
    cy = 96 + 112 * k;
    R = 96 * k;
  }
  let row: HeroLayout["row"] = null;
  if (w >= SPLIT_MIN_WIDTH) {
    const gap = 12;
    const avail = slot ? slot.w : Math.min(576, w - 80);
    const tile = Math.max(40, Math.min(76, (avail - 6 * gap) / 7));
    const rowW = 7 * tile + 6 * gap;
    row = slot ? { x: slot.x + slot.w - rowW, y: slot.y, tile, gap } : { x: w - 40 - rowW, y: 590, tile, gap };
  }
  return { w: r3(w), h: r3(h), cx: r3(cx), cy: r3(cy), R: r3(R), row: row && { x: r3(row.x), y: r3(row.y), tile: r3(row.tile), gap: row.gap } };
}

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

export function buildHero(L: HeroLayout) {
  const tiles: HeroTile[] = [];
  const targets: NonNullable<HeroStud["t"]>[] = [];

  if (L.row) {
    const { x: rx, y: ry, tile, gap } = L.row;
    const k = tile / TOKENS.viewBox;
    AGENT_IDS.forEach((id, i) => {
      const a = AGENTS[id];
      const x0 = rx + i * (tile + gap);
      const dim: HeroTile["dim"] = [];
      for (let r = 0; r < 7; r++)
        for (let c = 0; c < 7; c++) {
          const cell: [number, number] = [c, r];
          const [px, py] = cellXY(cell);
          const lit = has(a.dots, cell) || has(a.accent, cell);
          if (!lit) dim.push({ x: r3(x0 + px * k), y: r3(ry + py * k), r: r3(TOKENS.dim * k), fill: a.lit });
          else targets.push({ x: r3(x0 + px * k), y: r3(ry + py * k), r: r3(TOKENS.lit * k), fill: has(a.accent, cell) ? (a.accentColor ?? a.lit) : a.lit, opacity: 1 });
        }
      tiles.push({ id, x: r3(x0), y: r3(ry), size: r3(tile), bg: a.bg, dim });
    });
    targets.sort((p, q) => p.x - q.x || p.y - q.y);
  }

  const cs = markStuds(L.cx, L.cy, L.R).map((s) => ({ ...s, fill: s.kind === "centre" ? "#5E8A00" : "#0B1512" }));
  const order = cs.map((s, i) => ({ s, i })).sort((p, q) => p.s.x - q.s.x || p.s.y - q.s.y);
  const n = Math.max(cs.length, targets.length);
  const studs: HeroStud[] = [];
  for (let i = 0; i < n; i++) {
    const src = order[i]?.s;
    studs.push({
      id: i,
      c: src ? { x: src.x, y: src.y, r: src.r, fill: src.fill, opacity: src.opacity } : { x: L.cx, y: L.cy, r: 0, fill: "#0B1512", opacity: 0 },
      t: targets[i] ?? null,
      kind: src ? src.kind : "extra",
    });
  }
  return { tiles, studs };
}
