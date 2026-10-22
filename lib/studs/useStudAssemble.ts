"use client";
import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { HeroStud } from "./hero";

/**
 * Hero stud motion (spec section 5).
 *  1. On load the studs start scattered and assemble into the C in about 1.2s with a stagger, centre stud last.
 *  2. On scroll (wide screens only) the C splits into the seven agent glyphs, one flock moving into seven tiles, within the first 240px
 *     so the move finishes while the scene is still on screen.
 * Phones and reduced motion get the assembled C only. `trigger` is the hero section the scroll morph is tied to.
 */
export function useStudAssemble(svg: RefObject<SVGSVGElement | null>, studs: HeroStud[], trigger: () => Element | null) {
  useEffect(() => {
    const root = svg.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const els = Array.from(root.querySelectorAll<SVGCircleElement>("[data-stud]"));
    const tiles = Array.from(root.querySelectorAll<SVGGElement>("[data-tile]"));

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const centre = els.findIndex((_, i) => studs[i].kind === "centre");
      const live = els.filter((_, i) => studs[i].kind !== "extra");

      /* 1. scatter to the C */
      gsap.set(live, { attr: { cx: () => gsap.utils.random(-30, 510), cy: () => gsap.utils.random(-20, 320) }, opacity: 0, scale: 0.4 });
      const load = gsap.timeline({ delay: 0.45 });
      load.to(live, {
        attr: { cx: (i: number) => studs[els.indexOf(live[i])].c.x, cy: (i: number) => studs[els.indexOf(live[i])].c.y },
        opacity: (i: number) => studs[els.indexOf(live[i])].c.opacity,
        scale: 1,
        duration: 1.2,
        ease: "expo.out",
        stagger: { each: 0.012, from: "random" },
      });
      if (centre >= 0) load.fromTo(els[centre], { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(3)" }, ">-0.35");

      /* 2. split into the crew on scroll (wide screens) */
      const wide = window.matchMedia("(min-width: 768px)").matches;
      const host = trigger();
      if (wide && host) {
        load.eventCallback("onComplete", () => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: host, start: "top top", end: "+=240", scrub: 0.6 } });
          els.forEach((el, i) => {
            const s = studs[i];
            if (s.t) tl.to(el, { attr: { cx: s.t.x, cy: s.t.y, r: s.t.r }, fill: s.t.fill, opacity: 1, ease: "power2.inOut", duration: 1 }, 0);
            else tl.to(el, { opacity: 0, duration: 0.6 }, 0.2);
          });
          tl.to(tiles, { opacity: 1, duration: 0.6, stagger: 0.05 }, 0.3);
        });
      }
    });
    return () => mm.revert();
  }, [svg, studs, trigger]);
}
