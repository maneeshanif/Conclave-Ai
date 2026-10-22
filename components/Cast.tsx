import { cast, type CastId } from "@/lib/content";

const INK = "#0B1512";
const PAPER = "#FBFCF8";

/**
 * The Conclave cast: seven flat characters built from one circle, ink outline, hard offset shadow, minimal face.
 * Palette colours only. Each has one feature that tells it apart (waveform, ripples, calendar tabs, tail, bars, door, ledger lines).
 */
export function Character({ id, className, label }: { id: CastId; className?: string; label?: string }) {
  const c = cast.find((x) => x.id === id)!;
  const dark = c.fill === INK || c.fill === "#14302A" || c.fill === "#7C5CFF";
  const eye = dark ? PAPER : INK;
  const line = dark ? PAPER : INK;
  const shape = (dx: number, dy: number, fill: string) =>
    id === "gate" ? (
      <path d={`M${20 + dx} ${150 + dy}A80 80 0 0 1 ${180 + dx} ${150 + dy}Z`} fill={fill} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    ) : id === "ledger" ? (
      <rect x={24 + dx} y={24 + dy} width="152" height="152" rx="64" fill={fill} stroke={INK} strokeWidth="4" />
    ) : (
      <circle cx={100 + dx} cy={100 + dy} r="76" fill={fill} stroke={INK} strokeWidth="4" />
    );
  const eyeY = id === "gate" ? 112 : 88;

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={label ?? `${c.name}: ${c.job}`}>
      {shape(7, 7, INK)}
      {shape(0, 0, c.fill)}
      <circle cx="78" cy={eyeY} r="6" fill={eye} />
      <circle cx="122" cy={eyeY} r="6" fill={eye} />

      {id === "aria" &&
        [10, 18, 26, 18, 10].map((h, i) => <rect key={i} x={72 + i * 12} y={120 - h / 2} width="6" height={h} rx="3" fill={INK} />)}
      {id === "echo" && (
        <>
          <path d="M84 120q16 10 32 0" fill="none" stroke={line} strokeWidth="4" strokeLinecap="round" />
          <path d="M178 70a40 40 0 0 1 0 60" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <path d="M192 52a62 62 0 0 1 0 96" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity=".5" />
        </>
      )}
      {id === "slot" && (
        <>
          <rect x="62" y="22" width="12" height="26" rx="6" fill="#C8F169" stroke={INK} strokeWidth="3" />
          <rect x="126" y="22" width="12" height="26" rx="6" fill="#C8F169" stroke={INK} strokeWidth="3" />
          <path d="M84 120h32" stroke={line} strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {id === "boomerang" && (
        <>
          <path d="M82 118q18 12 36-2" fill="none" stroke={line} strokeWidth="4" strokeLinecap="round" />
          <path d="M150 156q34 8 34-26" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        </>
      )}
      {id === "tally" && (
        <>
          <path d="M86 112h28" stroke={line} strokeWidth="4" strokeLinecap="round" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={76 + i * 18} y={148 - (i + 1) * 8} width="12" height={(i + 1) * 8} rx="3" fill="#7C5CFF" stroke={INK} strokeWidth="2.5" />
          ))}
        </>
      )}
      {id === "gate" && (
        <>
          <path d="M92 132h16" stroke={line} strokeWidth="4" strokeLinecap="round" />
          <path d="M150 150V96l22 10v44" fill="#C8F169" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        </>
      )}
      {id === "ledger" && (
        <>
          <path d="M86 118h28" stroke={line} strokeWidth="4" strokeLinecap="round" />
          <path d="M70 140h60M70 152h40" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity=".55" />
        </>
      )}
    </svg>
  );
}

/** All seven in a row. */
export function CastRow({ className }: { className?: string }) {
  return (
    <ul className={className} aria-label="The Conclave cast">
      {cast.map((c) => (
        <li key={c.id} className="text-center">
          <Character id={c.id} className="mx-auto h-24 w-24 md:h-28 md:w-28" />
          <p className="mt-2 text-sm font-medium">{c.name}</p>
          <p className="label text-slate">{c.job}</p>
        </li>
      ))}
    </ul>
  );
}
