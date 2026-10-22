"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildHero, heroLayout, HERO_DEFAULT, type HeroLayout, type HeroSlot } from "@/lib/studs/hero";
import { useStudAssemble } from "@/lib/studs/useStudAssemble";

const same = (a: HeroLayout, b: HeroLayout) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Hero scene: the Conclave C made of studs, drawn as a full-hero overlay in the hero's own pixels. It is server-rendered as the
 * assembled C (the static version for reduced motion, phones and no-JS). On the client it measures the hero and the invisible crew
 * slot under the headline, then on wide screens the studs scatter and assemble on load and split into the seven agents on scroll,
 * landing in a row directly below the title.
 */
export function HeroStuds() {
  const svg = useRef<SVGSVGElement>(null);
  const [layout, setLayout] = useState<HeroLayout>(() => heroLayout(HERO_DEFAULT.w, HERO_DEFAULT.h, null));
  const [ready, setReady] = useState(false);
  const { tiles, studs } = useMemo(() => buildHero(layout), [layout]);

  const hero = useCallback(() => svg.current?.closest<HTMLElement>("[data-hero]") ?? null, []);

  const measure = useCallback(() => {
    const h = hero();
    if (!h) return;
    const r = h.getBoundingClientRect();
    const s = h.querySelector<HTMLElement>("[data-crew-slot]");
    let slot: HeroSlot | null = null;
    if (s && getComputedStyle(s).display !== "none") {
      const sr = s.getBoundingClientRect();
      slot = { x: sr.left - r.left, y: sr.top - r.top, w: sr.width };
    }
    const next = heroLayout(r.width, r.height, slot);
    setLayout((cur) => (same(cur, next) ? cur : next));
    setReady(true);
  }, [hero]);

  useEffect(() => {
    const h = hero();
    if (!h) return;
    measure();
    // the headline can move once fonts load, so measure again then, and shortly after
    void document.fonts?.ready.then(measure);
    const t = window.setTimeout(measure, 900);
    let debounce = 0;
    const onResize = () => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(measure, 250);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(debounce);
      window.removeEventListener("resize", onResize);
    };
  }, [hero, measure]);

  useStudAssemble(svg, studs, hero, ready);

  return (
    // keyed by layout so a resize swaps in fresh elements instead of fighting running tweens
    <svg
      key={JSON.stringify(layout)}
      ref={svg}
      viewBox={`0 0 ${layout.w} ${layout.h}`}
      className="h-full w-full"
      role="img"
      aria-label="The Conclave C, made of studs, that splits into the seven agents"
    >
      {ready && tiles.map((t) => (
        <g key={t.id} data-tile opacity="0">
          <rect x={t.x} y={t.y} width={t.size} height={t.size} rx={t.size * 0.18} fill={t.bg} />
          {t.dim.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.fill} opacity="0.18" />
          ))}
        </g>
      ))}
      {studs.map((s) => (
        <circle key={s.id} data-stud className="stud" cx={s.c.x} cy={s.c.y} r={s.c.r} fill={s.c.fill} opacity={s.c.opacity} />
      ))}
    </svg>
  );
}
