import { cast, type CastId } from "@/lib/content";

const INK = "#0B1512";
const PAPER = "#FBFCF8";
const LIME = "#C8F169";
const VIOLET = "#7C5CFF";

/**
 * The Brick Crew: seven characters built from the same toy-brick kit (a head brick, a body brick, arm plates, studs on top,
 * two dot eyes), each with one loud signature so it reads at stamp size. Flat palette fills, 4px ink outline, hard offset shadow.
 * Drawn in a 200 x 220 box with the feet on y = 200. Study notes: docs/mascot-research.md.
 */

type Box = [number, number, number, number];

/** A brick: rounded body plus studs on top. Studs are the dots of the brand. */
function Brick({ box, fill, studs, rx = 9, shadow }: { box: Box; fill: string; studs?: number; rx?: number; shadow?: boolean }) {
  const [x, y, w, h] = box;
  const n = studs ?? 0;
  const f = shadow ? INK : fill;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const cx = x + (w * (i + 0.5)) / n;
        return <rect key={i} x={cx - 10} y={y - 9} width="20" height="14" rx="6" fill={f} stroke={INK} strokeWidth="3.5" />;
      })}
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={f} stroke={INK} strokeWidth="4" />
      {/* flat highlight along the top edge: the toy-brick gloss without a gradient */}
      {!shadow && h > 30 && <rect x={x + 8} y={y + 6} width={Math.min(w - 16, 38)} height="5" rx="2.5" fill={PAPER} opacity=".4" />}
    </g>
  );
}

type Spec = { head: Box; base: Box; headFill: string; baseFill: string; headStuds?: number; baseStuds?: number; arms?: boolean; arch?: boolean };

const spec = (id: CastId): Spec => {
  const c = cast.find((x) => x.id === id)!.fill;
  switch (id) {
    case "tally":
      return { head: [64, 52, 72, 58], base: [46, 110, 108, 90], headFill: c, baseFill: c, headStuds: 2, arms: true };
    case "ledger":
      return { head: [44, 80, 112, 52], base: [22, 132, 156, 68], headFill: c, baseFill: c, headStuds: 3 };
    case "gate":
      return { head: [56, 58, 88, 62], base: [38, 120, 124, 80], headFill: c, baseFill: c, headStuds: 2, arch: true };
    default:
      return { head: [54, 62, 92, 68], base: [38, 130, 124, 70], headFill: c, baseFill: c, headStuds: 2, arms: true };
  }
};

const isDark = (fill: string) => fill === INK || fill === "#14302A" || fill === VIOLET;

function Shape({ id, shadow }: { id: CastId; shadow?: boolean }) {
  const s = spec(id);
  return (
    <g>
      {s.arms && (
        <>
          <Brick box={[18, 142, 22, 46]} fill={s.baseFill} rx={8} shadow={shadow} />
          <Brick box={[160, 142, 22, 46]} fill={s.baseFill} rx={8} shadow={shadow} />
        </>
      )}
      {s.arch ? (
        <path d="M38 200V160a62 62 0 0 1 124 0v40Z" fill={shadow ? INK : s.baseFill} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      ) : (
        <Brick box={s.base} fill={s.baseFill} studs={s.baseStuds} shadow={shadow} />
      )}
      <Brick box={s.head} fill={s.headFill} studs={s.headStuds} shadow={shadow} />
    </g>
  );
}

