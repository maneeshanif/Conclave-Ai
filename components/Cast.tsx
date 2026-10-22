import { cast, type CastId } from "@/lib/content";

const INK = "#0B1512";
const PAPER = "#FBFCF8";
const LIME = "#C8F169";
const VIOLET = "#7C5CFF";
const LILAC = "#CFC4FF";
const MIST = "#E4E9DD";

/* Tints and shades are derived from the palette colour itself, so the gloss never introduces a new hue. */
const mix = (a: string, b: string, t: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const A = p(a), B = p(b);
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
};
const tint = (c: string, t: number) => mix(c, "#FFFFFF", t);
const shade = (c: string, t: number) => mix(c, INK, t);
const isDark = (c: string) => [INK, "#14302A", VIOLET].includes(c);

/**
 * The Brick Crew, v2: toy-brick characters with a glossy plastic finish. Each is a head brick on a body brick with arm plates and
 * hands, foot plates, cylinder studs on a lit top face, a specular streak, a shaded underside, glossy eyes and one loud signature.
 * Gloss is flat translucent shapes plus tints and shades of the palette colour (no gradient defs, so every id stays unique-free).
 * Drawn in 220 x 220, feet on y = 200. `.crew-eye` groups blink and `[data-wave]` groups talk (MotionRoot). Notes: docs/mascot-research.md.
 */

type Box = [number, number, number, number];

function Stud({ cx, y, fill }: { cx: number; y: number; fill: string }) {
  return (
    <g>
      <rect x={cx - 10} y={y - 13} width="20" height="10" rx="3" fill={shade(fill, 0.1)} stroke={INK} strokeWidth="3" />
      <ellipse cx={cx} cy={y - 13} rx="10" ry="4.6" fill={tint(fill, 0.3)} stroke={INK} strokeWidth="3" />
      <ellipse cx={cx - 3.5} cy={y - 14.2} rx="3.6" ry="1.4" fill="#fff" opacity=".75" />
    </g>
  );
}

/** A brick: lit top face, cylinder studs, front with gloss and a shaded underside. */
function Brick({ box, fill, studs = 0, rx = 9, shadow }: { box: Box; fill: string; studs?: number; rx?: number; shadow?: boolean }) {
  const [x, y, w, h] = box;
  if (shadow) {
    return (
      <g fill={INK} stroke={INK} strokeWidth="4" strokeLinejoin="round">
        {Array.from({ length: studs }, (_, i) => {
          const cx = x + (w * (i + 0.5)) / studs;
          return <rect key={i} x={cx - 10} y={y - 17} width="20" height="14" rx="6" />;
        })}
        <rect x={x} y={y - 9} width={w} height={h + 9} rx={rx} />
      </g>
    );
  }
  return (
    <g>
      <path d={`M${x + 6} ${y - 9}H${x + w - 6}L${x + w - 1} ${y + 2}H${x + 1}Z`} fill={tint(fill, 0.34)} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      {Array.from({ length: studs }, (_, i) => <Stud key={i} cx={x + (w * (i + 0.5)) / studs} y={y - 3} fill={fill} />)}
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={INK} strokeWidth="4" />
      {h > 26 && (
        <>
          <rect x={x + 3} y={y + h - 15} width={w - 6} height="11" rx="5" fill={INK} opacity=".13" />
          <rect x={x + 7} y={y + 6} width={Math.min(w - 14, 44)} height="5.5" rx="2.75" fill="#fff" opacity=".5" />
          <rect x={x + 6} y={y + 14} width="4.5" height={Math.max(6, h * 0.34)} rx="2.25" fill="#fff" opacity=".28" />
        </>
      )}
    </g>
  );
}

