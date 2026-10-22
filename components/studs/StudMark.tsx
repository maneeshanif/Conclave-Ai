import { MARK_COLORS, markStuds, type MarkTone } from "@/lib/studs/mark";
import { cn } from "@/lib/utils";

/**
 * The Conclave C made of studs: two rings (44 and 32 studs) with a gap on the right and a centre stud.
 * The same stud system as the crew, so the logo and the agents are one family. Drawn from lib/studs/mark.ts.
 */
export function StudMark({ size = 320, tone = "dark", tile = true, className, label = "Conclave AI", decorative }: { size?: number | string; tone?: MarkTone; tile?: boolean; className?: string; label?: string; decorative?: boolean }) {
  const col = MARK_COLORS[tone];
  const studs = markStuds(100, 100, 72);
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={cn(className)}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
    >
      {tile && col.bg && <rect width="200" height="200" rx="36" fill={col.bg} />}
      {studs.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.kind === "centre" ? col.centre : col.ring} opacity={s.opacity} />
      ))}
    </svg>
  );
}