/** The art alone, in 200 x 220 coordinates, so it can sit inside any svg (the hero scene reuses it). */
export function CharacterArt({ id }: { id: CastId }) {
  const s = spec(id);
  const dark = isDark(s.headFill);
  const eye = dark ? PAPER : INK;
  const [hx, hy, hw, hh] = s.head;
  const ex = [hx + hw * 0.3, hx + hw * 0.7];
  const ey = hy + hh * 0.42;
  const mouthY = hy + hh * 0.74;
  const line = dark ? PAPER : INK;

  return (
    <g>
      {/* hard offset shadow, then the colour pass */}
      <g transform="translate(7 7)">
        <Shape id={id} shadow />
      </g>
      {id === "echo" && (
        <>
          <rect x="62" y="38" width="92" height="68" rx="9" fill="none" stroke={INK} strokeWidth="3" strokeDasharray="7 6" opacity=".35" transform="translate(30 -12)" />
          <rect x="62" y="38" width="92" height="68" rx="9" fill="none" stroke={INK} strokeWidth="3" strokeDasharray="7 6" opacity=".2" transform="translate(52 -26)" />
        </>
      )}
      <Shape id={id} />

      {/* face */}
      <circle cx={ex[0]} cy={ey} r="6.5" fill={eye} />
      <circle cx={ex[1]} cy={ey} r="6.5" fill={eye} />
      {id !== "aria" && id !== "boomerang" && <path d={`M${hx + hw * 0.38} ${mouthY}q${hw * 0.12} 8 ${hw * 0.24} 0`} fill="none" stroke={line} strokeWidth="4" strokeLinecap="round" />}

      {id === "aria" && (
        <>
          {[8, 15, 22, 15, 8].map((h, i) => (
            <rect key={i} x={hx + hw * 0.5 - 26 + i * 11.5} y={mouthY - h / 2 + 2} width="6" height={h} rx="3" fill={INK} />
          ))}
          <path d={`M${hx - 4} ${hy + hh * 0.5}a${hw / 2 + 4} ${hh * 0.62} 0 0 1 ${hw + 8} 0`} fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <rect x={hx - 12} y={hy + hh * 0.42} width="12" height="22" rx="5" fill={VIOLET} stroke={INK} strokeWidth="3.5" />
        </>
      )}
      {id === "slot" && (
        <>
          <rect x="62" y="146" width="76" height="46" rx="6" fill={PAPER} stroke={INK} strokeWidth="3" />
          {[0, 1, 2].flatMap((c) => [0, 1].map((r) => <rect key={`${c}${r}`} x={68 + c * 22} y={152 + r * 20} width="16" height="14" rx="3" fill={c === 2 && r === 0 ? LIME : "#E4E9DD"} stroke={INK} strokeWidth="2" />))}
        </>
      )}
      {id === "boomerang" && (
        <>
          <path d={`M${hx + hw * 0.34} ${mouthY}q${hw * 0.16} 10 ${hw * 0.3} -3`} fill="none" stroke={line} strokeWidth="4" strokeLinecap="round" />
          <path d="M164 150q30-6 24-50l-18 8q2 24-14 30Z" fill={LIME} stroke={INK} strokeWidth="4" strokeLinejoin="round" transform="translate(0 4)" />
        </>
      )}
      {id === "tally" &&
        [0, 1, 2].map((i) => (
          <rect key={i} x={66 + i * 24} y={186 - (i + 1) * 16} width="18" height={(i + 1) * 16} rx="4" fill={VIOLET} stroke={INK} strokeWidth="3" />
        ))}
      {id === "gate" && (
        <>
          <path d="M82 200v-40a18 18 0 0 1 36 0v40Z" fill={INK} />
          <path d="M118 200v-40l22 10v40Z" fill={LIME} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        </>
      )}
      {id === "ledger" && (
        <>
          {[148, 162, 176].map((y) => (
            <path key={y} d={`M40 ${y}h${y === 176 ? 70 : 120}`} stroke={INK} strokeWidth="3" strokeLinecap="round" opacity=".5" />
          ))}
          <rect x="132" y="40" width="10" height="46" rx="5" fill={LIME} stroke={INK} strokeWidth="3.5" transform="rotate(18 137 63)" />
        </>
      )}
    </g>
  );
}

/** One crew member as a stand-alone illustration. */
export function Character({ id, className, label }: { id: CastId; className?: string; label?: string }) {
  const c = cast.find((x) => x.id === id)!;
  return (
    <svg viewBox="0 0 220 220" className={className} role="img" aria-label={label ?? `${c.name}: ${c.job}`}>
      <CharacterArt id={id} />
    </svg>
  );
}

/** All seven in a row. */
export function CastRow({ className }: { className?: string }) {
  return (
    <ul className={className} aria-label="The Brick Crew">
      {cast.map((c) => (
        <li key={c.id} className="text-center">
          <Character id={c.id} className="mx-auto h-28 w-28 md:h-32 md:w-32" />
          <p className="mt-2 text-sm font-medium">{c.name}</p>
          <p className="label text-slate">{c.job}</p>
        </li>
      ))}
    </ul>
  );
}
