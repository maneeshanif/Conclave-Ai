"use client";
import { useMemo, useRef } from "react";
import { buildHero, HERO_VIEW } from "@/lib/studs/hero";
import { useStudAssemble } from "@/lib/studs/useStudAssemble";

/**
 * Hero scene: the Conclave C made of studs. Server-rendered as the assembled C (so it is the static version for reduced motion,
 * phones and no-JS), then on wide screens the studs scatter and assemble on load and split into the seven agents on scroll.
 */
export function HeroStuds() {
  const svg = useRef<SVGSVGElement>(null);
  const { tiles, studs } = useMemo(() => buildHero(), []);
  useStudAssemble(svg, studs, () => svg.current?.closest("[data-hero]") ?? null);

  return (
    <svg ref={svg} viewBox={`0 0 ${HERO_VIEW.w} ${HERO_VIEW.h}`} className="h-full w-full" role="img" aria-label="The Conclave C, made of studs, that splits into the seven agents">
      {tiles.map((t) => (
        <g key={t.id} data-tile opacity="0">
          <rect x={t.x} y={t.y} width={t.size} height={t.size} rx={t.size * 0.18} fill={t.bg} />
          {t.dim.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.fill} opacity="0.18" />
          ))}
        </g>
      ))}
      {studs.map((s) => (
        <circle key={s.id} data-stud cx={s.c.x} cy={s.c.y} r={s.c.r} fill={s.c.fill} opacity={s.c.opacity} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      ))}
    </svg>
  );
}
