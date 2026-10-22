/**
 * The stud system (Change Spec v3, section 4). Every agent is a pattern on one 7 x 7 stud grid, so the crew reads as engineered,
 * survives at favicon size and animates cleanly. Coordinates are [col, row], 0-indexed, origin top-left.
 */
export type Cell = [number, number];
export const GRID = 7;

/** Geometry tokens from the spec. The grid is centred in a 200 x 200 viewbox. */
export const TOKENS = {
  viewBox: 200,
  pitch: 24,
  origin: 28,
  lit: 9,
  dim: 4.5,
  dimOpacity: 0.18,
  tileRadius: 36,
  tilePadding: 16,
} as const;

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

/** Four bars, 3, 7, 5 and 3 studs tall, centred on the middle row. */
const wave: Cell[] = ([[0, 3], [2, 7], [4, 5], [6, 3]] as [number, number][]).flatMap(([c, h]) => {
  const top = Math.floor((GRID - h) / 2);
  return range(0, h - 1).map((i) => [c, top + i] as Cell);
});

/** Concentric rings around the centre stud. */
const ripple: Cell[] = [];
for (let r = 0; r < GRID; r++)
  for (let c = 0; c < GRID; c++) {
    const d = Math.hypot(c - 3, r - 3);
    if (d < 0.6 || (d > 1.9 && d < 2.4) || (d > 3.0 && d < 3.4)) ripple.push([c, r]);
  }

export type AgentId = "aria" | "echo" | "slot" | "boomerang" | "tally" | "gate" | "ledger";

export interface AgentPattern {
  label: string;
  job: string;
  bg: string;
  lit: string;
  dots: Cell[];
  accent: Cell[];
  accentColor?: string;
  /** What the agent does, one line, for the Crew page. */
  does: string;
  /** A line in the agent's voice, sample copy, not a customer quote. */
  voice: string;
}

export const AGENTS: Record<AgentId, AgentPattern> = {
  aria: { label: "Aria", job: "Answers calls", bg: "#0B1512", lit: "#C8F169", dots: wave, accent: [], does: "Picks up in one ring, asks what the caller needs, checks your calendar and books it.", voice: "Picks up in one ring." },
  echo: { label: "Echo", job: "Follows up", bg: "#14302A", lit: "#CFC4FF", dots: ripple, accent: [], does: "Replies to every enquiry within seconds and keeps the thread going until a person is needed.", voice: "Sent. Sending again, politely." },
  slot: {
    label: "Slot", job: "Books the slot", bg: "#0B1512", lit: "#F1F4EC",
    dots: [...range(1, 5).map((c) => [c, 1] as Cell), ...range(3, 5).flatMap((r) => range(1, 5).map((c) => [c, r] as Cell))],
    accent: [[4, 4]], accentColor: "#C8F169",
    does: "Reads your live calendar, offers two or three slots, books, confirms and reminds.", voice: "Thursday, 10:30. Done.",
  },
  boomerang: {
    label: "Boomerang", job: "Wins customers back", bg: "#7C5CFF", lit: "#F1F4EC",
    dots: [[0, 2], [1, 3], [2, 4], [3, 4], [4, 4], [5, 3], [6, 2], [6, 1]],
    accent: [[6, 1]], accentColor: "#C8F169",
    does: "Writes a short personal message to customers who stopped coming and offers the ones who reply a slot.", voice: "Remember us? We saved you a seat.",
  },
  tally: {
    label: "Tally", job: "Reports the week", bg: "#F1F4EC", lit: "#0B1512",
    dots: [[1, 5], [1, 6], ...range(3, 6).map((r) => [3, r] as Cell), ...range(1, 6).map((r) => [5, r] as Cell)],
    accent: [[5, 1]], accentColor: "#7C5CFF",
    does: "Turns every call and booking into one plain summary you can read in a minute.", voice: "Here is the week in one minute.",
  },
  gate: {
    label: "Gate", job: "Hands over to a human", bg: "#14302A", lit: "#8FA39A",
    dots: range(1, 6).flatMap((r) => range(1, 5).map((c) => [c, r] as Cell)).filter(([c, r]) => !([2, 3, 4].includes(c) && r >= 3)),
    accent: [[4, 4]], accentColor: "#C8F169",
    does: "Knows when a call needs a person, passes it on with a short summary and logs what happened.", voice: "This one needs a person. Passing it on.",
  },
  ledger: {
    label: "Ledger", job: "Keeps the receipts", bg: "#8FA39A", lit: "#0B1512",
    dots: [...range(1, 5).map((c) => [c, 1] as Cell), ...range(1, 4).map((c) => [c, 3] as Cell), ...range(1, 3).map((c) => [c, 5] as Cell)],
    accent: [[5, 5], [6, 4]], accentColor: "#C8F169",
    does: "Records where every published number came from, so nothing is claimed that cannot be traced.", voice: "Every number has a source.",
  },
};

export const AGENT_IDS = Object.keys(AGENTS) as AgentId[];

/** Centre of a cell in the 200 x 200 viewbox. */
export const cellXY = ([c, r]: Cell): [number, number] => [TOKENS.origin + c * TOKENS.pitch, TOKENS.origin + r * TOKENS.pitch];

export const same = (a: Cell, b: Cell) => a[0] === b[0] && a[1] === b[1];
export const has = (list: Cell[], cell: Cell) => list.some((x) => same(x, cell));