type Spec = { head: Box; base: Box; fill: string; arms: boolean; arch?: boolean; headStuds: number };
const spec = (id: CastId): Spec => {
  const fill = cast.find((x) => x.id === id)!.fill;
  switch (id) {
    case "tally": return { head: [62, 50, 76, 60], base: [44, 110, 112, 90], fill, arms: true, headStuds: 2 };
    case "ledger": return { head: [44, 80, 112, 52], base: [22, 132, 156, 68], fill, arms: false, headStuds: 3 };
    case "gate": return { head: [56, 56, 88, 62], base: [38, 120, 124, 80], fill, arms: true, arch: true, headStuds: 2 };
    default: return { head: [54, 62, 92, 68], base: [38, 130, 124, 70], fill, arms: true, headStuds: 2 };
  }
};

function Body({ id, shadow }: { id: CastId; shadow?: boolean }) {
  const s = spec(id);
  const f = s.fill;
  return (
    <g>
      {s.arms && (
        <>
          {[18, 160].map((x) => (
            <g key={x}>
              <Brick box={[x, 140, 22, 40]} fill={f} rx={9} shadow={shadow} />
              {shadow ? <circle cx={x + 11} cy="186" r="10" fill={INK} stroke={INK} strokeWidth="4" /> : (
                <>
                  <circle cx={x + 11} cy="187" r="10" fill={tint(f, 0.12)} stroke={INK} strokeWidth="3.5" />
                  <circle cx={x + 8} cy="183.5" r="2.6" fill="#fff" opacity=".6" />
                </>
              )}
            </g>
          ))}
        </>
      )}
      {/* foot plates */}
      {[52, 112].map((x) => (shadow ? <rect key={x} x={x} y="194" width="56" height="12" rx="6" fill={INK} /> : (
        <g key={x}>
          <rect x={x} y="194" width="56" height="12" rx="6" fill={shade(f, 0.2)} stroke={INK} strokeWidth="3.5" />
          <rect x={x + 6} y="196.5" width="22" height="3" rx="1.5" fill="#fff" opacity=".3" />
        </g>
      )))}
      {s.arch ? (
        shadow ? <path d="M38 200V160a62 62 0 0 1 124 0v40Z" fill={INK} stroke={INK} strokeWidth="4" /> : (
          <g>
            <path d="M38 200V160a62 62 0 0 1 124 0v40Z" fill={f} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
            <path d="M48 196V162a52 52 0 0 1 36-49" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".28" />
            <rect x="41" y="184" width="118" height="12" rx="5" fill={INK} opacity=".14" />
          </g>
        )
      ) : (
        <Brick box={s.base} fill={f} shadow={shadow} />
      )}
      <Brick box={s.head} fill={f} studs={s.headStuds} shadow={shadow} />
    </g>
  );
}

/** Glossy eye: big round, ink on light heads and paper with an ink pupil on dark ones, always with a specular dot. */
function Eye({ cx, cy, dark, r = 7.5, lid }: { cx: number; cy: number; dark: boolean; r?: number; lid?: boolean }) {
  return (
    <g>
      {dark ? (
        <>
          <circle cx={cx} cy={cy} r={r} fill={PAPER} stroke={INK} strokeWidth="2.5" />
          <circle cx={cx + 1} cy={cy + 0.5} r={r * 0.5} fill={INK} />
        </>
      ) : (
        <circle cx={cx} cy={cy} r={r} fill={INK} />
      )}
      <circle cx={cx - r * 0.3} cy={cy - r * 0.35} r={r * 0.3} fill="#fff" />
      {lid && <path d={`M${cx - r - 1} ${cy - 1}H${cx + r + 1}`} stroke={INK} strokeWidth="4.5" strokeLinecap="round" />}
    </g>
  );
}

/** The art alone, in 220 x 220 coordinates, so it can sit inside any svg (the hero scene reuses it). */
export type Mood = "happy" | "oops" | "sleepy" | "wow";

export function CharacterArt({ id, mood = "happy" }: { id: CastId; mood?: Mood }) {
  const s = spec(id);
  const dark = isDark(s.fill);
  const [hx, hy, hw, hh] = s.head;
  const cx = hx + hw / 2;
  const ex = [hx + hw * 0.3, hx + hw * 0.7];
  const ey = hy + hh * 0.42;
  const my = hy + hh * 0.76;
  const line = dark ? PAPER : INK;
  const smile = (w = 22, d = 8) => <path d={`M${cx - w / 2} ${my}q${w / 2} ${d} ${w} 0`} fill="none" stroke={line} strokeWidth="4" strokeLinecap="round" />;

  return (
    <g>
      <ellipse cx="110" cy="208" rx="70" ry="7" fill={INK} opacity=".16" />
      {id === "echo" && (
        <g fill="none" stroke={INK} strokeWidth="3" strokeDasharray="7 6">
          <rect x="92" y="38" width="92" height="68" rx="9" opacity=".34" />
          <rect x="114" y="26" width="92" height="68" rx="9" opacity=".18" />
        </g>
      )}
      <g transform="translate(7 7)">
        <Body id={id} shadow />
      </g>
      <Body id={id} />

      {/* chest details, one per character */}
      {(id === "aria" || id === "echo" || id === "boomerang") && (
        <g>
          <rect x="58" y="146" width="84" height="38" rx="8" fill={shade(s.fill, 0.1)} stroke={INK} strokeWidth="3" />
          {id === "aria" && [0, 1, 2, 3, 4].flatMap((i) => [0, 1].map((j) => <circle key={`${i}${j}`} cx={72 + i * 14} cy={158 + j * 14} r="3.6" fill={INK} opacity=".75" />))}
          {id === "echo" && [10, 20, 30].map((r) => <path key={r} d={`M${100 - r} 165a${r} ${r} 0 0 1 ${r * 2} 0`} fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity={1 - r / 45} />)}
          {id === "boomerang" && <path d="M76 168q24-26 48 0m0 0l-10-3m10 3l1-11" fill="none" stroke={LIME} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      )}
      {id === "slot" && (
        <g>
          <rect x="60" y="145" width="80" height="44" rx="6" fill={PAPER} stroke={INK} strokeWidth="3" />
          <rect x="60" y="145" width="80" height="11" rx="5" fill={LIME} stroke={INK} strokeWidth="3" />
          {[0, 1, 2, 3].flatMap((c) => [0, 1].map((r) => <rect key={`${c}${r}`} x={66 + c * 18} y={160 + r * 13} width="13" height="9" rx="2.5" fill={c === 2 && r === 0 ? LIME : MIST} stroke={INK} strokeWidth="1.8" />))}
          {[72, 128].map((x) => <rect key={x} x={x - 3} y="139" width="6" height="14" rx="3" fill={LIME} stroke={INK} strokeWidth="2.5" />)}
        </g>
      )}
      {id === "tally" && (
        <g>
          <rect x="58" y="128" width="84" height="58" rx="8" fill={PAPER} stroke={INK} strokeWidth="3" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x={68 + i * 17} y={176 - (i + 1) * 10} width="11" height={(i + 1) * 10} rx="3" fill={i === 3 ? LIME : VIOLET} stroke={INK} strokeWidth="2.5" />)}
          <path d="M66 160l17-8 17 4 28-20" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 5" />
        </g>
      )}
      {id === "gate" && (
        <g>
          <path d="M82 200v-38a18 18 0 0 1 36 0v38Z" fill={INK} />
          <path d="M118 200v-38l26 12v38Z" fill={LIME} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="136" cy="186" r="2.8" fill={INK} />
          <path d="M118 200h40l16 6h-50Z" fill={LIME} opacity=".35" />
          <circle cx="68" cy="150" r="9" fill={PAPER} stroke={INK} strokeWidth="2.6" />
          <circle cx="68" cy="146.5" r="3" fill={INK} />
          <path d="M62 155a6 4.5 0 0 1 12 0Z" fill={INK} />
        </g>
      )}
      {id === "ledger" && (
        <g>
          <rect x="34" y="140" width="132" height="50" rx="6" fill={PAPER} stroke={INK} strokeWidth="3" />
          {[152, 164, 176].map((y) => <path key={y} d={`M44 ${y}h${y === 176 ? 50 : 84}`} stroke={INK} strokeWidth="2.6" strokeLinecap="round" opacity=".45" />)}
          <circle cx="146" cy="162" r="12" fill={LIME} stroke={INK} strokeWidth="3" />
          <path d="M140 162l4 4 8-9" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {/* face: eyes blink (`.crew-eye`), mouth and brows give each its mood */}
      <g className="crew-eye">
        {mood === "sleepy" ? (
          <g fill="none" stroke={dark ? PAPER : INK} strokeWidth="4" strokeLinecap="round">
            <path d={`M${ex[0] - 8} ${ey}q8 7 16 0`} />
            <path d={`M${ex[1] - 8} ${ey}q8 7 16 0`} />
          </g>
        ) : mood === "oops" ? (
          <g fill="none" stroke={dark ? PAPER : INK} strokeWidth="4" strokeLinecap="round">
            <path d={`M${ex[0] - 6} ${ey - 6}l12 12m0 -12l-12 12`} />
            <path d={`M${ex[1] - 6} ${ey - 6}l12 12m0 -12l-12 12`} />
          </g>
        ) : id === "ledger" ? (
          <>
            <Eye cx={ex[0]} cy={ey} dark={dark} lid />
            <Eye cx={ex[1]} cy={ey} dark={dark} lid />
          </>
        ) : (
          <>
            <Eye cx={ex[0]} cy={ey} dark={dark} r={mood === "wow" ? 9.5 : id === "echo" ? 8.5 : 7.5} />
            <Eye cx={ex[1]} cy={ey} dark={dark} r={mood === "wow" ? 9.5 : id === "echo" ? 8.5 : 7.5} />
          </>
        )}
      </g>      {id === "slot" && [ex[0], ex[1]].map((x) => <path key={x} d={`M${x - 9} ${ey - 13}h18`} stroke={PAPER} strokeWidth="3.5" strokeLinecap="round" />)}
      {id === "boomerang" && (
        <>
          <path d={`M${ex[0] - 8} ${ey - 11}l14 -2`} stroke={PAPER} strokeWidth="3.5" strokeLinecap="round" />
          <path d={`M${ex[1] - 6} ${ey - 15}l14 3`} stroke={PAPER} strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}
      {id === "ledger" && <path d={`M${cx - 9} ${my}h18`} stroke={line} strokeWidth="4" strokeLinecap="round" />}
      {id === "tally" && (
        <g fill="none" stroke={INK} strokeWidth="3.2">
          <circle cx={ex[0]} cy={ey} r="11.5" fill="#fff" fillOpacity=".12" />
          <circle cx={ex[1]} cy={ey} r="11.5" fill="#fff" fillOpacity=".12" />
          <path d={`M${ex[0] + 11.5} ${ey}h${ex[1] - ex[0] - 23}M${ex[0] - 11.5} ${ey}l-8 -3M${ex[1] + 11.5} ${ey}l8 -3`} strokeLinecap="round" />
        </g>
      )}
      {mood === "wow" ? (
        <ellipse cx={cx} cy={my + 1} rx="7" ry="8.5" fill={INK} stroke={INK} strokeWidth="2" />
      ) : mood === "oops" ? (
        <path d={`M${cx - 13} ${my + 3}q4.3 -7 8.7 0t8.7 0t8.7 0`} fill="none" stroke={line} strokeWidth="3.6" strokeLinecap="round" />
      ) : mood === "sleepy" ? (
        <g>
          <path d={`M${cx - 8} ${my}h16`} stroke={line} strokeWidth="4" strokeLinecap="round" />
          <g fill="none" stroke={INK} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" opacity=".85">
            <path d={`M${hx + hw + 4} ${hy - 4}h12l-12 14h12`} />
            <path d={`M${hx + hw + 22} ${hy - 22}h9l-9 10h9`} />
          </g>
        </g>
      ) : (
        <>
      {id === "aria" ? (
        <g data-wave>
          {[8, 15, 22, 15, 8].map((h, i) => <rect key={i} x={cx - 26 + i * 11.5} y={my - h / 2 + 1} width="6" height={h} rx="3" fill={INK} />)}
        </g>
      ) : id === "boomerang" ? (
        <path d={`M${cx - 9} ${my}q9 9 20 -4`} fill="none" stroke={line} strokeWidth="4" strokeLinecap="round" />
      ) : id !== "ledger" ? (
        smile(id === "gate" ? 18 : 22, id === "slot" ? 5 : 8)
      ) : null}
        </>
      )}
      {/* soft cheek on the lighter heads */}
      {!dark && id !== "tally" && [ex[0] - 5, ex[1] + 5].map((x) => <ellipse key={x} cx={x} cy={ey + 12} rx="5.5" ry="3.4" fill={INK} opacity=".1" />)}

      {/* signatures */}
      {id === "aria" && (
        <g>
          <path d={`M${hx - 5} ${hy + hh * 0.52}a${hw / 2 + 5} ${hh * 0.7} 0 0 1 ${hw + 10} 0`} fill="none" stroke={INK} strokeWidth="6.5" strokeLinecap="round" />
          <rect x={hx - 14} y={hy + hh * 0.38} width="14" height="26" rx="6" fill={VIOLET} stroke={INK} strokeWidth="3.5" />
          <rect x={hx - 11} y={hy + hh * 0.42} width="4" height="12" rx="2" fill="#fff" opacity=".5" />
          <path d={`M${hx - 8} ${hy + hh * 0.38 + 26}q4 18 ${hw * 0.3} 20`} fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx={hx + hw * 0.34} cy={hy + hh * 0.38 + 48} r="4.5" fill={LIME} stroke={INK} strokeWidth="2.6" />
        </g>
      )}
      {id === "echo" && (
        <g fill="none" stroke={INK} strokeWidth="3.4" strokeLinecap="round">
          <path d="M162 74a22 22 0 0 1 0 30" />
          <path d="M172 62a38 38 0 0 1 0 54" opacity=".55" />
          <circle cx="152" cy="116" r="3" fill={INK} stroke="none" />
          <circle cx="146" cy="126" r="2" fill={INK} stroke="none" opacity=".6" />
        </g>
      )}
      {id === "boomerang" && (
        <g>
          <path d="M166 148q34-6 26-54l-20 9q4 26-14 32Z" fill={LIME} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <path d="M176 128q10-12 6-26" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" opacity=".6" />
          <path d="M156 164h-18M152 172h-22" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity=".5" />
        </g>
      )}
      {id === "tally" && (
        <g>
          <rect x="132" y="46" width="8" height="34" rx="4" fill={LIME} stroke={INK} strokeWidth="3" transform="rotate(16 136 63)" />
          <path d="M136 82l-3 7 6-1z" fill={INK} transform="rotate(16 136 63)" />
        </g>
      )}
      {id === "ledger" && (
        <g>
          <rect x="136" y="44" width="10" height="48" rx="5" fill={LIME} stroke={INK} strokeWidth="3.5" transform="rotate(20 141 68)" />
          <path d="M138 95l-3 8 7-2z" fill={INK} transform="rotate(20 141 68)" />
          <rect x="139" y="50" width="3" height="20" rx="1.5" fill="#fff" opacity=".6" transform="rotate(20 141 68)" />
        </g>
      )}
    </g>
  );
}

/** One crew member as a stand-alone illustration. */
export function Character({ id, className, label, mood }: { id: CastId; className?: string; label?: string; mood?: Mood }) {
  const c = cast.find((x) => x.id === id)!;
  return (
    <svg viewBox="0 0 220 220" className={className} role="img" aria-label={label ?? `${c.name}: ${c.job}`}>
      <CharacterArt id={id} mood={mood} />
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
